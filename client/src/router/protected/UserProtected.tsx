import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../../redux/store";

interface UserProtectedProps {
  children?: React.ReactNode;
}

const UserProtected: React.FC<UserProtectedProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.userInfo);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default UserProtected;
