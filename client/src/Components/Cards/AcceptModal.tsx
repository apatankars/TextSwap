import { Button, Modal, Sheet, Typography } from "@mui/joy";
import { Offer } from "../../Types/types";

interface AcceptModalProps {
  offer: Offer;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void; // Callback for the confirm action
}

export function AcceptModal(props: AcceptModalProps) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="confirm-purchase-modal-title"
        aria-describedby="confirm-purchase-modal-description"
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: "20vh",
            p: 3,
            borderRadius: "md",
            boxShadow: "lg",
          }}
        >
          <Typography
            id="confirm-purchase-modal-title"
            level="h4"
            component="h2"
            sx={{
              marginBottom: 2,
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
            Confirm Purchase
          </Typography>
          <Typography id="confirm-purchase-modal-description" sx={{ mb: 2 }}>
            Are you sure you want to accept the offer of{" "}
            <strong>${props.offer.offerAmount}</strong> for{" "}
            <em>{props.offer.listing.book.title}</em> ?
          </Typography>
          <Typography sx={{ mb: 2, fontSize: "0.8rem" }}>
            {" "}
            <em>This action cannot be undone</em>
          </Typography>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="solid"
              color="primary"
              onClick={props.onConfirm} // Handle confirm action
              sx={{ flex: 1 }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={props.onClose} // Close modal without confirming
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
          </div>
        </Sheet>
      </Modal>
    </div>
  );
}
