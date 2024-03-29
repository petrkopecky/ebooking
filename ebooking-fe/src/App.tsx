//https://medium.com/@prabhashi.mm/create-a-simple-react-app-typescript-with-login-register-pages-using-create-react-app-e5c12dd6db53
import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserContext } from "./UserContext";
import { BookingUser } from "./types/bookingUser";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MyBookings from "./pages/MyBookings";

function App() {
  const [bookingUser, setBookingUser] = useState<BookingUser>({});
  return (
    <>
      <div className="App">
        <UserContext.Provider value={{ bookingUser, setBookingUser }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/my-bookings" element={<MyBookings />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
}
export default App;
