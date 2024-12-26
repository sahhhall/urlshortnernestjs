import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import UserLayout from "../layout/UserLayout";
import SignupPage from "../pages/SignupPage";
import Home from "../pages/Home";
import RedirectLoggedIn from "./protected/RedirectLogin";
import UserProtected from "./protected/UserProtected";

const LoginPage = lazy(() => import("../pages/LoginPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: (
          <UserProtected>
            <Suspense fallback={<div>loading...</div>}>
              <Home />
            </Suspense>
          </UserProtected>
        ),
      },
      {
        path: "/login",
        element: (
          <RedirectLoggedIn>
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
          </RedirectLoggedIn>
        ),
      },
      {
        path: "/signup",
        element: (
          <RedirectLoggedIn>
            <Suspense fallback={<div>Loading...</div>}>
              <SignupPage />
            </Suspense>
          </RedirectLoggedIn>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <p>not found</p>
      </>
    ),
  },
]);

export default routes;
