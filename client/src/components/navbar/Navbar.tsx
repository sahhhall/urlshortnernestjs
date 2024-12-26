import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { useToast } from "../../hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const navigate = useNavigate();
  const { toast } = useToast();
  const handleLogout = () => {
    dispatch(logoutAuth());
    console.log("User logged out");
    navigate("/login");
    toast({
      description: "successfully logut",
    });
  };

  return (
    <div className="fixed top-0 w-full left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center px-4 sm:px-8 h-16">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-extrabold text-xl">
            RoadmapPro
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Avatar>
                <AvatarImage
                  src={"https://github.com/shadcn.png"}
                  className="rounded-full w-full h-full"
                />
                <AvatarFallback>hihii</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <Button
                variant="signin"
                size="sm"
                className="text-sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="customHover" size="sm" className="text-sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="signin" className="text-sm">
                  Get started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
