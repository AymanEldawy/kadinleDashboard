import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { SUPERADMIN_PERMISSIONS } from "./permissions";

const USER_STORAGE = localStorage.getItem("KADINLE_ADMIN_USER");
const user = USER_STORAGE !== 'undefined' || USER_STORAGE ? JSON.parse(USER_STORAGE) : {};

function ProtectedRoutes({ roles, path }) {
  const params = useParams();
  const { name } = params || { name: "" }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!roles?.includes(user?.role?.title) && !roles?.includes("*"))
    return <Navigate to="not-allowed" />

  if (user?.role?.title !== 'superadmin' && SUPERADMIN_PERMISSIONS?.includes(name))
    return <Navigate to="not-allowed" />

  return (
    <Outlet name={'nahmed'} />
  );
}

export default ProtectedRoutes;
