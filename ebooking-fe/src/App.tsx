//https://medium.com/@prabhashi.mm/create-a-simple-react-app-typescript-with-login-register-pages-using-create-react-app-e5c12dd6db53
import React from "react";
import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AppContext, AppContextType } from "./AppContext";

function App() {
  const [appContext, setAppContext] = useState<AppContextType>({ user: "a" });
  return (
    <>
      <div className="App">
        <AppContext.Provider value={appContext}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AppContext.Provider>
      </div>
    </>
  );
}
export default App;
