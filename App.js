import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndexScreen from "./src/screens/IndexScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";
import PostScreen from "./src/screens/PostScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import { Provider as PostProvider } from "./src/context/PostContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { NativeBaseProvider } from "native-base";
import { setNavigator } from "./src/navigationRef";
console.disableYellowBox = true;

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Post: PostScreen,
    Create: CreateScreen,
    Edit: EditScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: "Loading",
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "#FFF" },
    },
  }
);

const App = createAppContainer(navigator);
export default () => {
  return (
    <AuthProvider>
      <PostProvider>
        <NativeBaseProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </NativeBaseProvider>
      </PostProvider>
    </AuthProvider>
  );
};
