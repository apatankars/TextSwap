// src/Context/UserContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@clerk/clerk-react";
import { UniLevel, User } from "../Types/types";

// Define the context's value type
interface UserContextType {
  userData: User | null;
  loading: boolean;
}

// Initialize the context with default values
const UserContext = createContext<UserContextType>({
  userData: null,
  loading: true,
});

// Define the props for UserProvider
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeUserData = async () => {
      if (isLoaded && isSignedIn && user) {
        // Extract fields from Clerk user object
        const firstName = user.firstName || "";
        const lastName = user.lastName || "";
        const email = user.emailAddresses?.[0]?.emailAddress || "";
        const userID = user.id;
        const userName = user.username || "";

        // Extract public metadata, ensuring it's an object
        const publicMetadata = user.unsafeMetadata as
          | Record<string, any>
          | undefined;

        // Initialize default values
        let rating: number = 0;
        let uniLevel: UniLevel = UniLevel.Freshman; // Default to Freshman
        let courses: string[] = [];

        if (publicMetadata) {
          // Safely extract rating
          if (typeof publicMetadata.rating === "number") {
            rating = publicMetadata.rating;
          }

          // Safely extract uniLevel and ensure it matches the UniLevel enum
          if (typeof publicMetadata.universityLevel === "string") {
            const level = publicMetadata.universityLevel as UniLevel;
            if (Object.values(UniLevel).includes(level)) {
              uniLevel = level;
            }
          }

          // Extract courses if available
          if (Array.isArray(publicMetadata.courses)) {
            courses = publicMetadata.courses;
          }
        }

        // Check if metadata needs to be initialized
        const needsUpdate =
          publicMetadata === undefined ||
          publicMetadata.rating === undefined ||
          publicMetadata.universityLevel === undefined;

        if (needsUpdate) {
          // Prepare updated metadata with default values
          const updatedMetadata = {
            ...(publicMetadata || {}),
            rating: rating,
            universityLevel: uniLevel,
            courses: courses, // Initialize as empty array if not present
          };
        }

        // Set the user data state
        setUserData({
          userName,
          name: `${firstName} ${lastName}`.trim(),
          email,
          userID,
          uniLevel,
          rating,
          courses,
        });
      } else if (!isSignedIn) {
        // If not signed in, clear user data
        setUserData(null);
      }

      // Update loading state
      setLoading(false);
    };

    initializeUserData();
  }, [isLoaded, isSignedIn, user]);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the UserContext
export const useUserData = (): UserContextType => useContext(UserContext);
