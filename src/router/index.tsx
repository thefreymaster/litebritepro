import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Root from "../routes/Root/Root";

function Layout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/:sessionId",
        element: <Root />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
