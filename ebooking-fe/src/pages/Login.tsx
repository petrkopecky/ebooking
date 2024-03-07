import React from "react";
import Home from "./Home";
import { Link } from "react-router-dom";
import "./Login.css";
import LoginForm from "../components/LoginForm/LoginForm";
const Login = () => {
  return (
    <div className="login-page-container">
      <div>
        <LoginForm></LoginForm>
        <div className="loging-page-home-link">
          <Link to="/home">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
