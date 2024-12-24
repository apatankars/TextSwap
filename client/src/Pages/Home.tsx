import { Landing } from "../Components/HomePage/Landing";
import { NavMenu } from "../Components/NavMenu/NavMenu";
import { StepProcess } from "../Components/HomePage/StepProcess";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { Footer } from "../Components/Footer/Footer";

export function Home() {
  return (
    <div className="home-container">
      <NavMenu />

      <Landing />
      <StepProcess />
      <Footer />
    </div>
  );
}
