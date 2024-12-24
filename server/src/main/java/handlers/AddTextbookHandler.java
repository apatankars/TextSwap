package handlers;

import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import storage.StorageInterface;

public class AddTextbookHandler implements Route {

  public StorageInterface storageHandler;

  public AddTextbookHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();

    String title = request.queryParams("title");
    String author = request.queryParams("author");
    String course = request.queryParams("course");
    String edition = request.queryParams("edition");
    String condition = request.queryParams("condition");
    String isbn = request.queryParams("isbn");
    String description = request.queryParams("description");
    String original_price_str = request.queryParams("original_price");
    String price_str = request.queryParams("price");
    String seller_id = request.queryParams("seller_id");
    String seller_username = request.queryParams("seller_username");
    String seller_name = request.queryParams("seller_name");
    String seller_uni_level = request.queryParams("seller_uni_level");
    String seller_rating = request.queryParams("seller_rating");
    if (seller_id == null
        || seller_id.isEmpty()
        || title == null
        || title.isEmpty()
        || author == null
        || author.isEmpty()
        || course == null
        || course.isEmpty()
        || condition == null
        || condition.isEmpty()
        || isbn == null
        || isbn.isEmpty()
        || description == null
        || description.isEmpty()
        || edition == null
        || edition.isEmpty()
        || original_price_str == null
        || original_price_str.isEmpty()
        || price_str == null
        || price_str.isEmpty()
        || seller_username == null
        || seller_username.isEmpty()
        || seller_name == null
        || seller_name.isEmpty()
        || seller_uni_level == null
        || seller_uni_level.isEmpty()
        || seller_rating == null
        || seller_rating.isEmpty()) {
      responseMap.put("response_type", "missing_parameter");
      responseMap.put(
          "error",
          "seller_id, title, author, edition, course, condition, isbn, description, original_price, price, seller_username, seller_name, seller_uni_level, and seller_rating all must be set");
    } else {
      try {
        Double price = Double.parseDouble(price_str);
        Double rating = Double.parseDouble(seller_rating);
        Integer originalPrice = Integer.parseInt(original_price_str);

        Map<String, Object> data = new HashMap<>();

        data.put("title", title);
        data.put("author", author);
        data.put("course", course);
        data.put("condition", condition);
        data.put("edition", edition);
        data.put("isbn", isbn);
        data.put("originalPrice", originalPrice);
        data.put("price", price);
        data.put("description", description);
        data.put("seller_id", seller_id);
        data.put("seller_username", seller_username);
        data.put("seller_name", seller_name);
        data.put("seller_uni_level", seller_uni_level);
        data.put("seller_rating", rating);
        data.put("available", true); // Will always be true, new texts are meant to be avail

        String book_id = this.storageHandler.addDocument("textbooks", data);

        responseMap.put("response_type", "success");
        responseMap.put("id", book_id);
        responseMap.put("textbook", data);
      } catch (Exception e) {
        e.printStackTrace();
        responseMap.put("response_type", "failure");
        responseMap.put("error", e.getMessage());
      }
    }

    return Utils.toMoshiJson(responseMap);
  }
}
