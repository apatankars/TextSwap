package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class GetTextbooksHandler implements Route {

  public StorageInterface storageHandler;

  public GetTextbooksHandler(StorageInterface storageHandler) {
    this.storageHandler = storageHandler;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      String title = request.queryParamOrDefault("title", null);
      String author = request.queryParamOrDefault("author", null);
      String pub_year = request.queryParamOrDefault("pub_year", null);
      String course = request.queryParamOrDefault("course", null);
      String condition = request.queryParamOrDefault("condition", null);
      String isbn = request.queryParamOrDefault("isbn", null);
      String id = request.queryParamOrDefault("id", null);

      double max_price = Double.parseDouble(request.queryParamOrDefault("max_price", "-1"));
      int count = Integer.parseInt(request.queryParamOrDefault("count", "-1"));
      int start_from = Integer.parseInt(request.queryParamOrDefault("start_from", "0"));

      List<Map<String, Object>> textbooks = List.of();

      if (id == null) {
        textbooks =
            this.storageHandler.getDocuments(
                "textbooks",
                count,
                start_from,
                (q) -> {
                  if (title != null) {
                    q = q.whereEqualTo("title", title);
                  }

                  if (author != null) {
                    q = q.whereEqualTo("author", author);
                  }

                  if (pub_year != null) {
                    q = q.whereEqualTo("pub_year", pub_year);
                  }

                  if (course != null) {
                    q = q.whereEqualTo("course", course);
                  }

                  if (condition != null) {
                    q = q.whereEqualTo("condition", condition);
                  }

                  if (isbn != null) {
                    q = q.whereEqualTo("isbn", isbn);
                  }

                  if (max_price != -1) {
                    q = q.whereLessThanOrEqualTo("price", max_price);
                  }

                  // We'll always only want solely available textbooks
                  q = q.whereEqualTo("available", true);

                  return q;
                });
      } else {
        Map<String, Object> textbook = this.storageHandler.getDocumentByID("textbooks", id);
        if (textbook != null) {
          textbooks = List.of(textbook);
          textbooks.get(0).put("id", id);
        } else {
          textbooks = List.of();
          responseMap.put("textbooks", textbooks);
        }
      }

      Map<String, Object> filters = new HashMap<>();

      filters.put("title", title);
      filters.put("author", author);
      filters.put("pub_year", pub_year);
      filters.put("course", course);
      filters.put("condition", condition);
      filters.put("isbn", isbn);

      if (max_price > 1) {
        filters.put("max_price", max_price);
      }

      responseMap.put("filters", filters);

      if (count > -1) {
        responseMap.put("count", count);
      }

      if (start_from > 0) {
        responseMap.put("start_from", start_from);
      }

      responseMap.put("textbooks", textbooks);
      responseMap.put("response_type", "success");
    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);
  }
}
