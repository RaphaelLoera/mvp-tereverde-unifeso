import { createBrowserRouter, Outlet } from "react-router";
import Login from "./components/pages/Login.tsx";
import Register from "./components/pages/Register.tsx";
import Home from "./components/pages/Home.tsx";
import Header from "./components/Header.tsx";

const Layout = () => {
  return (
    <div className = "flex min-h-screen flex-col bg-black">
      <Header />
      <Outlet />
    </div>
  );
};
export const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
