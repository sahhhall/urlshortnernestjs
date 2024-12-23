import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

const LoginPage = lazy(() => import("../pages/LoginPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <>
          <p>landing</p>
        </>
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
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
