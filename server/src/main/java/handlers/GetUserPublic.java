package handlers;

import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import storage.StorageInterface;

public class GetUserPublic implements Route {

  public StorageInterface storageHandler;

  public GetUserPublic(StorageInterface storageHandler) {
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

        Map<String, Object> user = this.storageHandler.getDocumentByID("users", user_id);

        if (user == null) {
          responseMap.put("response_type", "error");
          responseMap.put("error", "user not found");
        } else {
          responseMap.put("response_type", "success");
          Map<String, Object> publicUser = new HashMap<>();
          publicUser.put("user_id", user_id);
          publicUser.put("username", user.get("username"));
          publicUser.put("first_name", user.get("first_name"));
          publicUser.put("last_name", user.get("last_name"));
          publicUser.put("email", user.get("email"));
          publicUser.put("uni_level", user.get("uni_level"));
          publicUser.put("rating", user.get("rating"));
          responseMap.put("public_user", publicUser);
        }
      }
    } catch (Exception e) {
      responseMap.put("response_type", "error");
      responseMap.put("error", e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);
  }
}
