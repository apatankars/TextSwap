import { useState } from "react";
import { Listing } from "../../Types/types";
import Button from "@mui/material/Button";
import Modal from "@mui/joy/Modal";
import { Grid, ModalClose, Sheet } from "@mui/joy";
import { FiAlertTriangle } from "react-icons/fi";
import { Typography } from "@mui/material";
import { TbBasketCancel } from "react-icons/tb";

// TODO: This class needs to be implemented to handle actually rejecting an offer

interface RejectOfferModalProps {
  listing: Listing;
  open: boolean;
  onClose: () => void;
  onReject: (reason: string, message?: string) => void;
}

export function RejectOfferModal(props: RejectOfferModalProps) {
  const { listing, open, onClose, onReject } = props;
  const [selectedReason, setSelectedReason] = useState<string>("Other");
  const [message, setMessage] = useState<string>("");

  const reasons = [
    "Price too low",
    "Item not as described",
    "Changed my mind",
    "Sold to another buyer",
    "Other",
  ];

  const handleConfirm = () => {
    onReject(selectedReason + ": " + message);
    // Reset state after rejection
    setSelectedReason("");
    setMessage("");
    onClose();
  };

  const handleCancel = () => {
    // Reset state on cancel
    setSelectedReason("");
    setMessage("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        sx={{
          width: "40vw",
          //   maxWidth: "90%",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
          backgroundColor: "white",
          position: "relative",
          display: "flex",
          flexDirection: "column",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="header-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              width: "100%",
            }}
          >
            <FiAlertTriangle
              style={{ fontSize: "32px", color: "#C41D00" }}
            ></FiAlertTriangle>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: 600,
                marginLeft: "8px",
                color: "#C41D00",
                fontFamily: "DM Sans",
                textTransform: "uppercase",
                letterSpacing: "2px",
                textAlign: "center",
              }}
            >
              Reject Offer
            </Typography>
          </div>
          <div
            className="reason-container"
            style={{
              width: "100%",
              padding: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                marginLeft: "8px",
                color: "#000",
                fontFamily: "DM Sans",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Select Reason (Optional)
            </Typography>
            <Grid container spacing={2} sx={{ flexGrow: 1, margin: "3px" }}>
              {reasons.map((reason, index) => (
                <Grid sm={6}>
                  <Button
                    key={index}
                    variant="outlined"
                    color="primary"
                    onClick={() => setSelectedReason(reason)}
                    sx={{
                      padding: "10px 0 10px 0",
                      borderRadius: "8px",
                      borderColor:
                        selectedReason === reason ? "#fca5a5" : "#BDBDBD",
                      color: selectedReason === reason ? "#b91c1c" : "#BDBDBD",
                      backgroundColor:
                        selectedReason === reason ? "#fef2f2" : "white",
                      fontFamily: "DM Sans",
                      textTransform: "capitalize",
                      width: "100%",
                    }}
                  >
                    {reason}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
          <div
            className="message-container"
            style={{
              width: "100%",
              padding: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                marginLeft: "8px",
                color: "#000",
                fontFamily: "DM Sans",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Additional Details (Optional)
            </Typography>
            <div>
              <textarea
                placeholder="Provide more context about why you're rejecting the offer..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: "95%",
                  maxWidth: "95%",
                  height: "100px",
                  maxHeight: "200px",
                  borderRadius: "8px",
                  padding: "8px",
                  border: "1px solid #BDBDBD",
                  fontFamily: "DM Sans",
                  fontSize: "16px",
                  alignItems: "center",
                  margin: "8px",
                }}
              ></textarea>
            </div>
            <Button
              onClick={() => handleConfirm()}
              sx={{
                backgroundColor: "#b91c1c",

                padding: "10px 0",
                borderRadius: "8px",
                width: "100%",
                marginTop: "16px",
              }}
            >
              <div
                className="header-container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <TbBasketCancel
                  style={{
                    fontSize: "20px",
                    color: "white",
                    marginRight: "8px",
                  }}
                ></TbBasketCancel>
                <Typography
                  sx={{
                    fontFamily: "DM Sans",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  Confirm Rejection
                </Typography>
              </div>
            </Button>
          </div>
        </div>
      </Sheet>
    </Modal>
  );
}
