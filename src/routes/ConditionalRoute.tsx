import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/Welcome";

const ConditionalRoute = () => {
  const { isSignedIn } = useAuth();
  return (
    <Routes>
      <Route
        path=""
        element={
          isSignedIn ? (
            <Navigate replace to={"/s/dashboard"} />
          ) : (
            <WelcomePage />
          )
        }
      />
    </Routes>
  );
};

export default ConditionalRoute;
