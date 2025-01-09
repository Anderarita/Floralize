import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RecoverPassPage } from "../pages/RecoverPassPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ChangePassPage } from "../pages/ChangePassPage";
import { PublicRouter } from "./PublicRouters";
import { HomeAdminPage } from "../pages/HomeAdminPage";
import { InventoryAdminPage } from "../pages/InventoryAdminPage";
import { OrdersAdminPage } from "../pages/OrdersAdminPage";
import { UsersAdminPage } from "../pages/UsersAdminPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRouter>
              <LoginPage />
            </PublicRouter>
          }
        />

        <Route
          path="/Recover"
          element={
            <PublicRouter>
              <RecoverPassPage />
            </PublicRouter>
          }
        />

        <Route
          path="/Register"
          element={
            <PublicRouter>
              <RegisterPage />
            </PublicRouter>
          }
        />

        <Route
          path="/ChangePAss"
          element={
            <PublicRouter>
              <ChangePassPage />
            </PublicRouter>
          }
        />

        <Route
          path="/HomePage"
          element={
            <PublicRouter>
              <HomeAdminPage />
            </PublicRouter>
          }
        />

        <Route
          path="/Inventory"
          element={
            <PublicRouter>
              <InventoryAdminPage />
            </PublicRouter>
          }
        />

        <Route
          path="/Orders"
          element={
            <PublicRouter>
              <OrdersAdminPage />
            </PublicRouter>
          }
        />

        <Route
          path="/Users"
          element={
            <PublicRouter>
              <UsersAdminPage />
            </PublicRouter>
          }
        />
      </Routes>
    </>
  );
};
