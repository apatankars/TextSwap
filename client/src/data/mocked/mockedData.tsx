import { UniLevel } from "../../Types/types";
import {
  buyListing,
  fetchUser,
  getTextbookByID,
  makeOffer,
  postListing,
  updateOfferStatus,
  updateUser,
} from "../../utils/api";

export async function MockedData() {
  // First, we’ll fetch the user objects to ensure they exist in the backend
  const tim = await fetchUser(
    "user_2qMEiiTKPlST0bWju5iIs6n35b2",
    "tnelson",
    "Tim",
    "Nelson",
    "tim_nelson@example.com"
  );

  const armaan = await fetchUser(
    "user_2qGpCnQ8PA3QMQyn1HWnx61omL6",
    "apatankar",
    "Armaan",
    "Patankar",
    "armaan_patankar@brown.edu"
  );

  const mock1 = await fetchUser(
    "user_2qMEzs7joOC2bhy1gNzV7oPoT5X",
    "mock1",
    "Mock",
    "Account1",
    "mock1@example.com"
  );

  const mock2 = await fetchUser(
    "user_2qMF23ZUjkzw8nmTFdszSrnZBW7",
    "mock2",
    "Mock",
    "Account2",
    "mock2@example.com"
  );

  const aaron = await fetchUser(
    "user_2qKZusj4GsjVKD9TCuCFsxgbF1F",
    "aaronzp",
    "Aaron",
    "Perrotta",
    "aaron_perrotta@brown.edu"
  );

  // Update user fields
  await updateUser(tim.userID, 4.7, UniLevel.Senior, [
    "CSCI 1010",
    "CSCI 0220",
    "MATH 1000",
  ]);
  await updateUser(armaan.userID, 4.9, UniLevel.Graduate, [
    "ENGN 2520",
    "CSCI 2950",
  ]);
  await updateUser(mock1.userID, 3.2, UniLevel.Freshman, [
    "ECON 1100",
    "HIST 2300",
    "MATH 2210",
  ]);
  await updateUser(mock2.userID, 4.5, UniLevel.Junior, [
    "CSCI 2950",
    "BIOL 2010",
    "MATH 2510",
  ]);
  await updateUser(aaron.userID, 4.8, UniLevel.Sophomore, [
    "ENGN 1450",
    "MATH 1000",
    "PHYS 0030",
  ]);

  // Re-fetch users to get updated data if needed
  const timUpdated = await fetchUser(
    tim.userID,
    tim.userName,
    tim.name.split(" ")[0],
    tim.name.split(" ")[1],
    tim.email
  );
  const armaanUpdated = await fetchUser(
    armaan.userID,
    armaan.userName,
    armaan.name.split(" ")[0],
    armaan.name.split(" ")[1],
    armaan.email
  );
  const mock1Updated = await fetchUser(
    mock1.userID,
    mock1.userName,
    mock1.name.split(" ")[0],
    mock1.name.split(" ")[1],
    mock1.email
  );
  const mock2Updated = await fetchUser(
    mock2.userID,
    mock2.userName,
    mock2.name.split(" ")[0],
    mock2.name.split(" ")[1],
    mock2.email
  );
  const aaronUpdated = await fetchUser(
    aaron.userID,
    aaron.userName,
    aaron.name.split(" ")[0],
    aaron.name.split(" ")[1],
    aaron.email
  );

  // Post listings
  const timListingID = await postListing(
    timUpdated,
    "Designing Data-Intensive Applications",
    "Martin Kleppmann",
    "1st",
    "9781491904245",
    "Good",
    45,
    "Gently used, great for data systems course",
    "CSCI 2950",
    55
  );

  const armaanListingID = await postListing(
    armaanUpdated,
    "Clean Code",
    "Robert C. Martin",
    "1st",
    "9780132350884",
    "Like new",
    30,
    "Barely used, essential reading for coding best practices",
    "CSCI 0220",
    35
  );

  const mock1ListingID = await postListing(
    mock1Updated,
    "Introduction to Algorithms",
    "Thomas H. Cormen",
    "3rd",
    "9780262033848",
    "Fair",
    60,
    "Some wear and tear, but all pages intact",
    "CSCI 1010",
    80
  );

  const mock2ListingID = await postListing(
    mock2Updated,
    "Organic Chemistry",
    "David R. Klein",
    "2nd",
    "9781119235563",
    "Good",
    100,
    "Highlights in some chapters, otherwise good condition",
    "CHEM 0330",
    150
  );

  const aaronListingID = await postListing(
    aaronUpdated,
    "Solid State Physics",
    "Author Ashcroft",
    "1st",
    "9798214353098",
    "New",
    70,
    "1st edition never used",
    "ENGN 1450",
    90
  );

  // Make and update offers:
  // Armaan offers $40 for Tim's listing
  const armaanOfferOnTim = await makeOffer(
    await getTextbookByID(timListingID),
    armaanUpdated,
    40
  );

  // Tim accepts Armaan’s offer
  await updateOfferStatus(armaanOfferOnTim, "2"); // 2 = Accepted

  // Mock1 offers $25 for Armaan’s listing
  const mock1OfferOnArmaan = await makeOffer(
    await getTextbookByID(armaanListingID),
    mock1Updated,
    25
  );

  // Armaan rejects Mock1's offer
  await updateOfferStatus(mock1OfferOnArmaan, "1"); // 1 = Rejected

  // Mock2 offers $50 for Mock1's listing
  const mock2OfferOnMock1 = await makeOffer(
    await getTextbookByID(mock1ListingID),
    mock2Updated,
    50
  );
  // Offer remains pending (no update call)

  // Tim buys Mock2's listing outright
  await buyListing(await getTextbookByID(mock2ListingID), timUpdated);

  // atp:
  // tims book is sold to armaan
  // mock2 book is sold to tim

  // Aaron offers $25 for Armaan's listing
  const aaronOfferOnArmaan = await makeOffer(
    await getTextbookByID(armaanListingID),
    aaronUpdated,
    25
  );
  // Armaan rejects Aaron's offer
  await updateOfferStatus(aaronOfferOnArmaan, "1"); // 1 = Rejected
  // Aaron offers $28 for Armaan's listing
  const aaronOfferOnArmaan2 = await makeOffer(
    await getTextbookByID(armaanListingID),
    aaronUpdated,
    28
  );
  // Armaan rejects Aaron's offer
  await updateOfferStatus(aaronOfferOnArmaan2, "1"); // 1 = Rejected
  // Aaron offers $30 for Armaan's listing
  const aaronOfferOnArmaan3 = await makeOffer(
    await getTextbookByID(armaanListingID),
    aaronUpdated,
    30
  );
  // Armaan accepts offer
  await updateOfferStatus(aaronOfferOnArmaan3, "2"); // 2 = Accepted

  // Armaan buys Aaron's book outright
  await buyListing(await getTextbookByID(aaronListingID), armaanUpdated);

  console.log("Mocked data populated successfully!");

  // Now the database should have:
  // - Fully populated user data with ratings, uniLevels, and courses
  // - Four listings from each user
  // - Several offers in various states (accepted, rejected, pending)
  // - One completed buy-now transaction
  const sarah = await fetchUser(
    "user_2qNxs4TKbFZ03bPls3TR7oYuN15",
    "sarahm",
    "Sarah",
    "Miller",
    "sarah_miller@example.com"
  );

  const david = await fetchUser(
    "user_2qRtXnKLmQZw8n6RWsdfT0kLs1H",
    "davidj",
    "David",
    "Johnson",
    "david_johnson@example.com"
  );

  const emily = await fetchUser(
    "user_2qYH0Q8aPLk90mTWxWVrX32LN7Z",
    "emilyw",
    "Emily",
    "Walker",
    "emily_walker@brown.edu"
  );

  const liam = await fetchUser(
    "user_2qHFs32ZbLs2T9nRmWdsXKpLT5B",
    "liamd",
    "Liam",
    "Davis",
    "liam_davis@brown.edu"
  );

  // Update user details
  await updateUser(sarah.userID, 4.6, UniLevel.Sophomore, [
    "CSCI 1410",
    "MATH 1800",
  ]);
  await updateUser(david.userID, 4.3, UniLevel.Senior, [
    "ECON 1210",
    "CSCI 1660",
  ]);
  await updateUser(emily.userID, 4.9, UniLevel.Graduate, [
    "BIOL 0200",
    "CHEM 0360",
  ]);
  await updateUser(liam.userID, 4.4, UniLevel.Junior, [
    "PHYS 0040",
    "CSCI 0320",
  ]);

  // Add new textbook listings
  const sarahListingID = await postListing(
    sarah,
    "Artificial Intelligence: A Modern Approach",
    "Stuart Russell",
    "4th",
    "9780134610993",
    "Excellent",
    80,
    "Latest edition, barely used, perfect for AI courses",
    "CSCI 1410",
    90
  );

  const davidListingID = await postListing(
    david,
    "The Art of Computer Programming, Volume 1",
    "Donald Knuth",
    "3rd",
    "9780201896831",
    "Good",
    50,
    "A must-have for advanced CS studies",
    "CSCI 1660",
    60
  );

  const emilyListingID = await postListing(
    emily,
    "Campbell Biology",
    "Lisa A. Urry",
    "12th",
    "9780135188743",
    "Fair",
    100,
    "Has highlights but fully intact",
    "BIOL 0200",
    120
  );

  const liamListingID = await postListing(
    liam,
    "Introduction to Quantum Mechanics",
    "David J. Griffiths",
    "3rd",
    "9781107189638",
    "Like New",
    70,
    "Great condition, no markings",
    "PHYS 0040",
    80
  );

  // Add more offers and transactions
  // Sarah offers $75 for Emily's listing
  const sarahOfferOnEmily = await makeOffer(
    await getTextbookByID(emilyListingID),
    sarah,
    75
  );
  await updateOfferStatus(sarahOfferOnEmily, "2"); // Accepted

  // Liam offers $60 for David's listing
  const liamOfferOnDavid = await makeOffer(
    await getTextbookByID(davidListingID),
    liam,
    60
  );
  await updateOfferStatus(liamOfferOnDavid, "2"); // Accepted

  // Emily buys Sarah's listing outright
  await buyListing(await getTextbookByID(sarahListingID), emily);

  // David offers $65 for Liam's listing, and Liam accepts
  const davidOfferOnLiam = await makeOffer(
    await getTextbookByID(liamListingID),
    david,
    65
  );
  const emilyOfferOnLiam = await makeOffer(
    await getTextbookByID(liamListingID),
    emily,
    70
  );
  await updateOfferStatus(davidOfferOnLiam, "1"); // Rejected
  await updateOfferStatus(emilyOfferOnLiam, "2"); // Accepted

  console.log("Expanded mocked data populated successfully!");
}
