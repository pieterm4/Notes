import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Home } from "./components/home/Home";
import { LoginPage } from "./features/authentication/login/LoginPage";
import { RegistrationPage } from "./features/authentication/registration/RegistrationPage";
import { AuthWrapper } from "./Utils/AuthWrapper";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route element={<AuthWrapper />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
