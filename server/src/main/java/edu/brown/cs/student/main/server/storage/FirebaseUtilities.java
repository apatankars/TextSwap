package edu.brown.cs.student.main.server.storage;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class FirebaseUtilities implements StorageInterface {
  private boolean testMode;

  public FirebaseUtilities(boolean test_mode) throws IOException {
    this.testMode = test_mode;

    String workingDirectory = System.getProperty("user.dir");
    Path firebaseConfigPath =
        Paths.get(workingDirectory, "src", "main", "resources", "firebase_config.json");

    FileInputStream serviceAccount = new FileInputStream(firebaseConfigPath.toString());

    FirebaseOptions options =
        new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .build();

    FirebaseApp.initializeApp(options);
  }

  private CollectionReference getCollection(String collection_id) {
    if (this.testMode) {
      collection_id = "test-" + collection_id;
    }

    Firestore db = FirestoreClient.getFirestore();
    return db.collection(collection_id);
  }

  @Override
  public List<Map<String, Object>> getDocuments(
      String collection_id, int count, int start_from, IQueryFilter filter)
      throws InterruptedException, ExecutionException, IllegalArgumentException {
    if (collection_id == null) {
      throw new IllegalArgumentException("getCollection: collection_id cannot be null");
    }

    Query query = getCollection(collection_id);

    // Run lambda filter if it exists
    if (filter != null) {
      query = filter.filterQuery(query);
    }

    // Start from if its also above 0
    if (start_from > 0) {
      var initialDocs =
          query.orderBy("created_at").limit(start_from + 1).get().get().getDocuments();

      // If we pull less than start_from docs, we're skipping past the size of
      // the collection, so just return []
      if (initialDocs.size() <= start_from) {
        return new ArrayList<>();
      }

      var lastDoc = initialDocs.get(start_from - 1);
      query = query.orderBy("created_at").startAfter(lastDoc);
    }

    // Cut off by count if its above -1
    if (count >= 0) {
      query = query.limit(count);
    }

    QuerySnapshot finalQuery = query.get().get();

    List<Map<String, Object>> data = new ArrayList<>();
    for (QueryDocumentSnapshot doc : finalQuery.getDocuments()) {
      Map<String, Object> docAsMap = doc.getData();
      docAsMap.put("id", doc.getId());
      data.add(docAsMap);
    }

    return data;
  }

  @Override
  public Map<String, Object> getDocumentByID(String collection_id, String doc_id)
      throws InterruptedException, ExecutionException {
    CollectionReference ref = getCollection(collection_id);
    return ref.document(doc_id).get().get().getData();
  }

  @Override
  public String addDocument(String collection_id, Map<String, Object> data)
      throws IllegalArgumentException, InterruptedException, ExecutionException {
    if (collection_id == null || data == null) {
      throw new IllegalArgumentException(
          "addDocument: collection_id, doc_id, or data cannot be null");
    }

    // Add a "created_at" field for every document
    data.put("created_at", FieldValue.serverTimestamp());

    CollectionReference ref = getCollection(collection_id);
    DocumentReference doc = ref.document();
    doc.set(data).get(); // Invoke get() to wait until the adding is done

    // Remove created_at so the caller doesn't still have it
    data.remove("created_at");

    return doc.getId();
  }

  @Override
  public String addDocumentById(String collection_id, String doc_id, Map<String, Object> data)
      throws IllegalArgumentException, InterruptedException, ExecutionException {
    if (collection_id == null || doc_id == null || data == null) {
      throw new IllegalArgumentException(
          "addDocumentById: collection_id, doc_id, or data cannot be null");
    }

    // Add a "created_at" field for every document
    data.put("created_at", FieldValue.serverTimestamp());

    CollectionReference colRef = getCollection(collection_id);

    // Reference a document with the specific ID (Clerk userID)
    DocumentReference docRef = colRef.document(doc_id);

    // Set the data into the document
    docRef.set(data).get(); // Invoke get() to wait until the adding is done

    // Remove "created_at" so the caller doesn't still have it
    data.remove("created_at");

    return docRef.getId();
  }

  @Override
  public void updateDocument(String collection_id, String doc_id, Map<String, Object> data)
      throws IllegalArgumentException, InterruptedException, ExecutionException {
    if (collection_id == null || doc_id == null || data == null) {
      throw new IllegalArgumentException(
          "updateDocument: collection_id, doc_id, or data cannot be null");
    }

    CollectionReference ref = getCollection(collection_id);
    ref.document(doc_id).update(data).get();
  }

  @Override
  public long getCollectionSize(String collection_id)
      throws InterruptedException, ExecutionException {
    if (collection_id == null) {
      throw new IllegalArgumentException("getCollectionSize: collection_id cannot be null");
    }

    CollectionReference ref = getCollection(collection_id);
    return ref.count().get().get().getCount();
  }

  @Override
  public void clearCollection(String collection_id) {
    CollectionReference ref = getCollection(collection_id);
    deleteCollection(ref);
  }

  @Override
  public void deleteDocument(String collection_id, String doc_id) {
    CollectionReference ref = getCollection(collection_id);
    DocumentReference doc = ref.document(doc_id);

    // for each subcollection, run deleteCollection()
    Iterable<CollectionReference> collections = doc.listCollections();
    for (CollectionReference collection : collections) {
      deleteCollection(collection);
    }
    // then delete the document
    doc.delete();
  }

  // recursively removes all the documents and collections inside a collection
  // https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
  private void deleteCollection(CollectionReference collection) {
    try {

      // get all documents in the collection
      ApiFuture<QuerySnapshot> future = collection.get();
      List<QueryDocumentSnapshot> documents = future.get().getDocuments();

      // delete each document
      for (QueryDocumentSnapshot doc : documents) {
        doc.getReference().delete().get(); // Use get to block until done
      }

      // NOTE: the query to documents may be arbitrarily large. A more robust
      // solution would involve batching the collection.get() call.
    } catch (Exception e) {
      System.err.println("Error deleting collection : " + e.getMessage());
    }
  }
}
