import React from "react";
import { Routes, Route } from "react-router-dom";
import { authProtectedRoutes } from "./routes";
const Index = () => {
  return (
    <Routes>
      {authProtectedRoutes.map((item) => (
        <Route path={item.path} Component={item.component} />
      ))}
      {/* <Route /> */}
      {/* <Route /> */}
      {/* <Route /> */}
      {/* <Route /> */}
      {/* <Route /> */}
    </Routes>
  );
};

export default Index;
