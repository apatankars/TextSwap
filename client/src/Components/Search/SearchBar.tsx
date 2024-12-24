import { FaSearch } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import "../../Styles/Shop.css";
import { SearchType } from "../../Pages/Shop";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
}: SearchBarProps) {
  const getButtonClass = (type: SearchType) =>
    `option-base ${searchType === type ? "selected" : "unselected"}`;

  return (
    <div className="search-container">
      <div className="search-box">
        <div className="search-container-flex">
          <input
            className="input-class"
            type="text"
            placeholder="Search for books, authors, course codes, ISBN"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button-container">
            <div
              className="search-button-text"
              style={{ display: "flex", alignItems: "center" }}
            >
              Search <FaSearch style={{ marginLeft: "15px" }} />
            </div>
          </button>
        </div>
        <div className="search-container-flex">
          <div className="options-container">
            <button
              className={getButtonClass(SearchType.Title)}
              onClick={() => setSearchType(SearchType.Title)}
            >
              <FaBookBookmark style={{ width: "33px", height: "31px" }} />
              <div className="option-text"> TITLE</div>
            </button>
            <button
              className={getButtonClass(SearchType.Author)}
              onClick={() => setSearchType(SearchType.Author)}
            >
              <IoPerson style={{ width: "33px", height: "31px" }} />
              <div className="option-text"> AUTHOR</div>
            </button>
            <button
              className={getButtonClass(SearchType.CourseCode)}
              onClick={() => setSearchType(SearchType.CourseCode)}
            >
              <FaGraduationCap style={{ width: "33px", height: "31px" }} />
              <div className="option-text" style={{ width: "fit-content" }}>
                COURSE CODE
              </div>
            </button>
            <button
              className={getButtonClass(SearchType.ISBN)}
              onClick={() => setSearchType(SearchType.ISBN)}
            >
              <MdNumbers style={{ width: "33px", height: "31px" }} />
              <div className="option-text"> ISBN</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
