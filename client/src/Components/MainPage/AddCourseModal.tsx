import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { ModalClose, Input } from "@mui/joy";
import { updateUser } from "../../utils/api";
import { useUser } from "@clerk/clerk-react";

interface CourseModalProps {
  open: boolean;
  onClose: () => void;
}

export enum CourseType {
  Math = "Math",
  CS = "CSCI",
  Engineering = "ENGN",
}

export function AddCourseModal(props: CourseModalProps) {
  const { open, onClose } = props;
  const { user } = useUser();

  const [courseInputs, setCourseInputs] = useState<string[]>(["", "", "", ""]);

  const handleCourseChange = (index: number, value: string) => {
    const updatedCourses = [...courseInputs];
    updatedCourses[index] = value;
    setCourseInputs(updatedCourses);
  };

  const handleSubmit = async () => {
    // Validate course codes (must be 8 characters long)
    const validCourses = courseInputs.filter((course) => course.length === 8);
    if (validCourses.length === 0) {
      alert("Please enter at least one valid course code (8 characters long).");
      return;
    }
    try {
      if (!user) {
        throw new Error("User not found");
      }
      await updateUser(user.id, undefined, undefined, validCourses);
      alert("Courses updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating courses:", error);
      alert("Failed to update courses.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        layout="center"
        size="lg"
        sx={{
          width: "50vw",
          height: "50vh",
          color: "#4f378a",
          position: "relative",
        }}
      >
        <DialogTitle>Add Courses</DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          {courseInputs.map((course, index) => (
            <Input
              key={index}
              value={course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
              placeholder="Course Code"
            />
          ))}
        </Box>
        <Button onClick={handleSubmit} variant="solid" sx={{ mt: 2 }}>
          Update Courses
        </Button>
        <ModalClose />
      </ModalDialog>
    </Modal>
  );
}
