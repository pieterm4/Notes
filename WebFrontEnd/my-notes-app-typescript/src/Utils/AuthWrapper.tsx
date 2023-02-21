import { Navigate, Outlet } from "react-router-dom";
import { Buffer } from "buffer";
import React from "react";

const parseJwt = (token: string): any => {
  try {
    const base64Url = token.split(".")[1]; // token you get
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const decodedData = JSON.parse(
      Buffer.from(base64, "base64").toString("binary")
    );

    return decodedData;
  } catch (e) {
    return null;
  }
};

const isExpired = (token: string | null): boolean => {
  if (token === null) {
    return true;
  }
  const { exp } = parseJwt(token) as { exp: number };
  return exp * 1000 < Date.now();
};

export function AuthWrapper(): JSX.Element {
  if (isExpired(localStorage.getItem("token"))) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
