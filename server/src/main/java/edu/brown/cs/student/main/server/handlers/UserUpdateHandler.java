package edu.brown.cs.student.main.server.handlers;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class UserUpdateHandler implements Route {

  public StorageInterface storageHandler;

  public UserUpdateHandler(StorageInterface storageHandler) {
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
    String userID = request.queryParams("user_id");
    String rating = request.queryParamOrDefault("rating", null);
    String coursesJson = request.queryParamOrDefault("courses", null);
    String uniLevel = request.queryParamOrDefault("uni_level", null);

    if (userID == null || (uniLevel == null && rating == null && coursesJson == null)) {
      responseMap.put("response_type", "missing_parameter");
      responseMap.put("error", "user_id, rating, course, or uniLevel is required");
      responseMap.put("user_data", null);
    } else {
      Map<String, Object> dataUpdate = new HashMap<>();

      Map<String, Object> user = this.storageHandler.getDocumentByID("users", userID);

      if (rating != null) {
        dataUpdate.put("rating", rating);
        user.put("rating", rating);
      }
      if (coursesJson != null) {
        Gson gson = new Gson();
        List<String> courses =
            gson.fromJson(coursesJson, new TypeToken<List<String>>() {}.getType());
        dataUpdate.put("courses", courses);
        user.put("courses", courses);
      }
      if (uniLevel != null) {
        dataUpdate.put("uni_level", uniLevel);
        user.put("uni_level", uniLevel);
      }
      this.storageHandler.updateDocument("users", userID, dataUpdate);
      responseMap.put("response_type", "success");
      responseMap.put("user_data", user);
      responseMap.put("user_id", userID);
      responseMap.put("error", null);
    }

    return Utils.toMoshiJson(responseMap);
  }
}
