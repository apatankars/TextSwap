package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class TransactionsHandler implements Route {

  public StorageInterface storageHandler;

  public TransactionsHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String user_id = request.queryParams("user_id");

      if (user_id == null || user_id.isEmpty()) {
        responseMap.put("response_type", "missing_parameter");
        responseMap.put("error", "user_id must be set");
      } else {
        List<Map<String, Object>> user_transactions =
            this.storageHandler.getDocuments(
                "transactions",
                -1,
                -1,
                (q) -> {
                  q = q.whereEqualTo("buyer_id", user_id);
                  return q;
                });

        responseMap.put("user_transactions", user_transactions);
        responseMap.put("response_type", "success");
      }
    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);
  }
}
