export enum Condition {
  New = "New",
  LikeNew = "Like New",
  Good = "Good",
  Fair = "Fair",
  Poor = "Poor",
}

export enum OfferStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Expired = "Expired",
  Cancelled = "Cancelled",
}

export enum listingStatus {
  Active = "Active",
  Sold = "Sold",
  Inactive = "Inactive",
}

export enum UniLevel {
  Undergraduate = "Undergraduate",
  Freshman = "Freshman",
  Sophomore = "Sophomore",
  Junior = "Junior",
  Senior = "Senior",
  Graduate = "Graduate Student",
}

// TODO: Data leakage in code by reusing the User type for everything instead of separating the User type into a User type and a UserPublic type

export interface User {
  userName: string;
  name: string;
  email: string;
  userID: string;
  uniLevel: UniLevel;
  rating: number;
  courses: string[];
}

export interface UserPublic {
  userName: string;
  name: string;
  userID: string;
  uniLevel: UniLevel;
  rating: number;
}

export interface course {
  courseID: string;
  courseName: string;
  books: Book[];
}

export interface Book {
  title: string;
  author: string;
  edition: string;
  isbn: string;
  price: number;
  image: string;
}

export interface Listing {
  listingID: string;
  book: Book;
  condition: Condition;
  course: string;
  price: number;
  seller: UserPublic;
  description: string;
  //TODO: Do we need to store the date of the listing?
  status: listingStatus;
}

export interface Offer {
  offerID: string;
  listing: Listing;
  buyer: UserPublic;
  sellerID: string;
  offerAmount: number;
  status: OfferStatus;
  dateSent: Date;
}
