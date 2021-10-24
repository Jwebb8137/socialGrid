import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Input, Icon, Stack, Center, Button, Heading, Text } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Context } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Heading style={styles.heading} textAlign='center'>
        Welcome to SocialGrid!
      </Heading>
      <Center>
        <Stack space={4} w='100%' alignItems='center'>
          <Text style={styles.text}>Get started by logging in below!</Text>
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
            InputLeftElement={
              <Icon
                as={<MaterialIcons name='person' />}
                size={5}
                ml='2'
                color='muted.400'
              />
            }
            placeholder='Username'
            size='lg'
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
              signin(username, password, () => navigation.navigate("Index"))
            }
            variant='subtle'
            endIcon={<Icon as={Ionicons} name='caret-forward' size='sm' />}
            w={{
              base: "75%",
              md: "25%",
            }}
            size='lg'
          >
            LOGIN
          </Button>
          <Center style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Don't have an account?</Text>
            <Button
              size='md'
              variant='link'
              onPress={() => navigation.navigate("Signup")}
            >
              SIGN UP
            </Button>
          </Center>
        </Stack>
      </Center>
    </ImageBackground>
  );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;
