import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  RefreshControl,
} from "react-native";
import { Icon, Stack, Button, Heading, Text } from "native-base";
import { Card, ListItem } from "react-native-elements";
import { Context } from "../context/PostContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const IndexScreen = ({ navigation }) => {
  const { state, addPost, deletePost, fetchPosts } = useContext(Context);
  const { signout } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const flatListRef = useRef();

  useEffect(() => {
    getUser();
    flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      fetchPosts();
    });
  }, []);

  const getUser = async () => {
    const username = await AsyncStorage.getItem("username");
    setUser(username);
  };

  const renderDeleteButton = (item) => {
    return (
      <TouchableOpacity onPress={() => deletePost(item._id)}>
        <Ionicons name='trash-outline' size={22} color='#00B0FF' />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={fetchPosts} />
      <Stack>
        <View style={styles.section}>
          <Heading
            alignSelf={"center"}
          >{`⭐️🤩  Social Grid Feed  🥳⭐️`}</Heading>
          <TouchableOpacity onPress={signout} style={styles.logoutBtn}>
            <MaterialIcons name='logout' size={28} color='#00B0FF' />
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => navigation.navigate("Create")}
          variant='ghost'
          borderWidth={1}
          borderColor='#40C4FF'
          w={{
            base: "90%",
            md: "25%",
          }}
          mb={3}
          backgroundColor={"#FFF"}
          alignSelf={"center"}
          size='lg'
          endIcon={<Icon as={Ionicons} name='add' size='sm' />}
        >
          Add New Post
        </Button>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ref={flatListRef}
          data={state}
          keyExtractor={() => Math.floor(Math.random() * 99999)}
          style={styles.list}
          renderItem={({ item }) => {
            console.log(item.username, user);
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Post", {
                    id: item._id,
                    username: user,
                  })
                }
              >
                <Card containerStyle={{ borderRadius: 10 }}>
                  <View style={styles.row}>
                    <Text style={styles.username}>{item.username}</Text>
                    {item.username === user ? renderDeleteButton(item) : null}
                  </View>
                  <Card.Divider />
                  {item.media ? (
                    <View style={{ backgroundColor: "#202020" }}>
                      <Card.Image
                        style={styles.image}
                        source={{ uri: item.media }}
                      ></Card.Image>
                    </View>
                  ) : null}
                  <Text
                    style={[
                      styles.text,
                      {
                        marginTop: item.media ? 10 : 0,
                        marginBottom: item.media ? 10 : 15,
                      },
                    ]}
                  >
                    {item.content}
                  </Text>
                  <Button
                    onPress={() =>
                      navigation.navigate("Post", {
                        id: item._id,
                        username: user,
                      })
                    }
                    variant='subtle'
                    w={{
                      base: "100%",
                      md: "25%",
                    }}
                    size='lg'
                  >
                    View Post
                  </Button>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

IndexScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1F5FE",
    height:
      Platform.OS === "ios"
        ? Dimensions.get("window").height
        : Dimensions.get("window").height * 1.1,
  },
  message: {
    fontSize: 18,
  },
  button: {
    width: "90%",
    alignSelf: "center",
  },
  logoutBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 5 : 50,
    right: 12,
  },
  section: {
    paddingTop: Platform.OS === "ios" ? 60 : 100,
    marginBottom: 15,
    position: "relative",
  },
  list: {
    height: Dimensions.get("window").height * 0.725,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  image: {
    resizeMode: "contain",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
});

export default IndexScreen;
