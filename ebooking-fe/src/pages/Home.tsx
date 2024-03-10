import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserContextType, useUserContext } from "../UserContext";
import Booking from "../components/Booking/Booking";
import authenticationService from "../service/AuthorizationService.ts";
import "./Home.css";

const Home = () => {
  const userContext = useUserContext();
  console.log("Home:" + userContext.bookingUser);
  return (
    <div>
      <div className="home-nav-bar">
        <ul>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {userContext?.bookingUser && (
            <li>
              <Link to="/my-bookings">My bookings</Link>
            </li>
          )}
          <li>
            {!userContext?.bookingUser && <Link to="/login">Login</Link>}
            {userContext?.bookingUser && (
              <a
                onClick={() => {
                  userContext.userContextlogout();
                  authenticationService.removeAuthorizationToken();
                }}
              >
                Logout-{userContext?.bookingUser?.userName}
              </a>
            )}
          </li>
        </ul>
      </div>

      <Booking></Booking>
    </div>
  );
};

export default Home;
