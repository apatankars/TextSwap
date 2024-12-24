import React, { useState } from "react";
import { Modal, Box, Typography, Button, Stack, ModalClose } from "@mui/joy";
import { Listing, User } from "../../Types/types";
import { Divider } from "@mui/material";
import { makeOffer } from "../../utils/api";
import TextField from "@mui/material/TextField"; // Import TextField for input

interface OfferModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  listing: Listing;
}

export function OfferModal(props: OfferModalProps) {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [customOffer, setCustomOffer] = useState<string>(""); // State for custom offer input
  const [error, setError] = useState<string>(""); // State for input validation error

  function handleSubmit() {
    let offerAmount;
    if (selectedOffer !== null) {
      offerAmount = parseFloat(suggestedOffers[selectedOffer].value);
    } else if (customOffer !== "") {
      offerAmount = parseFloat(customOffer);
      if (isNaN(offerAmount) || offerAmount < 0) {
        setError("Please enter a valid number greater than or equal to zero.");
        return;
      }
    } else {
      // No offer selected or custom amount entered
      return;
    }

    if (props.user) {
      makeOffer(props.listing, props.user, offerAmount);
      alert(
        `You have offered $${offerAmount} for ${props.listing.book.title} by ${props.listing.book.author}.`
      );
      props.onClose();
    }
  }

  const suggestedOffers = [
    {
      label: "10% Off",
      value: (props.listing.price * 0.9).toFixed(2),
      styles: {
        borderColor: "#34d399", // Green
        color: "#065f46",
        backgroundColor: "#ecfdf5",
      },
    },
    {
      label: "20% Off",
      value: (props.listing.price * 0.8).toFixed(2),
      styles: {
        borderColor: "#facc15", // Yellow
        color: "#854d0e",
        backgroundColor: "#fefce8",
      },
    },
    {
      label: "30% Off",
      value: (props.listing.price * 0.7).toFixed(2),
      styles: {
        borderColor: "#f87171", // Red
        color: "#7f1d1d",
        backgroundColor: "#fef2f2",
      },
    },
  ];

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="offer-modal-title"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.body",
          borderRadius: "lg",
          boxShadow: "lg",
          p: 4,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(145deg, #f0f4f8, #ffffff)",
        }}
      >
        <ModalClose
          variant="plain"
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
            color: "grey.700",
          }}
        />
        <Typography
          id="offer-modal-title"
          level="h4"
          sx={{
            mb: 2,
            color: "#1e0e62",
            fontWeight: "xl",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            textTransform: "uppercase",
            textAlign: "center",
            fontFamily: "DM Sans",
            letterSpacing: "0.05em",
            fontSize: "24px",
          }}
        >
          Make an Offer
        </Typography>
        <Divider sx={{ my: 3 }}>Listing Info</Divider>
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
                textAlign: "left",
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
                marginBottom: "2px",
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
        <Divider sx={{ my: 3 }}>Offer Details</Divider>
        <Typography
          level="body-md"
          sx={{
            mb: 3,
            color: "neutral.700",
            fontWeight: "md",
          }}
        >
          Suggested offers based on the listing price (${props.listing.price}):
        </Typography>

        <Stack direction={"row"}>
          {suggestedOffers.map((offer, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => setSelectedOffer(index)}
              sx={{
                padding: "10px 0",
                borderRadius: "0px",
                borderColor:
                  selectedOffer === index
                    ? offer.styles.borderColor
                    : "#BDBDBD",
                color: selectedOffer === index ? offer.styles.color : "#BDBDBD",
                backgroundColor:
                  selectedOffer === index
                    ? offer.styles.backgroundColor
                    : "white",
                fontFamily: "DM Sans",
                textTransform: "uppercase",
                width: "100%",
                fontSize: "20px",
                letterSpacing: "0.05em",
                transition: "all 0.3s ease", // Add smooth transitions
              }}
            >
              {offer.label}: ${offer.value}
            </Button>
          ))}
        </Stack>

        <Typography
          level="body-md"
          sx={{
            mt: 3,
            mb: 1,
            color: "neutral.700",
            fontWeight: "md",
          }}
        >
          Or enter a custom offer amount:
        </Typography>
        <TextField
          type="number"
          value={customOffer}
          onChange={(e) => {
            setCustomOffer(e.target.value);
            setSelectedOffer(null); // Deselect suggested offers when custom input is used
            setError(""); // Clear validation error on input change
          }}
          placeholder="Enter custom offer amount"
          error={!!error}
          helperText={error}
          sx={{
            width: "100%",
            mb: 2,
          }}
          inputProps={{
            min: 0,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            color="neutral"
            onClick={props.onClose}
            sx={{
              flex: 1,
              borderRadius: "md",
              "&:hover": {
                bgcolor: "neutral.100",
              },
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontFamily: "DM Sans",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="primary"
            disabled={selectedOffer === null && customOffer === ""}
            onClick={handleSubmit}
            sx={{
              flex: 1,
              borderRadius: "md",
              bgcolor: "#4f378a",
              "&:hover": {
                bgcolor: "#552dc4",
              },
              "&:disabled": {
                opacity: 0.5,
                cursor: "not-allowed",
              },
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontFamily: "DM Sans",
            }}
          >
            Submit Offer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default OfferModal;
