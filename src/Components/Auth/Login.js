import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getUser, login } from "../../Api/auth";
import { getAdmin } from "../../Api/globalActions";
import logoIcon from "../../Assets/Images/logo-icon.png";
import { Button } from "../../Components/Global/Button";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import InputField from "../CustomForm/InputField";

// import logo from "../../Assets/Images/logo.svg";
const ADMIN = getAdmin();

const Login = () => {
  const { serRefresh } = useGlobalOptions();
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // const user = JSON.parse(localStorage.getItem("KADINLE_ADMIN_USER"));

  useEffect(() => {
    if (ADMIN) navigate(-1);
    console.log("🚀 ~ file: Login.js:26 ~ useEffect ~ ADMIN:", ADMIN)
  }, [ADMIN]);

  const insertIntoErrors = (name, value) => {
    if (value === "") {
      setErrors((prev) => {
        return {
          ...prev,
          [name]: "Field is required",
        };
      });
    } else {
      let newErrors = errors;
      delete newErrors[name];
      setErrors(newErrors);
    }
  };
  const onTouched = (name) => {
    if (touched[name]) return;
    setTouched((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });
  };
  const handelChangeField = (name, value) => {
    insertIntoErrors(name, value);
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handelSubmit = async () => {
    if (!Object.keys(errors)?.length) {
      const response = await login(values?.email, values?.password);
      if (response?.error) {
        toast.error(response?.error?.message);
      } else {
        toast.success(`Login Successfully`);
        serRefresh((p) => !p);
      }
    }
  };
  return (
    <div
      className="h-screen flex items-center backdrop-blur-sm bg-pink-50 bg-gradient-to-tr from-pink-300 to-pink-400"
    // style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="w-full h-full flex items-center relative z-20">
        <div className="container">
          <div className="max-w-md mx-auto shadow bg-white p-8 rounded-md ">
            <img
              src={logoIcon}
              alt="kadinle logo"
              className="mx-auto w-14 h-14 block"
            />
            <h1 className="text-2xl text-center font-medium text-pink-600 mb-4">
              Login
            </h1>
            <InputField
              label="email"
              name="email"
              type="email"
              value={values?.email}
              onChange={(e) => handelChangeField("email", e.target.value)}
              onFocus={() => onTouched("email")}
              error={
                touched["email"] && errors["email"] ? errors["email"] : null
              }
            />
            <div className="mt-4" />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={values?.password}
              onChange={(e) => handelChangeField("password", e.target.value)}
              onFocus={() => onTouched("password")}
              error={
                touched["password"] && errors["password"]
                  ? errors["password"]
                  : null
              }
            />
            <Button
              classes="mt-8 block w-full text-green-500"
              onClick={handelSubmit}
              title="Login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
