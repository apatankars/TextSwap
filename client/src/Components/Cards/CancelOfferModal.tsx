import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import { Offer } from "../../Types/types";

interface CancelOfferProps {
  offer: Offer;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCancel: () => void;
}

export function CancelOfferModal(props: CancelOfferProps) {
  return (
    <div className="cancel-offer-container">
      <Modal open={props.open} onClose={() => props.setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Cancel Offer Confirmation</DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to cancel your offer for{" "}
            <strong>{props.offer.listing.book.title}?</strong>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => props.onCancel()} // TODO: Implement onCancel
            >
              Cancel Offer
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => props.setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
}
