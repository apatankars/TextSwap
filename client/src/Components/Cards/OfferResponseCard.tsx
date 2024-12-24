// OfferResponseCard.tsx

import "../../Styles/offercard.css";
import { Offer, OfferStatus } from "../../Types/types";
import { Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/joy/Typography";
import { Dispatch, SetStateAction, useState } from "react";
import { RejectOfferModal } from "./RejectOfferModal";
import { AcceptModal } from "./AcceptModal";
import { updateOfferStatus } from "../../utils/api";

interface OfferCardProps {
  offer: Offer;
  incomingOffers: Offer[];
  setIncomingOffers: Dispatch<SetStateAction<Offer[]>>;
}

export function OfferResponseCard(props: OfferCardProps) {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  function getPercentChange(originalPrice: number, offerPrice: number) {
    return ((offerPrice - originalPrice) / originalPrice) * 100;
  }

  const handleReject = (reason: string) => {
    // Implement rejection logic here, e.g., API call
    updateOfferStatus(props.offer.offerID, "deny", reason);
    props.setIncomingOffers(
      props.incomingOffers.map((offer) =>
        offer.offerID === props.offer.offerID
          ? { ...offer, status: OfferStatus.Rejected } // Update the status
          : offer
      )
    );
    console.log("Rejected for reason:", reason);
  };

  const handleAccept = () => {
    // Implement acceptance logic here, e.g., API call
    updateOfferStatus(props.offer.offerID, "accept");
    props.setIncomingOffers(
      props.incomingOffers.map((offer) =>
        offer.offerID === props.offer.offerID
          ? { ...offer, status: OfferStatus.Accepted } // Update the status
          : offer
      )
    );
    setIsAcceptModalOpen(false);

    console.log("Accepted offer");
  };

  function getStatusContainer(status: OfferStatus) {
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
            Completed
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
            backgroundColor: "#c41d00",
            borderRadius: "15px",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#ffff",
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

  function getPercentChangeColor(percentChange: number) {
    if (percentChange > 0) {
      return "green";
    } else if (percentChange < 0) {
      return "red";
    } else {
      return "grey";
    }
  }

  function getAvatar() {
    return props.offer.buyer.name.charAt(0);
  }

  const handleEmailBuyer = () => {
    const sellerEmail = props.offer.buyer.userName; // Ensure 'email' exists
    if (sellerEmail) {
      window.location.href = `mailto:${sellerEmail}`;
    } else {
      alert("Buyers's email is not available.");
    }
  };

  // Determine the CSS class based on offer status
  const getCardClassName = (status: OfferStatus) => {
    switch (status) {
      case OfferStatus.Accepted:
        return "offer-card accepted";
      case OfferStatus.Rejected:
        return "offer-card declined";
      case OfferStatus.Pending:
        return "offer-card pending";
      case OfferStatus.Expired:
        return "offer-card expired";
      default:
        return "offer-card";
    }
  };

  console.log("Offer:", props.offer);

  return (
    <div className={getCardClassName(props.offer.status)}>
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
                  props.offer.listing.book.title.length > 30 ? "20px" : "26px",
              }}
            >
              {props.offer.listing.book.title}
            </div>
            <div className="listing-author">
              {props.offer.listing.seller.name}
            </div>
            <div className="listing-condition">
              Condition: {props.offer.listing.condition}
            </div>

            <div className="price-container">
              <div className="listing-book-original-price">
                Original Price: ${props.offer.listing.book.price}
              </div>
              <div className="listing-book-selling-price">
                Listing Price: ${props.offer.listing.price}
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
              fontSize: "20px",
            }}
          >
            Offer from: {props.offer.buyer.name}
          </Typography>
          <div className="user-info-container">
            <Avatar sx={{ bgcolor: "blue" }}>{getAvatar()}</Avatar>
            <div className="user-info">
              <Rating
                name="read-only"
                value={props.offer.buyer.rating}
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
                {props.offer.buyer.uniLevel} at Brown University
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
          <Typography>
            <span
              style={{
                color: "#1e0e62",
                fontWeight: "400",
                fontSize: "24px",
                textTransform: "uppercase",
              }}
            >
              Offer Price:{" "}
            </span>

            <span
              style={{
                color: "#1e0e62",
                fontWeight: "500",
                fontSize: "32px",
              }}
            >
              ${props.offer.offerAmount}
            </span>
          </Typography>
          <Typography
            style={{
              color: getPercentChangeColor(
                getPercentChange(
                  props.offer.listing.price,
                  props.offer.offerAmount
                )
              ),
              textTransform: "uppercase",
              fontWeight: "500",
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            Change:{" "}
            {getPercentChange(
              props.offer.listing.price,
              props.offer.offerAmount
            ).toFixed(2)}
            %
          </Typography>
          <div className="decision-container">
            {props.offer.status !== OfferStatus.Accepted &&
            props.offer.status !== OfferStatus.Rejected &&
            props.offer.status !== OfferStatus.Expired ? (
              <>
                <button
                  className="accept-block"
                  onClick={() => setIsAcceptModalOpen(true)}
                >
                  <div className="decision-text">ACCEPT OFFER</div>
                </button>

                <AcceptModal
                  open={isAcceptModalOpen}
                  onClose={() => setIsAcceptModalOpen(false)}
                  offer={props.offer}
                  onConfirm={handleAccept}
                ></AcceptModal>

                <button
                  className="cancel-block"
                  onClick={() => setIsRejectModalOpen(true)}
                >
                  <div className="decision-text">DECLINE OFFER</div>
                </button>
                <RejectOfferModal
                  open={isRejectModalOpen}
                  onClose={() => setIsRejectModalOpen(false)}
                  listing={props.offer.listing}
                  onReject={handleReject}
                ></RejectOfferModal>
              </>
            ) : props.offer.status === OfferStatus.Accepted ? (
              <button className="email-block" onClick={handleEmailBuyer}>
                <div className="decision-text">EMAIL BUYER</div>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
