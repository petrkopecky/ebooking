import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { useUserContext } from "../../UserContext";

const PrivateRoute = () => {
  function login() {
    navigate({
      pathname: "/login",
      search: createSearchParams({
        foo: "bar",
      }).toString(),
    });
  }

  const userContext = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location:" + location.pathname);
  console.log("private route:" + userContext.bookingUser?.authtoken);
  if (!userContext.bookingUser?.authtoken) {
    return <Navigate to="/login" replace state={{ redirectTo: location }} />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
