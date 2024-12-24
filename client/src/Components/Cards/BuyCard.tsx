import "../../Styles/buyCard.css"; // TODO: Change to buyCard.css
import { Offer, OfferStatus } from "../../Types/types";
import { Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/joy/Typography";
import { Dispatch, SetStateAction, useState } from "react";
import { CancelOfferModal } from "./CancelOfferModal";
import { Button } from "@mui/joy";
import { updateOfferStatus } from "../../utils/api";

interface BookCardProps {
  offer: Offer;
  outGoingOffers: Offer[];
  setOutGoingOffers: Dispatch<SetStateAction<Offer[]>>;
}

export function BuyCard(props: BookCardProps) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  function onCancel() {
    console.log("Cancelling offer...");
    updateOfferStatus(props.offer.offerID, "cancel");
    props.setOutGoingOffers(
      props.outGoingOffers.map((offer) =>
        offer.offerID === props.offer.offerID
          ? { ...offer, status: OfferStatus.Cancelled } // Update the status
          : offer
      )
    );
    console.log("Offer cancelled");
  }

  function calculateRemainingTime(offerTime: Date) {
    const offerDate = new Date(offerTime); // Offer creation time
    const expiryDate = new Date(offerDate.getTime() + 48 * 60 * 60 * 1000); // Add 48 hours
    const now = new Date();

    const diffMs = expiryDate.getTime() - now.getTime(); // Time difference in milliseconds

    if (diffMs > 0) {
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      return `${hours} hours`;
    } else {
      return -1;
    }
  }

  function getStatusContainer(status: OfferStatus) {
    console.log("Offer status: ", status);
    if (status === OfferStatus.Accepted) {
      return (
        <div
          className="offer-status-container"
          style={{
            width: "80%",
            padding: "8px 0 8px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1E0E62",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#C3ECDF",
              textTransform: "uppercase",
              fontWeight: "500",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            {status}
          </Typography>
        </div>
      );
    } else if (status === OfferStatus.Pending) {
      return (
        <div
          className="offer-status-container"
          style={{
            width: "70%",
            padding: "8px 0 8px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E2A83C",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#7E5B11",
              textTransform: "uppercase",
              fontWeight: "500",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            {status}
          </Typography>
        </div>
      );
    } else if (
      status === OfferStatus.Expired ||
      status === OfferStatus.Rejected
    ) {
      return (
        <div
          className="offer-status-container"
          style={{
            width: "70%",
            padding: "8px 0 8px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E2A83C",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#7E5B11",
              textTransform: "uppercase",
              fontWeight: "500",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            {status}
          </Typography>
        </div>
      );
    }
  }

  function getMessage(status: OfferStatus): string {
    if (status === OfferStatus.Accepted) {
      return `${props.offer.listing.seller.name} has accepted your offer!`;
    } else if (status === OfferStatus.Rejected) {
      return `${props.offer.listing.seller.name} has rejected your offer`;
    } else if (status === OfferStatus.Expired) {
      return `Your offer has expired`;
    } else {
      const hours = calculateRemainingTime(props.offer.dateSent);
      if (hours === -1) {
        return getMessage(OfferStatus.Expired);
      }
      return `${props.offer.listing.seller.name} has ${hours} left to respond`;
    }
  }

  function getButton(status: OfferStatus) {
    if (status === OfferStatus.Pending) {
      return (
        <Button
          className="cancel-offer-button"
          color="danger"
          sx={{ borderRadius: "16px" }}
          onClick={() => setIsCancelModalOpen(true)}
        >
          <Typography
            sx={{
              color: "#FFF",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "500",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Cancel Offer
          </Typography>
        </Button>
      );
    } else if (status === OfferStatus.Accepted) {
      return (
        <button
          className="complete-purchase-button"
          onClick={() =>
            (window.location.href = `mailto:${props.offer.listing.seller.userName}`)
          }
        >
          <Typography
            sx={{
              color: "#FFF",
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "500",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textWrap: "balance",
            }}
          >
            Email Seller
          </Typography>
        </button>
      );
    } else {
      return (
        <div className="default-message-container">
          <Typography
            sx={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            This offer is no longer active.
          </Typography>
        </div>
      );
    }
  }

  function getAvatar() {
    return props.offer.listing.seller.name.charAt(0);
  }

  return (
    <>
      <div className="offer-card">
        <div className="listing-information-container">
          <img
            src={props.offer.listing.book.image}
            alt="Book cover"
            className="book-cover"
          />
          <div className="card-details">
            <div className="book-info">
              <div className="listing-course-code">
                {props.offer.listing.course}
              </div>
              <div
                className="listing-title"
                style={{
                  fontSize:
                    props.offer.listing.book.title.length > 30
                      ? "20px"
                      : "26px",
                }}
              >
                {props.offer.listing.book.title}
              </div>
              <div className="listing-author">
                {props.offer.listing.book.author}
              </div>
              <div className="listing-condition">
                Condition: {props.offer.listing.condition}
              </div>

              <div className="price-container">
                <div className="listing-book-price">
                  Listing Price: ${props.offer.listing.price}
                </div>
                <div className="listing-book-selling-price">
                  Your Offer: ${props.offer.offerAmount}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="offer-details">
          {getStatusContainer(props.offer.status)}
          <div className="user-details">
            <Typography
              sx={{
                color: "#4f378a",
                textTransform: "uppercase",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Seller Info: {props.offer.listing.seller.name}
            </Typography>
            <div className="user-info-container">
              <Avatar sx={{ bgcolor: "blue" }}>{getAvatar()}</Avatar>
              <div className="user-info">
                <Rating
                  name="read-only"
                  value={props.offer.listing.seller.rating}
                  readOnly
                />
                <Typography
                  level="body-sm"
                  sx={{
                    fontSize: "8px",
                    color: "#000",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    textWrap: "balance",
                  }}
                >
                  {props.offer.listing.seller.uniLevel} at Brown University
                </Typography>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "black",
                margin: "10px 0 10px 0",
              }}
            ></div>
          </div>

          <div className="offer-response-container">
            <Typography
              sx={{
                color: "#000",
                fontSize: "20px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <span>{getMessage(props.offer.status)}</span>
            </Typography>
            <div className="decision-container">
              {getButton(props.offer.status)}
            </div>
          </div>
        </div>
      </div>
      {isCancelModalOpen && (
        <CancelOfferModal
          offer={props.offer}
          open={isCancelModalOpen}
          setOpen={setIsCancelModalOpen}
          onCancel={onCancel}
        />
      )}
    </>
  );
}
