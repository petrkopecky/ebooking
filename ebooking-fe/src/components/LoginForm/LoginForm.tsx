import { useState } from "react";
import {
  UserContext,
  UserContextType,
  useUserContext,
} from "../../UserContext";

const Login = () => {
  const userContext = useUserContext();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  console.log("login-user:" + userContext.userName);

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      userContext.setUserName("aaaa");
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
        <div id="user-name" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;
