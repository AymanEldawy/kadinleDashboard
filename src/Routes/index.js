import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "../Components/Auth/Login";
import { useGlobalOptions } from "../Context/GlobalOptions";
import Layout from "../Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import { authProtectedRoutes, publicRoutes } from "./routes";

const Index = () => {
  return (
    <>
      <Layout>
        <Routes>
          {Object.values(authProtectedRoutes).map((route, index) => (
            <Route element={<ProtectedRoutes path={route?.path} roles={route?.allowedRoles} key={route?.path} />}>
              <Route
                path={route.path}
                element={route.component}
                key={index}
                exact={true}

              />
            </Route>
          ))}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
};

export default Index;
