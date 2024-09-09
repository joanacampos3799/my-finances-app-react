import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "../../dashboard/pages/Dashboard";

import SignInPage from "../../auth/pages/SignIn";
import SignUpPage from "../../auth/pages/SignUp";
import CategoriesPage from "../../categories/pages/CategoriesPage";
import FixedTransactionsPage from "../../fixed-transactions/pages/FixedTransactionsPage";
import ConditionalRoute from "./ConditionalRoute";
import RootLayout from "../../welcome/layouts/RootLayout";
import DashboardLayout from "../../welcome/layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <ConditionalRoute /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: "s",
        children: [
          { path: "/s/dashboard", element: <DashboardPage /> },
          { path: "/s/categories", element: <CategoriesPage /> },
          {
            path: "/s/fixed-transactions",
            element: <FixedTransactionsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;