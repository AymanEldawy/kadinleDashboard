import { useEffect } from "react";
import { useState } from "react";
import {
  Navigate,
  Outlet,
  Redirect,
  Route,
  useNavigate,
} from "react-router-dom";

import { getUser } from "../Api/auth";
import { useGlobalOptions } from "../Context/GlobalOptions";
import Layout from "../Layout";

function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const { user } = useGlobalOptions();
  useEffect(() => {
    if (user) setIsAuth(true);
  }, [user]);
  // const { user } = useGlobalOptions;
  console.log(
    "🚀 ~ file: ProtectedRoutes.js:14 ~ ProtectedRoutes ~ user:",
    isAuth
  );
  // return (
  //   <Layout>
  //     <Outlet />
  //   </Layout>
  // );
  return <Layout>{isAuth ? <Outlet /> : <Navigate to="/login" />}</Layout>;
}

export default ProtectedRoutes;
