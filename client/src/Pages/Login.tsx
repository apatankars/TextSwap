import { useUser } from "@clerk/clerk-react";
import { ProfileForm } from "../Components/HomePage/ProfileForm";
import { User } from "../Types/types";

interface LoginProps {
  user: User | null;
}

export function Login(props: LoginProps) {
  console.log("Login props", props.user);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ProfileForm user={props.user} />
    </div>
  );
}
