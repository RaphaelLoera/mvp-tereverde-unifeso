import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Header from "./components/Header.tsx";
import Admin from "./components/pages/Admin.tsx";
import Home from "./components/pages/Home.tsx";
import Login from "./components/pages/Login.tsx";
import ParkPage from "./components/pages/ParkPage.tsx";
import Register from "./components/pages/Register.tsx";
import { parkPages } from "./data/siteContent";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const ADMIN_EMAILS = new Set(["email@teste.com"]);

const getAuthUser = () => {
  const storedUser = localStorage.getItem("adminAccess");

  if (!storedUser) {
    return null;
  }

  try {
    const user = JSON.parse(storedUser) as AuthUser;
    return {
      ...user,
      isAdmin: Boolean(user.isAdmin) || ADMIN_EMAILS.has(user.email),
    };
  } catch {
    return null;
  }
};

const RequireAdmin = () => {
  const user = getAuthUser();

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const RedirectIfAuthenticated = () => {
  const user = getAuthUser();

  if (user) {
    return <Navigate to={user.isAdmin ? "/admin" : "/"} replace />;
  }

  return <Outlet />;
};

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_30%),linear-gradient(180deg,#07111d_0%,#04070d_55%,#02050a_100%)] text-slate-100">
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
      {
        path: "/parnaso",
        element: <ParkPage content={parkPages.parnaso} />,
      },
      {
        path: "/tres-picos",
        element: <ParkPage content={parkPages["tres-picos"]} />,
      },
      {
        path: "/parque-montanhas",
        element: <ParkPage content={parkPages["parque-montanhas"]} />,
      },
      {
        element: <RequireAdmin />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
