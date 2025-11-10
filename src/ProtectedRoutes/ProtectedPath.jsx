import React, { Children, useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { authContext } from "../context/AuthContext";

export default function ProtectedPath({ children }) {
  const { token } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return <>{children}</>;
}

//https://documenter.getpostman.com/view/5709532/2sA3JT4Jzs#087f61c6-a7a6-421a-b400-e021375ac71b
