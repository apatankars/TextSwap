package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class FetchUserHandler implements Route {

  public StorageInterface storageHandler;

  public FetchUserHandler(StorageInterface storageHandler) {
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
    String firstName = request.queryParams("first_name");
    String lastName = request.queryParams("last_name");
    String username = request.queryParams("username");
    String email = request.queryParams("email");

    if (userID == null
        || userID.isEmpty()
        || firstName == null
        || firstName.isEmpty()
        || lastName == null
        || lastName.isEmpty()
        || username == null
        || username.isEmpty()
        || email == null
        || email.isEmpty()) {
      responseMap.put("response_type", "missing_parameter");
      responseMap.put("error", "user_id, first_name, last_name, username, and email are required");
      responseMap.put("user_data", null);
    } else {

      Map<String, Object> user = this.storageHandler.getDocumentByID("users", userID);

      // Textbook doesn't exist
      if (user == null) {
        HashMap<String, Object> data = new HashMap<>();
        data.put("id", userID);
        data.put("first_name", firstName);
        data.put("last_name", lastName);
        data.put("email", email);
        data.put("username", username);
        data.put("uni_level", null);
        data.put("rating", 5);
        data.put("courses", new ArrayList<String>());
        this.storageHandler.addDocumentById("users", userID, data);
        user = data;
      }

      responseMap.put("user_data", user);
      responseMap.put("response_type", "success");
      responseMap.put("error", null);
    }
    return Utils.toMoshiJson(responseMap);
  }
}
