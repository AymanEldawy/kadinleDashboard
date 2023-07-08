import React from "react";
import { Route, Routes } from "react-router-dom";

import { authProtectedRoutes, publicRoutes } from "./routes";
import Layout from "../Layout";

const Index = () => {
  return (
    <Layout>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
            exact={true}
          />
        ))}
        {authProtectedRoutes.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
            exact={true}
          />
        ))}
      </Routes>
    </Layout>
  );
};

export default Index;
