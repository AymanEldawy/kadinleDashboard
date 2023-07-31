import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import Layout from "../Layout";
import { SUPERADMIN_PERMISSIONS } from "./permissions";

const USER_STORAGE = localStorage.getItem("KADINLE_ADMIN_USER");
const user = JSON.parse(USER_STORAGE);

function ProtectedRoutes({ roles, path }) {
  const params = useParams();
  console.log("🚀 ~ file: ProtectedRoutes.js:11 ~ ProtectedRoutes ~ params:", params)
  // const 
  const { id, name } = params || { id: "", name: "" }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!roles?.includes(user?.role?.title) && !roles?.includes("*"))
    return <Navigate to="not-allowed" />

  if (user?.role?.title !== 'superadmin' && SUPERADMIN_PERMISSIONS?.includes(name))
    return <Navigate to="not-allowed" />

  return (
    // <Layout>
    <Outlet name={'nahmed'} />
    // </Layout>
  );
}

export default ProtectedRoutes;
