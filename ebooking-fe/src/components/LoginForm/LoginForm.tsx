import { useState } from "react";
import { useUserContext } from "../../UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import bookingService from "../../service/BookingService.ts";
import { BookingUser } from "../../types/bookingUser.ts";
import "./LoginForm.css";

type RedirectLocationState = {
  redirectTo: Location;
};

const Login = () => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const userContext = useUserContext();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const { state: locationState } = useLocation();

  /*
  const XhandleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.username !== "") {
      bookingService
        .bookingUserLogin(input.username, input.password)
        .then((bookingUser) => {
          console.log("bookingUser:" + bookingUser?.userName);
          if (
            bookingUser?.authtoken?.length &&
            bookingUser.authtoken.length > 0
          ) {
            userContext.userContextlogin(bookingUser);
          } else {
            userContext.userContextlogout();
          }
        });
      //&& input.password !== "") {
      navigate("/");
    }
  };
*/

  const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.username !== "") {
      bookingService
        .bookingUserLogin(input.username, input.password)
        .then((apiResponse) => {
          console.log("handleSubmitEvent:" + JSON.stringify(apiResponse));
          if (apiResponse.statusCode === "OK") {
            setError(false);
            setErrorMessage("");
            const bookingUser = apiResponse.response as BookingUser;
            console.log("bookingUser:" + bookingUser?.userName);
            userContext.userContextlogin(bookingUser);

            if (locationState) {
              const { redirectTo } = locationState as RedirectLocationState;
              console.log("redirectTo.pathname:" + redirectTo.pathname);
              navigate(`${redirectTo.pathname}${redirectTo.search}`);
            } else {
              navigate("/");
            }
          } else {
            setError(true);
            setErrorMessage(apiResponse.statusMessage);
            userContext.userContextlogout();
          }
        });
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
    <div className="container">
      <h1> Login</h1>
      <form onSubmit={handleSubmitEvent}>
        {error && <div>{errorMessage}</div>}
        <div className="txt_field">
          <label htmlFor="user-name">User:</label>
          <input
            type="text"
            id="user-name"
            name="username"
            placeholder=""
            onChange={handleInput}
          />
        </div>
        <div className="txt_field">
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
    </div>
  );
};

export default Login;
