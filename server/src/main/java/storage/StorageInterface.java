package storage;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface StorageInterface {
  /**
   * @param collection_id the name of the collection
   * @param data the actual data to add
   * @return the ID of the new document
   */
  String addDocument(String collection_id, Map<String, Object> data)
      throws InterruptedException, ExecutionException;

  /**
   * @param collection_id the name of the collection
   * @param count the number of records to return. A negative value will return all
   * @param start_from the index (starting at 0) of the first record to return
   * @param filter a lambda that modifies the query thats done to filter it. Can be null
   */
  List<Map<String, Object>> getDocuments(
      String collection_id, int count, int start_from, IQueryFilter filter)
      throws InterruptedException, ExecutionException;

  Map<String, Object> getDocumentByID(String collection_id, String doc_id)
      throws InterruptedException, ExecutionException;

  void updateDocument(String collection_id, String doc_id, Map<String, Object> data)
      throws IllegalArgumentException, InterruptedException, ExecutionException;

  long getCollectionSize(String collection_id) throws InterruptedException, ExecutionException;

  void clearCollection(String collection_id);

  void deleteDocument(String collection_id, String doc_id);

  public String addDocumentById(String collection_id, String doc_id, Map<String, Object> data)
      throws IllegalArgumentException, InterruptedException, ExecutionException;
}
