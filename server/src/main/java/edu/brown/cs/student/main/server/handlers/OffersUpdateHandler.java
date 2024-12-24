package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class OffersUpdateHandler implements Route {
  public StorageInterface storageHandler;

  public OffersUpdateHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String offer_id = request.queryParams("offer_id");
      String status_update = request.queryParams("status_update");
      String reason = request.queryParamOrDefault("reason", "");

      if (offer_id == null
          || offer_id.isEmpty()
          || status_update == null
          || status_update.isEmpty()) {
        responseMap.put("response_type", "missing_parameter");
        responseMap.put("error", "offer_id and status_update must be set");
      } else {
        Map<String, Object> offer = this.storageHandler.getDocumentByID("offers", offer_id);

        if (offer == null) {
          throw new IllegalArgumentException("Given offer_id doesn't exist");
        }

        Integer status = null;
        if (status_update.equals("accept")) {
          status = 2;

          // Constructs transaction data from offer fields
          Map<String, Object> transaction_data = new HashMap<>();
          transaction_data.put("buyer_id", offer.get("buyer_id"));
          transaction_data.put("textbook_id", offer.get("textbook_id"));
          transaction_data.put("price", offer.get("price"));

          String transaction_id = this.storageHandler.addDocument("transactions", transaction_data);
          responseMap.put("transaction_id", transaction_id);
          responseMap.put("transaction", transaction_data);

        } else if (status_update.equals("deny")) {
          status = 1;
        } else if (status_update.equals("cancel")) {
          status = -1;
        } else {
          throw new IllegalArgumentException(
              "Invalid status_update: Must be 'accept', 'deny', or 'cancel'");
        }

        Map<String, Object> data_update = new HashMap<>();
        data_update.put("status", status);
        // if reason is empty, frontend shouldn't show reason field
        data_update.put("reason", reason);
        this.storageHandler.updateDocument("offers", offer_id, data_update);

        // Update offer object for return to caller below
        offer.put("status", status);
        offer.put("reason", reason);

        responseMap.put("response_type", "success");
        responseMap.put("offer_id", offer_id);
        responseMap.put("updated_offer", offer);
      }
    } catch (IllegalArgumentException e) {
      responseMap.put("response_type", "illegal_parameter");
      responseMap.put("error", e.getMessage());
    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }

    return Utils.toMoshiJson(responseMap);
  }
}
