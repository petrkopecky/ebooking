import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../UserContext";

const PrivateRoute = () => {
  const userContext = useUserContext();
  console.log("private route:" + userContext.bookingUser?.authtoken);
  if (!userContext.bookingUser?.authtoken) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
