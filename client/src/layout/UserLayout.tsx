import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-12">
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
