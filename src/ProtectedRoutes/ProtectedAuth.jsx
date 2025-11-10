import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { authContext } from "../context/AuthContext";

export default function ProtectedAuth({ children }) {
  const { token } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return <>{children}</>;
}
