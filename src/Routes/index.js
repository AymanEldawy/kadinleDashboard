import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "../Components/Auth/Login";
import { useGlobalOptions } from "../Context/GlobalOptions";
import Layout from "../Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import { authProtectedRoutes, publicRoutes } from "./routes";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useGlobalOptions();
  return (
    <Routes>
      <Route element={<ProtectedRoutes isAuthenticated={user} />}>
        {authProtectedRoutes.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
            exact={true}
          />
        ))}
      </Route>
      <Route path="/login" element={<Login user={user} />} />
    </Routes>
  );
};

export default Index;
