import React, { Dispatch, SetStateAction, useState } from "react";
import { Book, Listing, User } from "../../Types/types";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Sheet from "@mui/joy/Sheet";
import {
  RiGraduationCapLine,
  RiHashtag,
  RiBook3Line,
  RiStethoscopeLine,
  RiSendPlaneLine,
  RiShoppingCart2Line,
} from "@remixicon/react";
import { BuyNowModal } from "./BuyNowModal";
import OfferModal from "./OfferModal";

interface BookModalProps {
  user: User | null;
  listing: Listing;
  open: boolean;
  onClose: () => void;
  listings: Listing[];
  setListings: Dispatch<SetStateAction<Listing[]>>;
}

export function BookModal(props: BookModalProps) {
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const { listing, open, onClose } = props;

  function getAvatar() {
    return props.listing.seller.name.charAt(0).toUpperCase();
  }

  function closeBuyNowModal() {
    setIsBuyNowModalOpen(false);
    onClose();
  }

  function closeOfferModal() {
    setIsOfferModalOpen(false);
  }

  function bookRequired(book: Book) {
    // TODO: Insert logic here to check if the book is apart of the current user course list
    return true;
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          sx={{
            width: 800,
            maxWidth: "90%",
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
            className="title-and-author-container"
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "90%",
            }}
          >
            <Typography
              level="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "42px",
                color: "#4F378A",
                marginBottom: "8px",
                letterSpacing: "-0.4px",
                lineHeight: "48px",
                textTransform: "uppercase",
              }}
            >
              {props.listing.book.title}
            </Typography>
            <Typography
              level="body-sm"
              sx={{
                fontSize: "22px",
                color: "#955CF6",
                marginBottom: "16px",
                lineHeight: "32px",
              }}
            >
              by {props.listing.book.author}
            </Typography>
          </div>
          <div
            className="content-container"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <img
              src={props.listing.book.image}
              alt={props.listing.book.title}
              style={{
                width: "45%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "16px",
                marginRight: "16px",
              }}
            />
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
              {bookRequired(props.listing.book) && (
                <div
                  className="required-container"
                  style={{
                    backgroundColor: "#1E0E62",
                    width: "fit-content",
                    padding: "8px",
                    borderRadius: "10px",
                    marginBottom: "25px",
                  }}
                >
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: "15px",
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Required
                  </Typography>
                </div>
              )}
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
                <RiGraduationCapLine
                  size={24}
                  color="#000"
                  style={{ marginRight: "7px" }}
                />
                <Typography
                  level="body-sm"
                  sx={{
                    fontSize: "18px",
                    color: "#000",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  <strong>Course:</strong> {props.listing.course}
                </Typography>
              </div>
              <div
                className="isbn"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <RiHashtag
                  size={24}
                  color="#000"
                  style={{ marginRight: "7px" }}
                />
                <Typography
                  level="body-sm"
                  sx={{
                    fontSize: "18px",
                    color: "#000",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  <strong>ISBN:</strong> {props.listing.book.isbn}
                </Typography>
              </div>
              <div
                className="edition"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <RiBook3Line
                  size={24}
                  color="#000"
                  style={{ marginRight: "7px" }}
                />
                <Typography
                  level="body-sm"
                  sx={{
                    fontSize: "18px",
                    color: "#000",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  <strong>Edition:</strong> {props.listing.book.edition}
                </Typography>
              </div>

              <div
                className="condition"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <RiStethoscopeLine
                  size={24}
                  color="#000"
                  style={{ marginRight: "7px" }}
                />
                <Typography
                  level="body-sm"
                  sx={{
                    fontSize: "18px",
                    color: "#000",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    textWrap: "balance",
                  }}
                >
                  <strong>Condition:</strong> {props.listing.condition}
                </Typography>
              </div>

              <Typography
                level="body-sm"
                sx={{
                  fontSize: "18px",
                  color: "#000",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginLeft: "5px",
                }}
              >
                <strong>Description:</strong>
                <br />
                {props.listing.description}
              </Typography>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "black",
                  margin: "10px 0 10px 0",
                }}
              ></div>
              <div
                className="seller-info"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "10px" }}>
                  {getAvatar()}
                </Avatar>
                <div>
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: "18px",
                      color: "#000",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      textWrap: "balance",
                    }}
                  >
                    <strong>{props.listing.seller.name}</strong>
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: "10px",
                      color: "#000",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      textWrap: "balance",
                    }}
                  >
                    {props.listing.seller.uniLevel} at Brown University
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  top: "10%",
                  marginBottom: "15px",
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{
                    fontSize: "18px",
                    textDecoration: "line-through",
                    color: "rgba(0, 0, 0, 0.36)",
                    marginBottom: "-8px",
                  }}
                >
                  ${listing.book.price}
                </Typography>
                <Typography
                  level="h4"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "55px",
                    color: "#482BE7",
                    marginBottom: "24px",
                  }}
                >
                  ${listing.price}
                </Typography>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              variant="solid"
              color="primary"
              sx={{
                width: "50%",
                height: "100%",
                padding: "15px",
                fontSize: "16px",
                margin: "5px",
                marginBottom: "12px",
                background: "#4F378A",
                borderRadius: "16px",
              }}
              onClick={() => setIsBuyNowModalOpen(true)}
            >
              <RiShoppingCart2Line
                style={{ marginRight: "5px" }}
              ></RiShoppingCart2Line>
              <strong style={{ textTransform: "uppercase" }}>Buy Now</strong>
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              sx={{
                width: "50%",
                height: "100%",
                margin: "5px",
                padding: "15px",
                fontSize: "16px",
                borderRadius: "16px",
              }}
              onClick={() => setIsOfferModalOpen(true)}
            >
              <RiSendPlaneLine style={{ marginRight: "5px" }}></RiSendPlaneLine>
              <strong style={{ textTransform: "uppercase" }}>Make Offer</strong>
            </Button>
          </div>
        </Sheet>
      </Modal>
      {isBuyNowModalOpen && (
        <BuyNowModal
          listing={props.listing}
          closeModal={() => closeBuyNowModal()}
          listings={props.listings}
          setListings={props.setListings}
          user={props.user}
        />
      )}
      {isOfferModalOpen && (
        <OfferModal
          listing={props.listing}
          onClose={() => closeOfferModal()}
          open={true}
          user={props.user}
        />
      )}
    </>
  );
}
