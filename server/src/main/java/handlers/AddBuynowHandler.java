package handlers;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import storage.StorageInterface;

public class AddBuynowHandler implements Route {

  public StorageInterface storageHandler;

  // TODO: rewrite/delete based on startprice/buynow price discussion
  public AddBuynowHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();

    String user_id = request.queryParams("user_id");
    String textbook_id = request.queryParams("textbook_id");
    String buynow_price_str = request.queryParams("price");

    if (buynow_price_str == null
        || buynow_price_str.isEmpty()
        || user_id == null
        || user_id.isEmpty()
        || textbook_id == null
        || textbook_id.isEmpty()) {
      responseMap.put("response_type", "missing_parameter");
      responseMap.put("error", "user_id, textbook_id, and price all must be set");
    } else {
      try {
        Double buynow_price = Double.parseDouble(buynow_price_str);

        Map<String, Object> transaction_data = new HashMap<>();
        transaction_data.put("buyer_id", user_id);
        transaction_data.put("textbook_id", textbook_id);
        transaction_data.put("price", buynow_price);
        String transaction_date = new Date().toString();
        transaction_data.put("transaction_date", transaction_date);

        String transaction_id = this.storageHandler.addDocument("transactions", transaction_data);

        Map<String, Object> update_data = new HashMap<>();
        update_data.put("available", false);
        this.storageHandler.updateDocument("textbooks", textbook_id, update_data);

        responseMap.put("response_type", "success");
        responseMap.put("transaction_id", transaction_id);
        responseMap.put("textbook_id", textbook_id);
        responseMap.put("transaction", transaction_data);
      } catch (Exception e) {
        e.printStackTrace();
        responseMap.put("response_type", "failure");
        responseMap.put("error", e.getMessage());
      }
    }

    responseMap.put("user_id", user_id);
    responseMap.put("textbook_id", textbook_id);
    responseMap.put("buynow_price", buynow_price_str);
    return Utils.toMoshiJson(responseMap);
  }
}
