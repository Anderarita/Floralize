import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRouter = ({ children }) => {
    const { logged } = useContext(AuthContext);
    return logged ? children : <Navigate to="/" />;
    };