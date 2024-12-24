import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { postListing } from "../../utils/api";
import { User } from "../../Types/types";
import { Input } from "@mui/joy";

export enum CourseType {
  Math = "Math",
  CS = "Computer Science",
  Engineering = "Engineering",
}

export enum Condition {
  New = "New",
  LikeNew = "Like New",
  Good = "Good",
  Fair = "Fair",
  Poor = "Poor",
}

interface ListingModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

// Styled components for enhanced UI
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  padding: theme.spacing(7),
  width: "40vw",
  maxHeight: "70vh",
  overflowY: "auto",
}));

const FormGrid = styled(Box)({
  display: "grid",
  gap: "16px",
  marginTop: "16px",
});

export function ListingModal(props: ListingModalProps) {
  const { open, onClose } = props;

  const [formData, setFormData] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookEdition: "",
    bookISBN: "",
    bookCondition: "",
    price: 0,
    description: "",
    courseCode: "",
    originalPrice: 0,
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]:
        name === "price"
          ? parseFloat(value as string) || ""
          : (value as string),
    }));
  };

  const isFormValid = () => {
    return (
      formData.bookTitle &&
      formData.bookAuthor &&
      formData.bookEdition &&
      formData.bookISBN &&
      formData.bookCondition &&
      formData.price &&
      formData.description &&
      formData.courseCode &&
      formData.courseCode.length === 8 &&
      formData.courseCode &&
      formData.price > 0 &&
      formData.originalPrice &&
      formData.originalPrice > 0
    );
  };

  const handleSubmit = () => {
    if (isFormValid() && props.user) {
      alert(`Book listing created: ${formData.bookTitle}`);
      postListing(
        props.user,
        formData.bookTitle,
        formData.bookAuthor,
        formData.bookEdition,
        formData.bookISBN,
        formData.bookCondition,
        formData.price,
        formData.description,
        formData.courseCode,
        formData.originalPrice
      );
      setFormData({
        bookTitle: "",
        bookAuthor: "",
        bookEdition: "",
        bookISBN: "",
        bookCondition: "",
        price: 0,
        description: "",
        courseCode: "",
        originalPrice: 0,
      });
      onClose();
    } else {
      alert(
        "Please fill out all fields. Make sure your course code follows the form XXXX####."
      );
    }
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="book-listing-modal-title"
    >
      <ModalContent>
        <Typography
          id="book-listing-modal-title"
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            color: "#333",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: 3,
            fontFamily: "DM Sans",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "2rem",
          }}
        >
          Create Book Listing
        </Typography>

        <FormGrid>
          <Typography
            id="book-listing-modal-title"
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              color: "#333",
              fontWeight: 100,
              textAlign: "left",
              fontFamily: "DM Sans",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "1rem",
            }}
          >
            Book Information
          </Typography>
          <TextField
            fullWidth
            name="bookTitle"
            label="Title"
            variant="outlined"
            value={formData.bookTitle}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="bookAuthor"
            label="Author"
            variant="outlined"
            value={formData.bookAuthor}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="bookEdition"
            label="Edition"
            type="number"
            variant="outlined"
            value={formData.bookEdition}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="bookISBN"
            label="ISBN"
            type="number"
            variant="outlined"
            value={formData.bookISBN}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="originalPrice"
            label="Original Price"
            type="number"
            variant="outlined"
            value={formData.originalPrice}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: <span style={{ marginRight: "2px" }}>$</span>,
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Book Condition</InputLabel>
            <Select
              name="bookCondition"
              value={formData.bookCondition}
              label="Book Condition"
              onChange={handleChange as any}
              required
            >
              {Object.values(Condition).map((condition) => (
                <MenuItem key={condition} value={condition}>
                  {condition}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            id="book-listing-modal-title"
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              color: "#333",
              fontWeight: 100,
              textAlign: "left",
              fontFamily: "DM Sans",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: "1rem",
            }}
          >
            Listing Information
          </Typography>
          <TextField
            fullWidth
            name="price"
            label="Price"
            type="number"
            variant="outlined"
            value={formData.price}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: <span style={{ marginRight: "2px" }}>$</span>,
            }}
          />
          <TextField
            fullWidth
            name="description"
            label="Description of Book Condition"
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            {/* TODO: You can replace this with an autocomplete component */}

            <TextField
              fullWidth
              name="courseCode"
              label="Course Code"
              type="text"
              variant="outlined"
              value={formData.courseCode}
              onChange={handleChange}
              required
            />
          </FormControl>
        </FormGrid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            sx={{
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              background: isFormValid()
                ? "linear-gradient(90deg, #007BFF, #0056B3)"
                : "#e0e0e0",
              color: isFormValid() ? "#fff" : "#aaa",
              "&:hover": {
                background: isFormValid()
                  ? "linear-gradient(90deg, #0056B3, #003D99)"
                  : "#e0e0e0",
              },
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ marginRight: 8 }}>📘</span>
            Create Listing
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
}
