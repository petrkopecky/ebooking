import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserContextType, useUserContext } from "../UserContext";

const Home = () => {
  const userContext = useUserContext();
  const [render, setRender] = useState<Boolean>(true);
  return (
    <div>
      <p>Home</p>
      <p>{userContext?.bookingUser?.userName}</p>
      <p>{userContext?.bookingUser?.userRole}</p>
      <p>{userContext?.bookingUser?.authtoken}</p>
      {!userContext?.bookingUser && (
        <p>
          <Link to="/login">Login</Link>
        </p>
      )}
      {userContext?.bookingUser && (
        <button
          className="link"
          onClick={() => {
            userContext.userContextlogout();
          }}
        >
          Logout
        </button>
      )}

      <button
        className="link"
        onClick={() => {
          setRender(!render);
          console.log("Refresh:" + JSON.stringify(userContext?.bookingUser));
        }}
      >
        refresh
      </button>
      <p>
        <Link to="/my-bookings">My bookings</Link>
      </p>
    </div>
  );
};

export default Home;
