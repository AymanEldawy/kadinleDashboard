import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import wallpaper from "../../Assets/Images/wallpaper.jpg";
import InputField from "../../Components/CustomForm/InputField";
import { Button } from "../../Components/Global/Button";
import Layout from "../../Layout";

const Login = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
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
      console.log(errors?.length);
      let body = {
        LoginName: values?.email,
        Password: values?.password,
      };
      await axios
        .post(`/login`, {
          ...body,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };
  return (
    <div
      className=" h-screen w-screen bg-cover bg-no-repeat "
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="h-full w-full backdrop-blur-sm absolute bg-[#00000099]"></div>
      <div className="h-[60%] w-[50%] bg-blue-600 opacity-70 rounded-b-3xl absolute z-20 top-0 left-1/2 -translate-x-1/2"></div>
      <div className="w-full h-full  flex items-center relative z-20">
        <div className="container">
          <div className="max-w-md mx-auto shadow bg-white p-8 rounded-md">
            <h1 className="text-2xl text-center font-medium mb-4">Login</h1>
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
