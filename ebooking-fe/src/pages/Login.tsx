import { Link } from "react-router-dom";
import "./Login.css";
import LoginForm from "../components/LoginForm/LoginForm";
import l from "../service/Localization.ts";
const Login = () => {
  return (
    <div className="login-page-container">
      <div>
        <LoginForm></LoginForm>
        <div className="loging-page-home-link">
          <Link to="/home">{l.home_link}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
