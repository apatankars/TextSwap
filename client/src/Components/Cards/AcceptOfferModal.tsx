import React, { useState } from "react";
import { Listing } from "../../Types/types";
import Modal from "@mui/joy/Modal";
import Button from "@mui/material/Button";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";

import { Typography } from "@mui/material";
import { ModalClose } from "@mui/joy";

interface AcceptOfferModalProps {
  listing: Listing;
  open: boolean;
  onClose: () => void;
  onAccept: (message?: string) => void;
}

export function AcceptOfferModal(props: AcceptOfferModalProps) {
  const { listing, open, onClose, onAccept } = props;

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        color="success"
        layout="center"
        size="lg"
        variant="solid"
        sx={{
          width: "20vw",
          height: "10vh",
        }}
      >
        <DialogTitle color="neutral">Do you want to confirm?</DialogTitle>
        <Button color="inherit" size="medium" onClick={() => handleAccept}>
          YES
        </Button>

        <ModalClose />
      </ModalDialog>
    </Modal>
  );
}
