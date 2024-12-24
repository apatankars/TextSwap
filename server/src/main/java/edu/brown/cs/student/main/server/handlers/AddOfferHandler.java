package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class AddOfferHandler implements Route {

  public StorageInterface storageHandler;

  public AddOfferHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();

    String user_id = request.queryParams("user_id");
    String seller_id = request.queryParams("seller_id");
    String textbook_id = request.queryParams("textbook_id");
    String offer_price_str = request.queryParams("price");

    if (offer_price_str == null
        || offer_price_str.isEmpty()
        || user_id == null
        || user_id.isEmpty()
        || seller_id == null
        || seller_id.isEmpty()
        || textbook_id.isEmpty()) {
      responseMap.put("response_type", "missing_parameter");
      responseMap.put("error", "user_id, seller,_id, textbook_id, and price all must be set");
    } else {
      try {
        Double offer_price = Double.parseDouble(offer_price_str);

        // Textbook doesn't exist
        if (this.storageHandler.getDocumentByID("textbooks", textbook_id) == null) {
          throw new IllegalArgumentException("Given textbook ID doesn't exist");
        }

        Map<String, Object> offer_data = new HashMap<>();
        offer_data.put("buyer_id", user_id);
        offer_data.put("seller_id", seller_id);
        offer_data.put("textbook_id", textbook_id);
        offer_data.put("price", offer_price);
        offer_data.put("status", 0);
        String offer_id = this.storageHandler.addDocument("offers", offer_data);

        responseMap.put("response_type", "success");
        responseMap.put("offer_id", offer_id);
        responseMap.put("offer", offer_data);
      } catch (IllegalArgumentException e) {
        responseMap.put("response_type", "illegal_parameter");
        responseMap.put("error", e.getMessage());
      } catch (Exception e) {
        e.printStackTrace();
        responseMap.put("response_type", "failure");
        responseMap.put("error", e.getMessage());
      }
    }

    return Utils.toMoshiJson(responseMap);
  }
}
