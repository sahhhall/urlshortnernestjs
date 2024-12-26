import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../../redux/store";

interface RedirectLoggedInProps {
  children?: React.ReactNode;
}

const RedirectLoggedIn: React.FC<RedirectLoggedInProps> = ({ children }) => {
  const user = useSelector((state: RootState)=> state.auth.userInfo);

  if (user) {
    return <Navigate to="/" />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default RedirectLoggedIn;
