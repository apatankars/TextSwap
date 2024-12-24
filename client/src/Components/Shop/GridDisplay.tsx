import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { BookCard } from "../Cards/BookCard";
import { getListings } from "../../utils/api";
import { useEffect, useState } from "react";
import { Listing, User } from "../../Types/types";
import { SearchType } from "../../Pages/Shop";
import { Box, Container } from "@mui/material";
import { Typography } from "@mui/joy";

interface GridDisplayProps {
  user: User | null;
  searchQuery: string;
  searchType: SearchType;
}

export function GridDisplay({
  user,
  searchQuery,
  searchType,
}: GridDisplayProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  async function getAPIListings() {
    return await getListings();
  }

  useEffect(() => {
    async function fetchListings() {
      setLoading(true); // Set loading to true before fetching data
      var textbooks = await getAPIListings();
      textbooks = textbooks.filter(
        (listing) => listing.seller.userID !== user?.userID
      );
      setListings(textbooks);
      setLoading(false); // Set loading to false after fetching data
    }
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    if (!searchQuery) {
      return true;
    }
    const query = searchQuery.toLowerCase();
    switch (searchType) {
      case SearchType.Title:
        return listing.book.title.toLowerCase().includes(query);
      case SearchType.Author:
        return listing.book.author.toLowerCase().includes(query);
      case SearchType.CourseCode:
        return listing.course.toLowerCase().includes(query);
      case SearchType.ISBN:
        return listing.book.isbn.toLowerCase().includes(query);
      default:
        return true;
    }
  });

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "20px",
          p: 2,
          width: "100%",
        }}
      >
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            <CircularProgress />
            <Box mt={2}>Loading...</Box>
          </Box>
        ) : filteredListings.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            <Typography color="primary">No results found.</Typography>
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {filteredListings.map((listing, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <BookCard
                  listing={listing}
                  listings={listings}
                  setListings={setListings}
                  user={user}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
