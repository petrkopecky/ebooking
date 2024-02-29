import { useState } from "react";
import { useUserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import bookingService from "../../service/BookingService.ts";

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
      bookingService
        .bookingUserLogin(input.username, input.password)
        .then((bookinUser) => {
          console.log("login user then" + bookinUser.userName);
          if (
            bookinUser?.authtoken?.length &&
            bookinUser.authtoken.length > 0
          ) {
            //localStorage.setItem("authtoken", bookinUser.authtoken);
            /*userContext?.setBookingUser({
              userName: bookinUser.userName,
              userRole: bookinUser.userRole,
              pin: bookinUser.pin,
              authtoken: bookinUser.authtoken,
            });
            */
            userContext.userContextlogin(bookinUser);

            console.log(
              "login form auth token context:" +
                userContext.bookingUser?.authtoken
            );
          } else {
            //localStorage.removeItem("authtoken");
            userContext.userContextlogout();
          }
        });
      //&& input.password !== "") {

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
