import "../Styles/App.css";
import React, { useState } from "react";

import { NavMenu } from "../Components/NavMenu/NavMenu";
import { SearchBar } from "../Components/Search/SearchBar";
import { GridDisplay } from "../Components/Shop/GridDisplay";
import { User } from "../Types/types";
import Footer from "../Components/Footer/Footer";

export enum SearchType {
  Title = "title",
  Author = "author",
  CourseCode = "courseCode",
  ISBN = "isbn",
}

interface ShopProps {
  user: User | null;
}

export function Shop(props: ShopProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState(SearchType.Title);

  if (!props.user) {
    return (
      <div className="shop-container">
        <NavMenu />
        <p>Please sign in to access the shop.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="shop-container">
      <NavMenu />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <GridDisplay
        searchQuery={searchQuery}
        searchType={searchType}
        user={props.user}
      />
      <Footer />
    </div>
  );
}
