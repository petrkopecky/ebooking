import React from "react";
import { Link } from "react-router-dom";
import { AppContext, AppContextType, useAppContext } from "../AppContext";

const Home = () => {
  const { user } = useAppContext();
  console.log(user);
  return (
    <div>
      {" "}
      Home
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};

export default Home;
