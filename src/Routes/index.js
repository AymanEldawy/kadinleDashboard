import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { authProtectedRoutes, publicRoutes } from "./routes";
import Layout from "../Layout";
import { useGlobalOptions } from "../Context/GlobalOptions";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useGlobalOptions();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {!user ? (
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              path={route.path}
              element={route.component}
              key={index}
              exact={true}
            />
          ))}
        </Routes>
      ) : (
        <Layout>
          <Routes>
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
      )}
    </>
  );
};

export default Index;
