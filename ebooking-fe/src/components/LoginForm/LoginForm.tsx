//https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
import { useState } from "react";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      //dispatch action from hooks
    }
    alert("please provide a valid input");
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
