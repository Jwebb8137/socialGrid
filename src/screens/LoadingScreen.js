import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const LoadingScreen = () => {
  const { trySignin } = useContext(AuthContext);

  useEffect(() => {
    trySignin();
  }, []);

  return null;
};

LoadingScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default LoadingScreen;
