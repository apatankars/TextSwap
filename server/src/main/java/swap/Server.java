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
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import org.json.JSONObject;
import spark.Filter;
import spark.Spark;
import storage.FirebaseUtilities;
import storage.StorageInterface;

/** Top Level class for our project, utilizes spark to create and maintain our server. */
public class Server {

  public static void setUpFirebaseConfig() {
    String privateKey = System.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n");

    JSONObject firebaseConfig = new JSONObject();
    firebaseConfig.put("type", System.getenv("FIREBASE_TYPE"));
    firebaseConfig.put("project_id", System.getenv("FIREBASE_PROJECT_ID"));
    firebaseConfig.put("private_key_id", System.getenv("FIREBASE_PRIVATE_KEY_ID"));
    firebaseConfig.put("private_key", privateKey);
    firebaseConfig.put("client_email", System.getenv("FIREBASE_CLIENT_EMAIL"));
    firebaseConfig.put("client_id", System.getenv("FIREBASE_CLIENT_ID"));
    firebaseConfig.put("auth_uri", System.getenv("FIREBASE_AUTH_URI"));
    firebaseConfig.put("token_uri", System.getenv("FIREBASE_TOKEN_URI"));
    firebaseConfig.put("auth_provider_x509_cert_url", System.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"));
    firebaseConfig.put("client_x509_cert_url", System.getenv("FIREBASE_CLIENT_X509_CERT_URL"));

    String workingDirectory = System.getProperty("user.dir");
    Path firebaseConfigPath =
        Paths.get(workingDirectory, "src", "main", "resources", "firebase_config.json");

    try {
      Files.createDirectories(firebaseConfigPath.getParent());
      System.out.println(firebaseConfigPath.toAbsolutePath());
    } catch (Exception e) {
      e.printStackTrace();
    }

    try (FileWriter writer = new FileWriter(firebaseConfigPath.toFile())) {
      writer.write(firebaseConfig.toString(4)); // Pretty print with indentation
    } catch (IOException e) {
      e.printStackTrace();
    }

    System.out.println("Firebase configuration written to: " + firebaseConfigPath.toAbsolutePath());
  }

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
      setUpFirebaseConfig();

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
