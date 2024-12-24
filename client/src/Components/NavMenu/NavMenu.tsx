import { UserButton, useUser } from "@clerk/clerk-react";
import book from "../../Icons/NavMenu/book.svg";
import "../../Styles/App.css";

/*TODO:  */

export function NavMenu() {
  const { isSignedIn } = useUser();

  return (
    <div className="nav-menu-container">
      <img src={book} className="nav-book-icon" alt="Book icon" />
      <a href="/">
        <button className="logo-button">
          <div className="logo-text">TextSwap</div>
        </button>
      </a>
      <div className="page-nav">
        <a href="/home" className="nav-link">
          Home
        </a>
        <a href="/shop" className="nav-link">
          Shop
        </a>
        <a href="/offer" className="nav-link">
          Offers
        </a>
        {isSignedIn && <UserButton />}
      </div>
    </div>
  );
}
