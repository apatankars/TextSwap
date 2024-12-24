import { Dispatch, SetStateAction, useState } from "react";
import "../../Styles/bookCard.css";
import { BookModal } from "./BookModal";
import { Listing, User } from "../../Types/types";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/joy";

interface BookCardProps {
  user: User | null;
  listing: Listing;
  listings: Listing[];
  setListings: Dispatch<SetStateAction<Listing[]>>;
}

export function BookCard(props: BookCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true); // State to track image loading

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box className="book-card">
        <div className="book-image-container">
          {imageLoading && <div className="loading-spinner"></div>}
          <img
            src={props.listing.book.image}
            alt="Book cover"
            className="book-cover-image"
            onLoad={() => setImageLoading(false)} // Hide spinner when image loads
            onError={() => setImageLoading(false)} // Handle errors gracefully
            // style={{ display: imageLoading ? "none" : "block" }} // Hide image while loading
          />
        </div>
        <div className="book-info">
          <div className="book-course-code">{props.listing.course}</div>
          <div
            className="book-title"
            style={{
              fontSize: props.listing.book.title.length > 30 ? "20px" : "26px",
            }}
          >
            {props.listing.book.title}
          </div>
          <div className="book-seller">{props.listing.book.author}</div>{" "}
          <div className="book-condition">
            Condition: {props.listing.condition}
          </div>
          <div
            className="seller-info"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "left",
              width: "100%",
            }}
          >
            <Sheet
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "right",
                justifyContent: "center",
                paddingBottom: "10px",
                borderRadius: "10px",
                width: "100%",
                background: "transparent",
              }}
            >
              <Typography
                level="body-sm"
                sx={{
                  fontSize: "12px",
                  color: "#000",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  textWrap: "balance",
                  textAlign: "left ",
                  marginLeft: "3px",
                  width: "100%",
                  paddingRight: "3px",
                  background: "transparent",
                }}
              >
                <strong>Seller: {props.listing.seller.name}</strong>
              </Typography>
            </Sheet>
          </div>
          <div className="button-price-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginRight: "5px",
              }}
            >
              <span className="book-original-price">
                ${props.listing.book.price}
              </span>
              <Typography
                level="body-sm"
                sx={{
                  fontSize: "40px",
                  color: "#350f9d",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textWrap: "balance",
                  textAlign: "right",
                  width: "fit-content",
                }}
              >
                ${props.listing.price}
              </Typography>
            </div>
            <button
              className="view-details-button"
              onClick={openModal}
              style={{ borderRadius: "10px", maxWidth: "100px", top: "15%" }}
            >
              VIEW DETAILS
            </button>
          </div>
        </div>
      </Box>
      {modalOpen && (
        <BookModal
          listing={props.listing}
          open={modalOpen}
          onClose={closeModal}
          listings={props.listings}
          setListings={props.setListings}
          user={props.user}
        />
      )}
    </>
  );
}
