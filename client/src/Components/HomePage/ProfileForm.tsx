import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Select,
  Option,
} from "@mui/joy";
import { UniLevel, User } from "../../Types/types";
import { updateUser } from "../../utils/api";
import { CgProfile } from "react-icons/cg";

const UNIVERSITY_LEVELS: UniLevel[] = [
  UniLevel.Freshman,
  UniLevel.Sophomore,
  UniLevel.Junior,
  UniLevel.Senior,
  UniLevel.Graduate,
];

interface ProfileFormProps {
  user: User | null;
}

export function ProfileForm(props: ProfileFormProps) {
  const { user } = useUser();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Use useEffect to update state when user data is available
  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setUsername(user?.username || "");
    setEmail(user?.primaryEmailAddress?.emailAddress || "");
  }, [user]);

  // Extract or set defaults for universityLevel and courses
  const initialUniversityLevel = (
    props.user?.uniLevel ? props.user?.uniLevel : "Undergraduate"
  ) as UniLevel;

  const maxCourses = 4;
  const userCourses = props.user?.courses ?? [];
  const initialCourses = userCourses.slice(0, maxCourses);
  // Pad the array with empty strings if less than 4 courses
  while (initialCourses.length < maxCourses) {
    initialCourses.push("");
  }

  const [universityLevel, setUniversityLevel] = useState<UniLevel>(
    initialUniversityLevel
  );
  const [courses, setCourses] = useState<string[]>(initialCourses);

  // console.log("Courses:", courses);

  const handleCourseChange = (index: number, value: string) => {
    if (value.match(/^[A-Z]{4}\d{4}$/)) {
      alert("Invalid course code format. Please enter a valid course code.");
      return;
    }
    const updatedCourses = [...courses];
    updatedCourses[index] = value;
    setCourses(updatedCourses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateUser(user.id, undefined, universityLevel, courses);
      alert("Profile updated successfully!");
      // Redirect back to the home page
      window.location.href = "/home";
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update profile.");
    }
  };

  // Wait until user is loaded
  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#4CABA6", // Surrounding background color
        minHeight: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        display: "flex",
        alignItems: "center", // Vertically center the content
        justifyContent: "center", // Horizontally center the content
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "40vw",
          backgroundColor: "white", // The form background
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Add elevation
          borderRadius: "8px", // Optional rounded corners
          padding: 4, // Padding inside the form
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <Typography
            level="h4"
            sx={{
              fontWeight: "700",
              color: "primary",
              textTransform: "uppercase",
              fontFamily: "DM Sans",
              letterSpacing: "0.1em",
              fontSize: "2.5rem",
              alignItems: "center",
              display: "flex",
              gap: 1,
            }}
          >
            <CgProfile /> Complete Your Profile
          </Typography>
        </div>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          {/* Email usually managed by Clerk, so displayed as read-only */}
          <Input value={email} disabled />
        </FormControl>
        <FormControl>
          <FormLabel>University Level</FormLabel>
          <Select
            value={universityLevel}
            onChange={(_, newValue) => {
              if (
                newValue &&
                UNIVERSITY_LEVELS.includes(newValue as UniLevel)
              ) {
                setUniversityLevel(newValue as UniLevel);
              }
            }}
          >
            {UNIVERSITY_LEVELS.map((level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </FormControl>
        <Typography level="body-md" sx={{ mt: 2 }}>
          Courses (up to 4):
        </Typography>
        {courses.map((course, index) => (
          <FormControl key={index}>
            <FormLabel>Course {index + 1}</FormLabel>
            <Input
              placeholder="Enter course code"
              value={course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
            />
          </FormControl>
        ))}

        <Button type="submit" variant="solid" color="primary">
          Update Profile
        </Button>
      </Box>
    </Box>
  );
}
