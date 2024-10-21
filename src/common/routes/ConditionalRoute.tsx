import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import HeroPage from "../../hero/pages/Hero";

const ConditionalRoute = () => {
  const { isSignedIn } = useAuth();
  return (
    <Routes>
      <Route
        path=""
        element={
          isSignedIn ? <Navigate replace to={"/s/dashboard"} /> : <HeroPage />
        }
      />
    </Routes>
  );
};

export default ConditionalRoute;
