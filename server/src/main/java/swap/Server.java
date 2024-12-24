package swap;

import static spark.Spark.after;

import handlers.AddBuynowHandler;
import handlers.AddOfferHandler;
import handlers.AddTextbookHandler;
import handlers.FetchUserHandler;
import handlers.GetTextbooksHandler;
import handlers.GetUserPublic;
import handlers.OffersIncomingHandler;
import handlers.OffersListingHandler;
import handlers.OffersOutgoingHandler;
import handlers.OffersUpdateHandler;
import handlers.TestingResetHandler;
import handlers.TransactionsHandler;
import handlers.UserUpdateHandler;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import spark.Filter;
import spark.Spark;
import storage.FirebaseUtilities;
import storage.StorageInterface;

/** Top Level class for our project, utilizes spark to create and maintain our server. */
public class Server {

  public static void setUpServer(boolean test_mode) {
    int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "3232"));
    Spark.port(port);

    after(
        (Filter)
            (request, response) -> {
              response.header("Access-Control-Allow-Origin", "*");
              response.header("Access-Control-Allow-Methods", "*");
              response.header("Content-Type", "application/json");
            });

    StorageInterface firebaseUtils;
    try {
      // Decode the FIREBASE_CONFIG_BASE64 environment variable
      String base64Config = System.getenv("FIREBASE_CONFIG_BASE64");
      if (base64Config != null) {
        // Determine the expected file path
        String workingDirectory = System.getProperty("user.dir");
        Path firebaseConfigPath =
            Paths.get(workingDirectory, "src", "main", "resources", "firebase_config.json");

        // Ensure the directories exist
        Files.createDirectories(firebaseConfigPath.getParent());

        // Write the decoded file to the expected path
        try (FileOutputStream fos = new FileOutputStream(firebaseConfigPath.toString())) {
          byte[] decodedBytes = Base64.getDecoder().decode(base64Config);
          fos.write(decodedBytes);
          System.out.println(
              "Decoded firebase_config.json created at: " + firebaseConfigPath.toString());
        }
      } else {
        System.err.println("Environment variable FIREBASE_CONFIG_BASE64 is not set.");
        System.exit(1); // Exit if the configuration is missing
      }

      firebaseUtils = new FirebaseUtilities(test_mode);

      Spark.get("buynow", new AddBuynowHandler(firebaseUtils));
      Spark.get("textbooks", new GetTextbooksHandler(firebaseUtils));
      Spark.get("textbooks/new", new AddTextbookHandler(firebaseUtils));
      Spark.get("offers/new", new AddOfferHandler(firebaseUtils));
      Spark.get("offers/outgoing", new OffersOutgoingHandler(firebaseUtils));
      Spark.get("offers/incoming", new OffersIncomingHandler(firebaseUtils));
      Spark.get("offers/forlisting", new OffersListingHandler(firebaseUtils));
      Spark.get("offers/update", new OffersUpdateHandler(firebaseUtils));
      Spark.get("transactions", new TransactionsHandler(firebaseUtils));
      Spark.get("user/fetch", new FetchUserHandler(firebaseUtils));
      Spark.get("user/update", new UserUpdateHandler(firebaseUtils));
      Spark.get("user/public", new GetUserPublic(firebaseUtils));
      Spark.get("reset", new TestingResetHandler(firebaseUtils, test_mode));

      Spark.notFound(
          (request, response) -> {
            response.status(404); // Not Found
            System.out.println("ERROR");
            return "404 Not Found - The requested endpoint does not exist.";
          });
      Spark.init();
      Spark.awaitInitialization();

      System.out.println("Server started at http://localhost:" + port);
    } catch (IOException e) {
      e.printStackTrace();
      System.err.println(
          "Error: Could not initialize Firebase. Likely due to firebase_config.json not being found. Exiting.");
      System.exit(1);
    }
  }

  /**
   * Runs Server.
   *
   * @param args none
   */
  public static void main(String[] args) {
    setUpServer(args.length > 0 && args[0].equals("--test"));
  }
}
