import { FiSearch } from "react-icons/fi";
import { LiaBookMedicalSolid } from "react-icons/lia";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineQuestionMark } from "react-icons/md";
import "../../../Styles/NavigationCard.css";
import { Typography, Button, Box } from "@mui/material";
import { CardType } from "../ButtonMenu";

interface NavigationCardProps {
  cardType: CardType;
  onClick: () => void;
}

export function NavigationCard(props: NavigationCardProps) {
  function getIcon() {
    switch (props.cardType) {
      case CardType.Search:
        return <FiSearch color="#fff" size={44} style={{ margin: "10px" }} />;
      case CardType.List:
        return (
          <LiaBookMedicalSolid
            color="#fff"
            size={44}
            style={{ margin: "10px" }}
          />
        );
      case CardType.Courses:
        return (
          <FaPencilAlt color="#fff" size={44} style={{ margin: "10px" }} />
        );
      default:
        return (
          <MdOutlineQuestionMark
            color="#fff"
            size={44}
            style={{ margin: "10px" }}
          />
        );
    }
  }

  function getTitle() {
    switch (props.cardType) {
      case CardType.Search:
        return (
          <Typography
            sx={{
              fontSize: "26px",
              fontFamily: "DM Sans",
              color: "#FFF",
              fontWeight: "bold",
              maxWidth: "80%",
              textAlign: "left",
            }}
          >
            Search Books
          </Typography>
        );
      case CardType.List:
        return (
          <Typography
            sx={{
              fontSize: "26px",
              fontFamily: "DM Sans",
              color: "#FFF",
              fontWeight: "bold",
              maxWidth: "80%",
              textAlign: "left",
            }}
          >
            List a Book
          </Typography>
        );
      case CardType.Courses:
        return (
          <Typography
            sx={{
              fontSize: "26px",
              fontFamily: "DM Sans",
              color: "#FFF",
              fontWeight: "bold",
              maxWidth: "80%",
              textAlign: "left",
            }}
          >
            Manage Courses
          </Typography>
        );
      default:
        return "Loading...";
    }
  }

  function getText() {
    switch (props.cardType) {
      case CardType.Search:
        return "Find textbooks for your courses";
      case CardType.List:
        return "Sell your used textbooks";
      case CardType.Courses:
        return "Add or edit your courses";
      default:
        return "Loading...";
    }
  }

  function getColor() {
    switch (props.cardType) {
      case CardType.Search:
        return "linear-gradient(180deg, #6D65E8 0%, #362CB4 100%)";
      case CardType.List:
        return "linear-gradient(180deg, #00C487 0%, #024E38 100%)";
      case CardType.Courses:
        return "linear-gradient(180deg, #955CF6 0%, #5915C3 100%)";
      default:
        return "bg-gray-500";
    }
  }

  return (
    <Button
      onClick={props.onClick}
      sx={{
        background: getColor(),
        borderRadius: "16px",
        padding: 2,
        width: "100%",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: "100%",
        "&:hover": {
          background: getColor(),
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
      >
        {getTitle()}
        {getIcon()}
      </Box>
      <Typography
        sx={{
          fontSize: "16px",
          fontFamily: "DM Sans",
          color: "#E8DEDE",
          textAlign: "left",
        }}
      >
        {getText()}
      </Typography>
    </Button>
  );
}
