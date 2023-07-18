import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useGlobalOptions } from "../Context/GlobalOptions";
import Layout from "../Layout";
import { authProtectedRoutes, publicRoutes } from "./routes";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useGlobalOptions();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   } else if (user?.role?.number < 2) {
  //     navigate("https://kadinle.com/");
  //   }
  // }, []);
  return (
    <>
      {user?.id ? (
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
