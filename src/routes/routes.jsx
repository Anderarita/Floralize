import { lazy } from "react";
import PrivateRoute from "./PrivateRoute ";
import PublicRoute from "./PublicRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";
import { InventoryAdminPage } from "../pages/Admin/InventoryAdminPage";
import ProfilePage from "../pages/ProfilePage";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const UserManagement = lazy(() => import("../pages/Admin/UserManagement"));
const TermsAndPrivacy = lazy(() => import("../pages/TermsAndPrivacy"));

export const routes = [
  {
    path: "/terms",
    element: <TermsAndPrivacy />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <RoleBasedRoute roles={["Admin"]}>
        <UserManagement />
      </RoleBasedRoute>
    ),
  },
  {
    path: "/inventory",
    element: (
      <RoleBasedRoute roles={["Admin", "Inventario"]}>
        <InventoryAdminPage />
      </RoleBasedRoute>
    ),
  },
];
