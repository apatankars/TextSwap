# Project Details

Term Project: TextSwap
_TextSwap is an online marketplace for the Brown University community to buy and sell used textbooks. Users can post their used books, and then bid on or outright purchase other listings. Once purchased, parties to a given transactions will be able to view the contact info of the respective buyer or seller in order to contact them and transact. We use a React frontend and Java backend along with Firestore and Clerk._

- Aaron Perrotta (azperrot)
- Efram Geller (egeller)
- Armaan Patankar (ampatank)
- Bentzi Gitig (bgitig)

About 3 weeks of development to finish, not including pre-coding design work.

[Repository](https://github.com/cs0320-f24/term-project-a-a-b-e)

# Design Choices

## Frontend

We broke up each frontend page into many components, making the overall page code
much simpler. Simpler page actions used modals for popups. Most pages consist of
components like search bars, grid cards and dashboards. For card components, we
used similar styles making it easy to modify or add new cards. We used tools
from @mui for react tools. Navigation bar made it easy to move between pages. Users
don't see their own posts

## Backend

There are two main "layers" to the backend -- the handlers and a special `FirebaseUtilities` class that interfaces with Firestore. There is a seperate class for each handler, into which the Firebase utils class is injected as a dependecy. Each handler covers the logic for its respective endpoint, and uses the Firebase utils class to actually read, write, update, and delete data in Firestore. This class has a set of general utility methods for such CRUD operations. We used HashMaps to pass around data from the handler into Firebase, but no more advanced data structures we're used on the Backend other than that.

# Errors/Bugs

No major errors or bugs were found. Firestore does have a quirk where if a query using a set of fields it hasn't encountered before is done, it'll throw an error message requiring the admin to manually create a certain type of DB index before the query can be executed. We _believe_ that we caught all such cases and created all such indices (since the types of queries are hardcoded into the site and not user-generatable), but there is a chance we may have missed.

# Tests

## Frontend

Our project uses Playwright to ensure the TextSwap application functions reliably and delivers a seamless user experience. The test suite covers both appearance and functionality, focusing on key features such as:

<li>UI Verification: Ensures proper rendering of critical elements, like buttons, headings, and modals, across pages (e.g., Home, Profile, Shop).
<li>Functional Tests: Validates core user actions, such as logging in, updating profiles, creating book listings, and interacting with modals.
<li>API Mocking: Simulates backend responses to test scenarios like successful/failed logins and user registration without server dependency.
<li>User Flows: Verifies end-to-end functionality, ensuring features like profile updates and book listing creation work seamlessly.

Running the Tests

Start the development server, install dependencies, and execute tests with:

```
npx playwright test
```

The suite ensures robust coverage, identifies regressions early, and maintains application quality for a polished user experience.

## Backend

We wrote a small set of simple unit tests to verify the functionality of the `FirebaseUtilities` class. The handlers were tested end-to-end via running the server and invoking the API via [Postman](postman.com), an app designed for making API requests (think cURL) and testing them. We used Postman to make a suite of test API requests and write scripts to test that they ran correctly (both for correct and incorrect inputs). These tests would create textbooks, make offers on them, buy them, check transactions, etc. We implemented a special "test mode" on the server that used a seperate set of test-only Firestore collections, meaning that the "live" data wouldn't be touched by the tests. We also added a /reset handler to this mode that would clear out these test collections after the test suite ran.

# How to

The frontend can be started by running `npm run start` in `/client`, and the backend can be started by `mvn package && ./run` in `/server`. Use the `--test` flag with `./run` if you wish to run the server in test mode (described above). Note that you may need to use `chmod +x ./run` before running the server so that your shell reads it as an executible.

# Collaboration

We used Clerk for authentication and Firebase for storing data via Firestore. We used the MUI library to help with frontend components.

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
