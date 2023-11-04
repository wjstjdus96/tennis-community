import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkIsLogin } from "../utils/checkIsLogin";

interface IPrivateRouter {
  children?: ReactElement;
  authentication: boolean;
}

export default function PrivateRoute({ authentication }: IPrivateRouter) {
  const isAuthenticated = checkIsLogin();

  if (authentication) {
    return isAuthenticated == false ? <Navigate to="/login" /> : <Outlet />;
  } else {
    return isAuthenticated == false ? <Outlet /> : <Navigate to="/" />;
  }
}
