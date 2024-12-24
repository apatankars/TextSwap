package handlers;

import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import storage.StorageInterface;

public class TestingResetHandler implements Route {
  public StorageInterface storageHandler;
  private boolean testMode;

  public TestingResetHandler(StorageInterface storage_handler, boolean test_mode) {
    this.storageHandler = storage_handler;
    this.testMode = test_mode;
  }

  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      if (this.testMode) {
        this.storageHandler.clearCollection("textbooks");
        this.storageHandler.clearCollection("offers");
        this.storageHandler.clearCollection("transactions");
        this.storageHandler.clearCollection("users");

        responseMap.put("response_type", "success");
      } else {
        throw new Exception("Can only invoke /reset if the server is running in test mode");
      }

    } catch (Exception e) {
      e.printStackTrace();
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }
    return Utils.toMoshiJson(responseMap);
  }
}
