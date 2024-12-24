import { toast } from "react-toastify";
import { Listing, UniLevel, User, listingStatus } from "../Types/types";
import { text } from "stream/consumers";
import bookcon from "../Icons/Book/bookcon.svg";
import { Offer, OfferStatus } from "../Types/types";
import { l } from "@clerk/clerk-react/dist/useAuth-Dfw9QOW7";

const HOST = "http://localhost:3232";

async function queryAPI(
  endpoint: string,
  query_params: Record<string, string>
) {
  // query_params is a dictionary of key-value pairs that gets added to the URL as query parameters
  // e.g. { foo: "bar", hell: "o" } becomes "?foo=bar&hell=o"
  const paramsString = Object.entries(query_params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  const url = `${HOST}/${endpoint}?${paramsString}`;
  console.log("API: ", url);
  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = `${response.status}: ${response.statusText}`;
    toast.error(errorMessage, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    throw new Error(errorMessage);
  }
  return response.json();
}

function created_time_to_date(nanos: number, seconds: number) {
  const milliseconds = seconds * 1000 + nanos / 1e6;
  const date = new Date(milliseconds);
  return date;
}

function status_to_enum(status: number) {
  switch (status) {
    case -1:
      return OfferStatus.Cancelled;
    case 0:
      return OfferStatus.Pending;
    case 1:
      return OfferStatus.Rejected;
    case 2:
      return OfferStatus.Accepted;
    default:
      return OfferStatus.Pending;
  }
}

function enum_to_status(status: OfferStatus) {
  switch (status) {
    case OfferStatus.Cancelled:
      return -1;
    case OfferStatus.Pending:
      return 0;
    case OfferStatus.Rejected:
      return 1;
    case OfferStatus.Accepted:
      return 2;
    default:
      return 0;
  }
}

async function JSON_to_textbook(json: any, listingID?: string) {
  const fetchCover = (isbn: string): string => {
    return isbn
      ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
      : bookcon; // Fallback if no ISBN is provided
  };

  const textbooks = await Promise.all(
    json.map(async (listing: any) => {
      const bookListing: Listing = {
        listingID: listing.id ? listing.id : listingID,
        book: {
          title: listing.title,
          author: listing.author,
          edition: listing.edition,
          isbn: listing.isbn,
          price: listing.originalPrice,
          image: fetchCover(listing.isbn),
        },
        condition: listing.condition,
        course: listing.course,
        price: listing.price,
        seller: {
          userName: listing.seller_username,
          name: listing.seller_name,
          userID: listing.seller_id,
          uniLevel: listing.seller_uni_level as UniLevel,
          rating: listing.seller_rating,
        },
        description: listing.description,
        status: listing.available ? listingStatus.Active : listingStatus.Sold,
      };
      return bookListing;
    })
  );

  return textbooks;
}

export async function getListings() {
  const data = await queryAPI("textbooks", {});
  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }
  const textbooks_raw = data.textbooks;
  const textbooks = await JSON_to_textbook(textbooks_raw);
  return textbooks;
}

export async function postListing(
  user: User,
  title: string,
  author: string,
  edition: string,
  isbn: string,
  condition: string,
  price: number,
  description: string,
  course: string,
  originalPrice: number
) {
  const uid = user.userID;
  const name = user.name;
  const username = user.userName;
  const userRating = user.rating;
  const userUniLevel = user.uniLevel;
  const data = await queryAPI("textbooks/new", {
    seller_id: uid,
    seller_name: name,
    seller_username: username,
    seller_rating: userRating.toString(),
    seller_uni_level: userUniLevel,
    title: title,
    author: author,
    edition: edition,
    isbn: isbn,
    condition: condition,
    price: price.toString(),
    description: description,
    course: course,
    original_price: originalPrice.toString(),
  });
  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }
  return data.id;
}

export async function buyListing(listing: Listing, buyer: User) {
  const data = await queryAPI("buynow", {
    textbook_id: listing.listingID,
    user_id: buyer.userID,
    price: listing.price.toString(),
  });
  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }
  return data.transaction_id;
}

export async function makeOffer(listing: Listing, buyer: User, price: number) {
  const data = await queryAPI("offers/new", {
    textbook_id: listing.listingID,
    seller_id: listing.seller.userID,
    user_id: buyer.userID,
    price: price.toString(),
  });
  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }
  return data.offer_id;
}

export async function getTextbookByID(textbookID: string) {
  const data = await queryAPI("textbooks", {
    id: textbookID,
  });
  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }
  const textbook = await JSON_to_textbook(data.textbooks, textbookID);
  return textbook[0];
}

async function getPublicUser(userID: string) {
  const data = await queryAPI("user/public", {
    user_id: userID,
  });

  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }

  const user_data = data.public_user;
  const user = {
    userName: user_data.username,
    name: user_data.first_name + " " + user_data.last_name,
    email: user_data.email,
    userID: user_data.user_id,
    uniLevel: user_data.uni_level as UniLevel,
    rating: user_data.rating,
  };
  return user;
}

export async function getIncomingOffers(user: User) {
  const data = await queryAPI("offers/incoming", {
    user_id: user.userID,
  });

  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }

  var offers = [];

  const offer_info = data.incoming_offers;
  for (let i = 0; i < offer_info.length; i++) {
    const listing = await getTextbookByID(offer_info[i].textbook_id);
    const status = offer_info[i].status;
    const offerPrice = offer_info[i].price;
    const offerID = offer_info[i].id;

    const offer: Offer = {
      offerID: offerID,
      listing: listing,
      sellerID: user.userID,
      buyer: await getPublicUser(offer_info[i].buyer_id),
      offerAmount: offerPrice,
      status: status_to_enum(status),
      dateSent: created_time_to_date(
        offer_info[i].created_at.nanos,
        offer_info[i].created_at.seconds
      ),
    };
    offers.push(offer);
  }

  return offers;
}

export async function getOutgoingOffers(user: User) {
  const data = await queryAPI("offers/outgoing", {
    user_id: user.userID,
  });

  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }

  var offers = [];

  const offer_info = data.outgoing_offers;

  for (let i = 0; i < offer_info.length; i++) {
    const listing = await getTextbookByID(offer_info[i].textbook_id);
    const status = offer_info[i].status;
    const offerPrice = offer_info[i].price;
    const offerID = offer_info[i].id;

    const offer: Offer = {
      offerID: offerID,
      listing: listing,
      sellerID: listing.seller.userID,
      buyer: user,
      offerAmount: offerPrice,
      status: status_to_enum(status),
      dateSent: created_time_to_date(
        offer_info[i].created_at.nanos,
        offer_info[i].created_at.seconds
      ),
    };
    offers.push(offer);
  }

  return offers;
}

export async function updateOfferStatus(
  offerID: string,
  status: string,
  reason?: string
) {
  const data = await queryAPI("offers/update", {
    offer_id: offerID,
    status_update: status,
    ...(reason !== undefined && { reason: reason }),
  });

  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }
}

export async function fetchUser(
  uid: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string
) {
  const data = await queryAPI("user/fetch", {
    user_id: uid,
    username: username,
    first_name: firstName,
    last_name: lastName,
    email: email,
  });
  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }
  const user_data = data.user_data;
  const user: User = {
    userName: user_data.username,
    name: user_data.first_name + " " + user_data.last_name,
    email: user_data.email,
    userID: user_data.id,
    uniLevel: user_data.uni_level as UniLevel,
    rating: user_data.rating,
    courses: user_data.courses,
  };
  return user;
}

export async function updateUser(
  uid: string,
  rating?: number,
  uniLevel?: UniLevel,
  courses?: string[]
) {
  const query: Record<string, any> = {
    user_id: uid,
    ...(rating !== undefined && { rating: rating.toString() }),
    ...(uniLevel !== undefined && { uni_level: uniLevel }),
    ...(courses !== undefined && { courses: JSON.stringify(courses) }),
  };

  const data = await queryAPI("user/update", query);

  if (data.response_type.toString().includes("ERROR")) {
    throw new Error(data.response_type.toString());
  }
}

export async function clearUser(uid: string) {
  return await queryAPI("clear-user", {
    uid: uid,
  });
}
