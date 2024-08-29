import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/Dashboard";
import RootLayout from "./layouts/RootLayout";
import WelcomePage from "./pages/Welcome";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import CategoriesPage from "./pages/CategoriesPage";
import FixedTransactionsPage from "./pages/FixedTransactionsPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: "s",
        children: [
          { path: "/s/dashboard", element: <DashboardPage /> },
          { path: "/s/categories", element: <CategoriesPage /> },
          { path: "/s/fixed-transactions", element: <FixedTransactionsPage /> },
        ],
      },
    ],
  },
]);

export default router;
