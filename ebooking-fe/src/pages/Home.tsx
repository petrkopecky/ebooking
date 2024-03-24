import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserContextType, useUserContext } from "../UserContext";
import Booking from "../components/Booking/Booking";
import authenticationService from "../service/AuthorizationService.ts";
import "./Home.css";

const Home = () => {
  const userContext = useUserContext();
  const [refreshState, setRefreshState] = useState<number>(1);

  const [, updateState] = useState<number>();
  const forceUpdate = useCallback(() => updateState(1), []);

  function doRefresh() {
    setRefreshState(refreshState + 1);
    //forceUpdate();
  }
  useEffect(() => {
    console.log("home use ef refr state" + refreshState);
  }, [refreshState]);

  console.log("Home:" + userContext.bookingUser);
  return (
    <>
      {refreshState && (
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
                      doRefresh();
                    }}
                  >
                    Logout-{userContext?.bookingUser?.userName}
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
