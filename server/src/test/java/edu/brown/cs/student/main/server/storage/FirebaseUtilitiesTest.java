package edu.brown.cs.student.main.server.storage;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import storage.FirebaseUtilities;
import storage.StorageInterface;

public class FirebaseUtilitiesTest {
  static StorageInterface firebase;

  @BeforeAll
  public static void beforeAll() throws IOException {
    firebase = new FirebaseUtilities(true);
  }

  @Test
  public void getAllDocs() throws InterruptedException, ExecutionException {
    var data = new HashMap<String, Object>();

    data.put("foo", "bar1");
    firebase.addDocument("test1", data);

    data.put("foo", "bar2");
    firebase.addDocument("test1", data);

    data.put("foo", "bar3");
    firebase.addDocument("test1", data);

    var docs = firebase.getDocuments("test1", -1, 0, null);
    assertEquals(3, docs.size());

    firebase.clearCollection("test1");
  }

  @Test
  public void getAllDocsWithStartWith() throws InterruptedException, ExecutionException {
    var data = new HashMap<String, Object>();

    data.put("foo", "bar1");
    firebase.addDocument("test2", data);

    data.put("foo", "bar2");
    firebase.addDocument("test2", data);

    data.put("foo", "bar3");
    firebase.addDocument("test2", data);

    var docs = firebase.getDocuments("test2", -1, 2, null);
    assertEquals(1, docs.size());

    firebase.clearCollection("test2");
  }

  @Test
  public void getFilteredDocs() throws InterruptedException, ExecutionException {
    var data = new HashMap<String, Object>();

    data.put("foo", "yes");
    firebase.addDocument("test3", data);

    data.put("foo", "yes");
    firebase.addDocument("test3", data);

    data.put("foo", "no!");
    firebase.addDocument("test3", data);

    var docs =
        firebase.getDocuments(
            "test3",
            -1,
            0,
            (q) -> {
              return q.whereEqualTo("foo", "yes");
            });

    assertEquals(2, docs.size());

    firebase.clearCollection("test3");
  }

  @Test
  public void getCountedDocs() throws InterruptedException, ExecutionException {
    var data = new HashMap<String, Object>();

    data.put("foo", "bar");
    firebase.addDocument("test4", data);

    data.put("foo", "bar");
    firebase.addDocument("test4", data);

    data.put("foo", "bar!");
    firebase.addDocument("test4", data);

    var docs = firebase.getDocuments("test4", 2, 0, null);
    assertEquals(2, docs.size());

    var docsUnlimited = firebase.getDocuments("test4", -1, 0, null);
    assertEquals(3, docsUnlimited.size());

    firebase.clearCollection("test4");
  }

  @Test
  public void getFilteredAndCountedDocs() throws InterruptedException, ExecutionException {
    var data = new HashMap<String, Object>();

    data.put("foo", "yes");
    firebase.addDocument("test5", data);

    data.put("foo", "yes");
    firebase.addDocument("test5", data);

    data.put("foo", "no!");
    firebase.addDocument("test5", data);

    var docs =
        firebase.getDocuments(
            "test5",
            1,
            0,
            (q) -> {
              return q.whereEqualTo("foo", "yes");
            });

    assertEquals(1, docs.size());

    firebase.clearCollection("test5");
  }

  @Test
  public void getFilteredDocsWithStartFrom() throws InterruptedException, ExecutionException {
    var data = new HashMap<String, Object>();

    data.put("foo", "yes");
    firebase.addDocument("test6", data);

    data.put("foo", "yes");
    firebase.addDocument("test6", data);

    data.put("foo", "no!");
    firebase.addDocument("test6", data);

    var docs =
        firebase.getDocuments(
            "test6",
            -1,
            1,
            (q) -> {
              return q.whereEqualTo("foo", "yes");
            });

    assertEquals(1, docs.size());

    firebase.clearCollection("test6");
  }

  @Test
  public void addThenDeleteDoc() throws ExecutionException, InterruptedException {
    var data = new HashMap<String, Object>();
    data.put("foo", "yes");

    String id = firebase.addDocument("test7", data);

    var before = firebase.getCollectionSize("test7");

    firebase.deleteDocument("test7", id);

    var after = firebase.getCollectionSize("test7");

    assertEquals(1, before);
  }

  @Test
  public void addAndGetDocById() throws ExecutionException, InterruptedException {
    var data = new HashMap<String, Object>();

    data.put("foo", "yes");
    firebase.addDocumentById("test8", "doc1", data);

    data.put("foo", "no");
    firebase.addDocumentById("test8", "doc2", data);

    data.put("foo", "maybe?");
    firebase.addDocumentById("test8", "doc3", data);

    var doc1 = firebase.getDocumentByID("test8", "doc1");
    var doc2 = firebase.getDocumentByID("test8", "doc2");
    var doc3 = firebase.getDocumentByID("test8", "doc3");

    assertEquals("yes", doc1.get("foo"));
    assertEquals("no", doc2.get("foo"));
    assertEquals("maybe?", doc3.get("foo"));

    firebase.clearCollection("test8");
  }

  @Test
  public void collectionSize() throws ExecutionException, InterruptedException {
    var data = new HashMap<String, Object>();
    data.put("foo", "yes");

    for (int i = 1; i <= 16; i++) {
      firebase.addDocumentById("test9", Integer.toString(i), data);
      assertEquals(Integer.toUnsignedLong(i), firebase.getCollectionSize("test9"));
    }

    firebase.clearCollection("test9");
    assertEquals(0, firebase.getCollectionSize("test9"));
  }
}
