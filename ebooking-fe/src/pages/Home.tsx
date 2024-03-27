import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../UserContext";
import Booking from "../components/Booking/Booking";
import authenticationService from "../service/AuthorizationService.ts";
import "./Home.css";
import l from "../service/Localization.ts";
const Home = () => {
  const userContext = useUserContext();
  const [refreshState, setRefreshState] = useState<number>(1);

  function doRefresh() {
    setRefreshState(refreshState + 1);
  }

  return (
    <>
      {refreshState && (
        <div>
          <div className="home-nav-bar">
            <ul>
              <li>
                <Link to="/news">{l.news}</Link>
              </li>
              <li>
                <Link to="/contact">{l.contact}</Link>
              </li>
              {userContext?.bookingUser && (
                <li>
                  <Link to="/my-bookings">{l.my_bookings}</Link>
                </li>
              )}
              <li>
                {!userContext?.bookingUser && (
                  <Link to="/login">{l.Login}</Link>
                )}
                {userContext?.bookingUser && (
                  <a
                    onClick={() => {
                      userContext.userContextlogout();
                      authenticationService.removeAuthorizationToken();
                      doRefresh();
                    }}
                  >
                    {l.logout}-{userContext?.bookingUser?.userName}
                  </a>
                )}
              </li>
            </ul>
          </div>

          <Booking refresh={refreshState}></Booking>
        </div>
      )}
    </>
  );
};

export default Home;
