import React from "react";
import { Box, Typography, List, ListItem, Link, Divider } from "@mui/joy";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "var(--Colors-White, #fff)", // White background
        color: "var(--Colors-Heading, #1e0e62)", // Default purple for headings
        padding: "40px 20px",
        width: "100vw",
        mt: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "1200px",
          marginBottom: "20px",
        }}
      >
        {/* About Section */}
        <Box sx={{ margin: "20px", maxWidth: "300px" }}>
          <Typography
            level="h4"
            sx={{
              color: "var(--Colors-Heading, #1e0e62)", // Purple for headings
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "10px",
            }}
          >
            About Us
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              fontSize: "14px",
              color: "var(--colors-text, rgba(21, 20, 57, 0.4))", // Light black for text
              marginBottom: "10px",
            }}
          >
            Your one-stop platform for all your textbook needs. Find your next
            book here!
          </Typography>
        </Box>

        {/* Quick Links Section */}
        <Box sx={{ margin: "20px", maxWidth: "300px" }}>
          <Typography
            level="h4"
            sx={{
              color: "var(--Colors-Heading, #1e0e62)", // Purple for headings
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "10px",
            }}
          >
            Quick Links
          </Typography>
          <List
            sx={{
              padding: 0,
              listStyle: "none",
              margin: 0,
            }}
          >
            <ListItem>
              <Link
                href="/home"
                sx={{
                  color: "var(--Colors-Heading, #1e0e62)", // Purple for links
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "var(--Action-Secondary, #482be7)", // Darker purple on hover
                    textDecoration: "underline",
                  },
                }}
              >
                Home
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="/shop"
                sx={{
                  color: "var(--Colors-Heading, #1e0e62)",
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "var(--Action-Secondary, #482be7)",
                    textDecoration: "underline",
                  },
                }}
              >
                Shop
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="/offers"
                sx={{
                  color: "var(--Colors-Heading, #1e0e62)",
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "var(--Action-Secondary, #482be7)",
                    textDecoration: "underline",
                  },
                }}
              >
                Offers
              </Link>
            </ListItem>
          </List>
        </Box>

        {/* Contact Section */}
        <Box sx={{ margin: "20px", maxWidth: "300px" }}>
          <Typography
            level="h4"
            sx={{
              color: "var(--Colors-Heading, #1e0e62)", // Purple for headings
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "10px",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              fontSize: "14px",
              color: "var(--colors-text, rgba(21, 20, 57, 0.4))", // Light black for text
              marginBottom: "5px",
            }}
          >
            Email: textswap@example.com
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              fontSize: "14px",
              color: "var(--colors-text, rgba(21, 20, 57, 0.4))",
            }}
          >
            Phone: +1 (123) 456-7890
          </Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          width: "100%",
          backgroundColor: "var(--colors-text, rgba(21, 20, 57, 0.4))",
        }}
      />

      <Typography
        level="body-sm"
        sx={{
          fontSize: "14px",
          color: "var(--colors-text, rgba(21, 20, 57, 0.4))", // Light black for footer text
          paddingTop: "10px",
        }}
      >
        &copy; 2024 TextSwap. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
