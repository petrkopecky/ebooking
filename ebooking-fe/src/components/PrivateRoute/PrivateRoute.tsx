import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../UserContext";

const PrivateRoute = () => {
  const userContext = useUserContext();
  const location = useLocation();
  console.log("location:" + location.pathname);
  console.log("private route:" + userContext.bookingUser?.authtoken);
  if (!userContext.bookingUser?.authtoken) {
    return <Navigate to="/login" replace state={{ redirectTo: location }} />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
