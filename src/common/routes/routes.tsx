import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "../../dashboard/pages/Dashboard";

import SignInPage from "../../auth/pages/SignIn";
import SignUpPage from "../../auth/pages/SignUp";
import CategoriesPage from "../../categories/pages/CategoriesPage";
import FixedTransactionsPage from "../../fixed-transactions/pages/FixedTransactionsPage";
import ConditionalRoute from "./ConditionalRoute";
import RootLayout from "../../welcome/layouts/RootLayout";
import DashboardLayout from "../../welcome/layouts/DashboardLayout";
import BanksAccountsPage from "../../manage-banks-accounts/pages/BanksAccountsPage";
import TransactionsPage from "../../transactions/components/page/TransactionsPage";

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
          { path: "/s/banks-accounts", element: <BanksAccountsPage /> },
          {
            path: "/s/fixed-transactions",
            element: <FixedTransactionsPage />,
          },
          {
            path: "/s/transactions",
            element: <TransactionsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
