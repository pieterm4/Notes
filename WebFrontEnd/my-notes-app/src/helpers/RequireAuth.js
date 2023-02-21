import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {Buffer} from 'buffer';

const parseJwt = (token) => {
  try {
   /*  const decodedToken = Buffer.from(token.split(".")[2], 'base64');
    return JSON.parse(decodedToken.toString('base64')); */

    let base64Url = token.split('.')[1]; // token you get
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));

    return decodedData;
  } catch (e) {
    return null;
  }
};

export default function RequireAuth(props) {
    let token = localStorage.getItem('token');
    let location = useLocation();
  
    if (token) {

      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }

      return props.children;
    }
  
    return <Navigate to="/login" state={{ from: location }} />;
  }