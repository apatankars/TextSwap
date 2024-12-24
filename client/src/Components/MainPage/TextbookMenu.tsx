import { Box, Button, Typography, CircularProgress, Grid } from "@mui/material";
import "../../Styles/Landing/TextbookMenu.css";
import { SmallBookCard } from "./Cards/SmallBookCard";
import { Listing, User } from "../../Types/types";
import { getListings } from "../../utils/api";
import { useEffect, useState } from "react";

interface TextbookMenuProps {
  user: User | null;
}

export function TextbookMenu(props: TextbookMenuProps) {
  async function getAPIListings() {
    const textbooks = getListings();
    return textbooks;
  }

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const textbooks = await getAPIListings();
      setListings(textbooks);
      setLoading(false);
    }
    fetchListings();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
          alignItems: { xs: "flex-start", sm: "flex-start" },
          justifyContent: "left",
          mb: 2,
        }}
      >
        <Typography
          sx={{
            color: "#482BE7",
            fontSize: { xs: "32px", sm: "45px" },
            fontWeight: "700",
            letterSpacing: "-1px",
            fontFamily: "DM Sans",
          }}
        >
          Textbooks for you
        </Typography>
        <Button
          sx={{
            background: "transparent",
            mt: { xs: 1, sm: 0 },
            "&:hover": { background: "transparent" },
          }}
          onClick={() => {
            window.location.href = "/shop";
          }}
        >
          <Typography
            sx={{
              color: "#2F1893",
              fontSize: "20px",
              fontWeight: "700",
              letterSpacing: "2px",
              fontFamily: "DM Sans",
              textTransform: "uppercase",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            View All
          </Typography>
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={6} sx={{ paddingLeft: 3 }}>
          {listings.slice(0, 4).map((listing) => (
            <Grid item xs={12} sm={6} md={5} key={listing.listingID}>
              <SmallBookCard
                listing={listing}
                listings={listings}
                setListings={setListings}
                user={props.user}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
