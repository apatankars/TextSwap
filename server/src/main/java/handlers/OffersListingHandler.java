package handlers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import storage.StorageInterface;

public class OffersListingHandler implements Route {

  public StorageInterface storageHandler;

  public OffersListingHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String textbook_id = request.queryParams("textbook_id");

      if (textbook_id == null || textbook_id.isEmpty()) {
        responseMap.put("response_type", "missing_parameter");
        responseMap.put("error", "textbook_id must be set");
      } else {
        List<Map<String, Object>> listing_offers =
            this.storageHandler.getDocuments(
                "offers",
                -1,
                -1,
                (q) -> {
                  q = q.whereEqualTo("textbook_id", textbook_id);
                  q = q.whereNotEqualTo("status", -1);
                  return q;
                });

        responseMap.put("listing_offers", listing_offers);
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
