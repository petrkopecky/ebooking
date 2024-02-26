import { useState } from "react";
import {
  UserContext,
  UserContextType,
  useUserContext,
} from "../../UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  console.log("login-user:" + userContext?.bookingUser?.userName);

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.username !== "") {
      //&& input.password !== "") {
      userContext?.setBookingUser({
        userName: "aa",
        userRole: "rr",
        userPin: 0,
      });

      navigate("/");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-name">User:</label>
        <input
          type="text"
          id="user-name"
          name="username"
          placeholder=""
          onChange={handleInput}
        />
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInput}
        />
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;
