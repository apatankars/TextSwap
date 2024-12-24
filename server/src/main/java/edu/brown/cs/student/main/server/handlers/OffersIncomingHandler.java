package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class OffersIncomingHandler implements Route {

  public StorageInterface storageHandler;

  public OffersIncomingHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  /**
   * Invoked when a request is made on this route's corresponding path e.g. '/hello'
   *
   * @param request The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return The content to be set in the response
   * @throws Exception implementation can choose to throw exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String user_id = request.queryParams("user_id");

      if (user_id == null || user_id.isEmpty()) {
        responseMap.put("response_type", "missing_parameter");
        responseMap.put("error", "user_id must be set");
      } else {
        List<Map<String, Object>> user_offers =
            this.storageHandler.getDocuments(
                "offers",
                -1,
                -1,
                (q) -> {
                  q = q.whereEqualTo("seller_id", user_id);
                  q = q.whereNotEqualTo("status", -1);
                  return q;
                });

        responseMap.put("incoming_offers", user_offers);
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
