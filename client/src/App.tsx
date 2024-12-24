import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Styles/App.css";
import { Home } from "./Pages/Home";
import { Shop } from "./Pages/Shop";
import { Offers } from "./Pages/Offers";
import { User } from "./Types/types";
import { Main } from "./Pages/Landing";
import { useUser } from "@clerk/clerk-react";
import { Login } from "./Pages/Login";
import { fetchUser } from "./utils/api";
import { MockedData } from "./data/mocked/mockedData";

function App() {
  const { user, isSignedIn } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);

        try {
          const firstName = user.firstName || "";
          const lastName = user.lastName || "";
          const email = user.emailAddresses?.[0]?.emailAddress || "";
          const userID = user.id;
          const userName = user.username || "";

          const fetchedUserData = await fetchUser(
            userID,
            userName,
            firstName,
            lastName,
            email
          );

          if (!isCancelled) {
            setUserData(fetchedUserData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          if (!isCancelled) {
            setLoading(false);
          }
        }
      }
    };

    loadUserData();

    return () => {
      isCancelled = true; // Cleanup function to prevent setting state on an unmounted component
    };
  }, [isSignedIn, user]); // Dependency array ensures the effect runs only when isSignedIn or user changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop user={userData} />} />
        <Route path="/home" element={<Main user={userData} />} />
        <Route path="/offer" element={<Offers user={userData} />} />
        <Route path="/login" element={<Login user={userData} />} />
      </Routes>
    </Router>
  );
}

export default App;
