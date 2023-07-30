import { useEffect } from "react";
import { useState } from "react";
import {
  Navigate,
  Outlet,
  Redirect,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { getUser } from "../Api/auth";
import { useGlobalOptions } from "../Context/GlobalOptions";
import Layout from "../Layout";

function ProtectedRoutes() {
  const location = useLocation();

  const user = localStorage.getItem("KADINLE_ADMIN_USER");
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if(PERMISSIONS_ROUTE?.include())

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default ProtectedRoutes;
