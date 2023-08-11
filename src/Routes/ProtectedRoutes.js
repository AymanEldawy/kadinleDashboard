import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { SUPERADMIN_PERMISSIONS } from "./permissions";
import { useGlobalOptions } from "../Context/GlobalOptions";
import { getAdmin } from "../Api/globalActions";


function ProtectedRoutes({ roles, path }) {
  const params = useParams();
  const { setRefresh } = useGlobalOptions()
  const { name } = params || { name: "" }

  const user = getAdmin();

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    if (!user?.id) setRefresh()
  }

  if (user && !roles?.includes(user?.role?.title) && !roles?.includes("*"))
    return <Navigate to="not-allowed" />

  if (user && user?.role?.title !== 'superadmin' && SUPERADMIN_PERMISSIONS?.includes(name))
    return <Navigate to="not-allowed" />

  return (
    <Outlet name={'nahmed'} />
  );
}

export default ProtectedRoutes;
