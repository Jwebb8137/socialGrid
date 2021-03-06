import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import socialGridApi from "../api/socialGrid";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const trySignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const username = await AsyncStorage.getItem("username");
  if (token) {
    dispatch({ type: "signin", payload: { token, username } });
    navigate("Feed");
  } else {
    navigate("Signin");
  }
};

const signup = (dispatch) => async (username, password, callback) => {
  try {
    const response = await socialGridApi.post("/signup", {
      username,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("username", username);
    dispatch({
      type: "signin",
      payload: { token: response.data.token, username },
    });
    navigate("Feed");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signing up...",
    });
  }
};

const signin = (dispatch) => async (username, password, callback) => {
  try {
    const response = await socialGridApi.post("/signin", {
      username,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("username", username);
    dispatch({
      type: "signin",
      payload: { token: response.data.token },
    });
    navigate("Feed");
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
  }
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("Signin");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, trySignin },
  { token: null, errorMessage: "" }
);
