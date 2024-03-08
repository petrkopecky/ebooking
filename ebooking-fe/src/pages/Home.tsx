import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserContextType, useUserContext } from "../UserContext";
import Booking from "../components/Booking/Booking";
import "./Home.css";

const Home = () => {
  const userContext = useUserContext();
  const [render, setRender] = useState<Boolean>(true);
  return (
    <div>
      <div className="home-nav-bar">
        <p>Here is another paragraph.</p>
        <div>
          <p>another p</p>
        </div>
        <ul>
          <li>
            <a href="default.asp">Home</a>
          </li>
          <li>
            <a href="news.asp">News</a>
          </li>
          <li>
            <a href="contact.asp">Contact</a>
          </li>
          <li>
            <a href="about.asp">About</a>
          </li>
        </ul>
      </div>
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
      <Booking></Booking>
    </div>
  );
};

export default Home;
