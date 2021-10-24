import React, { useState, useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Input, Icon, Stack, Center, Button, Heading, Text } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetHandler = () => {
    clearErrorMessage();
    setUsername("");
    setPassword("");
  };

  const handleClick = () => setShow(!show);

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        paddingBottom: 50,
      }}
    >
      <NavigationEvents onWillFocus={resetHandler} />
      <Heading style={styles.heading} textAlign='center'>
        Create Account
      </Heading>
      <Center>
        <Stack space={4} w='100%' alignItems='center'>
          <Text style={styles.text}>Sign up to get started!</Text>
          <Input
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize='none'
            autoCorrect={false}
            w={{
              base: "75%",
              md: "25%",
            }}
            h={10}
            placeholder='Username'
            size='lg'
            InputLeftElement={
              <Icon
                as={<MaterialIcons name='person' />}
                size={5}
                ml='2'
                color='muted.400'
              />
            }
          />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize='none'
            autoCorrect={false}
            type={show ? "text" : "password"}
            overflow='visible'
            w={{
              base: "75%",
              md: "25%",
            }}
            h={10}
            InputRightElement={
              <Icon
                as={<MaterialIcons name='visibility-off' />}
                size={5}
                mr='2'
                color={show ? "blue" : "muted.400"}
                onPress={handleClick}
              />
            }
            placeholder='Password'
            size='lg'
          />
          {state.errorMessage ? (
            <Text style={styles.error}>{state.errorMessage}</Text>
          ) : null}
          <Button
            onPress={() =>
              signup(username, password, () => navigation.navigate("Feed"))
            }
            variant='subtle'
            endIcon={<Icon as={Ionicons} name='caret-forward' size='sm' />}
            w={{
              base: "75%",
              md: "25%",
            }}
            size='lg'
          >
            GET STARTED
          </Button>
          <Center style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Already have an account?</Text>
            <Button
              size='md'
              variant='link'
              onPress={() => navigation.navigate("Signin")}
            >
              SIGN IN
            </Button>
          </Center>
        </Stack>
      </Center>
    </ImageBackground>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  heading: {
    fontSize: 28,
  },
  text: {
    fontSize: 17,
  },
});

export default SignupScreen;
