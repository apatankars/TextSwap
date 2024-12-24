import { Stack } from "@mui/material";
import { NavigationCard } from "./Cards/NavigationCard";
import { useState } from "react";
import { AddCourseModal } from "./AddCourseModal";
import { ListingModal } from "./AddListingModal";
import { User } from "../../Types/types";

export enum CardType {
  Search = "search",
  List = "list",
  Courses = "courses",
}

interface ButtonMenuProps {
  user: User | null;
}

export function ButtonMenu(props: ButtonMenuProps) {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isListingModalOpen, setListingModalOpen] = useState(false);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 6, sm: 12, md: 18, lg: 20 }}
      sx={{
        paddingLeft: { xs: 5, sm: 10 },
        height: "40vh",
        paddingRight: { xs: 5, sm: 10 },
        paddingTop: 5,
      }}
    >
      <NavigationCard
        cardType={CardType.Search}
        onClick={() => (window.location.href = "/shop")}
      />
      <NavigationCard
        cardType={CardType.List}
        onClick={() => setListingModalOpen(true)}
      />
      <ListingModal
        open={isListingModalOpen}
        onClose={() => setListingModalOpen(false)}
        user={props.user}
      />
      <NavigationCard
        cardType={CardType.Courses}
        onClick={() => setIsCourseModalOpen(true)}
      />
      <AddCourseModal
        open={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
      />
    </Stack>
  );
}
