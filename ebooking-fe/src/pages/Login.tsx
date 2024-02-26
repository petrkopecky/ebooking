import React from "react";
import Home from "./Home";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm/LoginForm";
const Login = () => {
  return (
    <div>
      <LoginForm></LoginForm>
      <p>
        <Link to="/home">Home</Link>
      </p>
    </div>
  );
};

export default Login;
