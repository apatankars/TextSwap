import Footer from "../Components/Footer/Footer";
import { ButtonMenu } from "../Components/MainPage/ButtonMenu";
import { TextbookMenu } from "../Components/MainPage/TextbookMenu";
import { NavMenu } from "../Components/NavMenu/NavMenu";
import "../Styles/Landing.css";
import { User } from "../Types/types";
import { Box } from "@mui/material";

interface LandingProps {
  user: User | null;
}

export function Main(props: LandingProps) {
  if (!props.user) {
    return (
      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <NavMenu />
        <p
          style={{
            textAlign: "center",
          }}
        >
          Please sign in to continue.
        </p>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <NavMenu />

      <ButtonMenu user={props.user} />
      <TextbookMenu user={props.user} />
      <Footer />
    </Box>
  );
}
