import { Listing, User } from "../../../Types/types";
import "../../../Styles/Landing/SmallBookCard.css";
import {
  Button,
  Chip,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { BookModal } from "../../Cards/BookModal";

interface SmallBookCardProps {
  user: User | null;
  listing: Listing;
  listings: Listing[];
  setListings: Dispatch<SetStateAction<Listing[]>>;
}

export function SmallBookCard(props: SmallBookCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 2,
          border: "1px solid rgba(235, 234, 237, 1)",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 1)",
          width: "100%",
          height: "300px",
          fontFamily: "DM Sans",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Typography
            sx={{
              color: "rgba(21, 20, 57, 0.4)",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "DM Sans",
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            {props.listing.course}
          </Typography>
          <Typography
            sx={{
              color: "#1e0e62",
              fontSize: props.listing.book.title.length > 30 ? "20px" : "26px",
              fontWeight: 700,
              fontFamily: "DM Sans",
              mb: 1,
            }}
          >
            {props.listing.book.title}
          </Typography>
          <Typography
            sx={{
              color: "rgba(21, 20, 57, 0.6)",
              fontSize: 14,
              mb: 1,
            }}
          >
            {props.listing.book.author}
          </Typography>
          <Typography
            sx={{
              color: "#4f378a",
              fontSize: 14,
              fontWeight: 600,
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            Condition: {props.listing.condition}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "rgba(21, 20, 57, 0.3)",
                  textDecoration: "line-through",
                }}
              >
                ${props.listing.book.price}
              </Typography>
              <Typography
                sx={{
                  fontSize: "40px",
                  color: "#350f9d",
                  fontWeight: "bold",
                  fontFamily: "DM Sans",
                }}
              >
                ${props.listing.price}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Chip
                label="FOR YOU"
                sx={{
                  backgroundColor: "#1E0E62",
                  color: "#FFFFFF",
                  fontFamily: "DM Sans",
                  width: "100%",
                  mb: 1,
                }}
              />
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "16px",
                  borderColor: "#1E0E62",
                  color: "#1E0E62",
                  fontSize: 11,
                  fontFamily: "DM Sans",
                  width: "100%",
                }}
                onClick={openModal}
              >
                More Details
              </Button>
            </Box>
          </Box>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: "40%", objectFit: "contain" }}
          image={props.listing.book.image}
          alt="Book cover"
        />
      </Card>
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
