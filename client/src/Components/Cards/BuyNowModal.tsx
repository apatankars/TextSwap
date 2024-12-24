import { Box, Button, Modal, Typography } from "@mui/joy";
import { Listing, User } from "../../Types/types";
import { Avatar, Divider, Rating } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { buyListing } from "../../utils/api";

interface BuyNowModalProps {
  user: User | null;
  listing: Listing;
  closeModal: () => void;
  listings: Listing[];
  setListings: Dispatch<SetStateAction<Listing[]>>;
}

export function BuyNowModal(props: BuyNowModalProps) {
  if (!props.user) {
    return null;
  }

  const handleConfirmPurchase = () => {
    if (props.user) {
      buyListing(props.listing, props.user);
    }
    // Update listings
    const updatedListings = props.listings.filter(
      (listing) => listing.listingID !== props.listing.listingID
    );
    props.setListings(updatedListings);
    alert(
      `You have purchased ${props.listing.book.title} by ${props.listing.book.author} for $${props.listing.book.price}.`
    );
    props.closeModal();
  };

  function getAvatar() {
    return props.listing.seller.name.charAt(0).toUpperCase();
  }

  return (
    <Modal
      open={true}
      onClose={props.closeModal}
      aria-labelledby="modal-title"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: "3%",
          borderRadius: 16,
          backgroundColor: "background.body",
          boxShadow: "md",
        }}
      >
        <Typography
          id="modal-title"
          level="h4"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "DM Sans",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Confirm Purchase
        </Typography>
        <Divider sx={{ mb: 2 }}>Seller Info</Divider>
        <div
          className="seller-info-container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar style={{ marginRight: "10px" }}>{getAvatar()}</Avatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography>
              <strong>Seller:</strong> {props.listing.seller.name}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>
                <strong>Rating:</strong>{" "}
              </Typography>
              <Rating value={props.listing.seller.rating}></Rating>
            </div>
          </div>
        </div>
        <Divider sx={{ marginBottom: "15px", marginTop: "5px" }}>
          Book Info
        </Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            className="title-and-author-container"
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
            }}
          >
            <Typography
              level="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#4F378A",
                marginBottom: "3px",
                letterSpacing: "-0.4px",
                textTransform: "uppercase",
                textWrap: "balance",
                textAlign: "left",
              }}
            >
              {props.listing.book.title}
            </Typography>
            <Typography
              level="body-sm"
              sx={{
                fontSize: "12px",
                color: "#955CF6",
                marginBottom: "8px",
              }}
            >
              by {props.listing.book.author}
            </Typography>
          </div>
          <div
            className="infomation-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginRight: "45px",
              minWidth: "45%",
            }}
          >
            <div
              className="courseCode"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Typography
                level="body-sm"
                sx={{
                  fontSize: "14px",
                  color: "#000",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {props.listing.course}
              </Typography>
            </div>
          </div>
        </div>
        <Divider sx={{ marginBottom: "15px", marginTop: "5px" }}></Divider>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#000",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          <strong>Price:</strong> ${props.listing.book.price}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            onClick={handleConfirmPurchase}
            color="success"
            variant="solid"
            sx={{
              marginRight: "10px",
            }}
          >
            Confirm
          </Button>
          <Button onClick={props.closeModal} color="danger" variant="soft">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
