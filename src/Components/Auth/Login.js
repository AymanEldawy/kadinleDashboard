import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getUser, login } from "../../Api/auth";
import { getAdmin } from "../../Api/globalActions";
import logoIcon from "../../Assets/Images/logo-icon.png";
import { Button } from "../../Components/Global/Button";
import { useGlobalOptions } from "../../Context/GlobalOptions";
import InputField from "../CustomForm/InputField";

// import logo from "../../Assets/Images/logo.svg";
import Cookies from "js-cookie";

const Login = () => {
  const { setRefresh, setUser } = useGlobalOptions();
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const ADMIN = getAdmin();
  useEffect(() => {
    // if (ADMIN) navigate(-1);
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

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!Object.keys(errors)?.length) {
      const response = await login(values?.email, values?.password);
      if (response?.error) {
        toast.error(response?.error?.message);
      } else {
        const user = await getUser();
        const hour = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set("KADINLE_ADMIN", JSON.stringify(user || ""), {
          expires: hour,
        });
        setUser(user);
        toast.success(`Login Successfully`);
        setTimeout(() => {
          window.location.pathname = "/";
        }, 3000);
      }
    }
  };
  return (
    <div
      className="h-screen flex items-center backdrop-blur-sm bg-pink-50 bg-gradient-to-tr from-pink-300 to-pink-400"
      // style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <form
        onSubmit={handelSubmit}
        className="flex items-center relative z-20 max-w-md w-full mx-auto bg-white dark:bg-bgmaindark shadow  p-8 rounded-md "
      >
          <div className="w-full">
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
            <Button classes="mt-8 block w-full text-green-500" title="Login" />
          </div>
      </form>
    </div>
  );
};

export default Login;
