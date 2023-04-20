import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./Hooks/useUserContext";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";
import Account from "./Pages/Account/Account";
import React from "react";

function App() {
  const { user, ready } = useUserContext();

  let t = user ? "hi" : "bye";
  console.log("user ", t);
  console.log("ready ", ready);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {ready ? (
          <React.Fragment>
            <Route index element={user ? <Home /> : <Navigate to="/login" />} />

            <Route
              path="login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />

            <Route
              path="/account/:subpage?"
              element={user ? <Account /> : <Navigate to="/login" />}
            />

            <Route
              path="/account/:subpage/:action"
              element={user ? <Account /> : <Navigate to="/login" />}
            />

            <Route path="*" element={<NotFound />} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route path="*" element={<NotFound />} />
          </React.Fragment>
        )}
      </Route>
    </Routes>
  );
}

export default App;
