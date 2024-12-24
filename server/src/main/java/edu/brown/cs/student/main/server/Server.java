package edu.brown.cs.student.main.server;

import static spark.Spark.after;

import edu.brown.cs.student.main.server.handlers.AddBuynowHandler;
import edu.brown.cs.student.main.server.handlers.AddOfferHandler;
import edu.brown.cs.student.main.server.handlers.AddTextbookHandler;
import edu.brown.cs.student.main.server.handlers.FetchUserHandler;
import edu.brown.cs.student.main.server.handlers.GetTextbooksHandler;
import edu.brown.cs.student.main.server.handlers.GetUserPublic;
import edu.brown.cs.student.main.server.handlers.OffersIncomingHandler;
import edu.brown.cs.student.main.server.handlers.OffersListingHandler;
import edu.brown.cs.student.main.server.handlers.OffersOutgoingHandler;
import edu.brown.cs.student.main.server.handlers.OffersUpdateHandler;
import edu.brown.cs.student.main.server.handlers.TestingResetHandler;
import edu.brown.cs.student.main.server.handlers.TransactionsHandler;
import edu.brown.cs.student.main.server.handlers.UserUpdateHandler;
import edu.brown.cs.student.main.server.storage.FirebaseUtilities;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.io.IOException;
import spark.Filter;
import spark.Spark;

/** Top Level class for our project, utilizes spark to create and maintain our server. */
public class Server {

  public static void setUpServer(boolean test_mode) {
    int port = 3232;
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
