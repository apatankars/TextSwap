import book1 from "../../Icons/HomePage/book1.svg";
import book2 from "../../Icons/HomePage/book2.svg";
import book3 from "../../Icons/HomePage/book3.svg";
import book4 from "../../Icons/HomePage/book4.svg";
import book5 from "../../Icons/HomePage/book5.svg";
import book6 from "../../Icons/HomePage/book6.svg";

import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { FaArrowRight } from "react-icons/fa";

export function Landing() {
  const { isSignedIn } = useUser();

  return (
    <div className="landing-container">
      <img
        src={book4}
        // className="landing-book-icon"
        alt="Book icon"
        style={{
          width: "15vw" /* 20% of the viewport width */,
          position: "absolute",
          left: "-60px",
          top: "300px",
          transform: "rotate(-10deg)",
        }}
      />
      <img
        src={book2}
        // className="landing-book-icon"
        alt="Book icon"
        style={{
          width: "18vw" /* 20% of the viewport width */,
          position: "absolute",
          left: "-90px",
          top: "440px",
          transform: "rotate(0deg)",
        }}
      />
      <img
        src={book3}
        // className="landing-book-icon"
        alt="Book icon"
        style={{
          width: "16vw" /* 20% of the viewport width */,
          position: "absolute",
          left: "-90px",
          top: "640px",
          transform: "rotate(0deg)",
        }}
      />
      <img
        src={book6}
        alt="Book icon"
        style={{
          width: "12vw",
          position: "absolute",
          right: "0", // Align to the right edge
          top: "450px",
          transform: "translateX(50px) rotate(10deg)", // Offset to the left
        }}
      />
      <img
        src={book5}
        alt="Book icon"
        style={{
          width: "17vw",
          position: "absolute",
          right: "0", // Align to the right edge
          top: "300px",
          transform: "translateX(100px) rotate(0deg)", // Offset to the left
        }}
      />
      <img
        src={book1}
        alt="Book icon"
        style={{
          width: "14vw",
          position: "absolute",
          right: "0", // Align to the right edge
          bottom: "170px",
          transform: "translateX(50px) rotate(10deg)", // Offset to the left
        }}
      />

      <div className="landing-text-container">
        <div className="landing-text">TextSwap</div>
        <div className="landing-blurb">
          Your campus community marketplace for affordable textbooks
        </div>
      </div>

      {/* Conditional Rendering Based on Authentication State */}
      {!isSignedIn && (
        <SignInButton forceRedirectUrl={"/login"}>
          <button className="get-started-button" onClick={() => {}}>
            <div className="get-started-text">
              Get Started <FaArrowRight style={{ marginLeft: "8px" }} />
            </div>
          </button>
        </SignInButton>
      )}
      {isSignedIn && (
        <div>
          <SignOutButton>
            <button className="get-started-button" onClick={() => {}}>
              <div className="get-started-text">Sign Out</div>
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}

export default Landing;
