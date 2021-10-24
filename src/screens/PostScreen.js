import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { Context } from "../context/PostContext";
import { Feather } from "@expo/vector-icons";

const PostScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const [fullscreen, setFullscreen] = useState(false);

  const post = state.find((post) => post._id === navigation.getParam("id"));

  const renderEditButton = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <View style={styles.row}>
          <Text style={styles.editText}>Edit</Text>
          <Feather name='edit' size={18} color='#00B0FF' />
        </View>
      </TouchableOpacity>
    );
  };

  if (fullscreen) {
    return (
      <TouchableOpacity onPress={() => setFullscreen(!fullscreen)}>
        <View style={[styles.full, { backgroundColor: "#202020" }]}>
          <Card.Image
            style={styles.imageFull}
            source={{ uri: post.media }}
          ></Card.Image>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={{ borderRadius: 10 }}>
        <View style={styles.row}>
          <Card.Title style={styles.username}>
            {post?.username ? post.username : "User"}
          </Card.Title>
          {navigation.getParam("username") === post?.username
            ? renderEditButton()
            : null}
        </View>
        <Card.Divider />
        {post?.media ? (
          <TouchableOpacity onPress={() => setFullscreen(!fullscreen)}>
            <View style={{ backgroundColor: "#202020" }}>
              <Card.Image
                style={styles.image}
                source={{ uri: post.media }}
              ></Card.Image>
            </View>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.text}>
          {post?.content ? post.content : "content"}
        </Text>
        {/* </Card.Image> */}
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#E1F5FE",
    height: Dimensions.get("window").height,
  },
  username: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    resizeMode: "contain",
  },
  full: {
    height: Dimensions.get("window").height * 0.9,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    paddingBottom: 50,
  },
  imageFull: {
    resizeMode: "contain",
    height: Dimensions.get("window").height * 0.5,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editText: {
    color: "#00B0FF",
    alignSelf: "center",
    marginRight: 5,
    fontSize: 16,
  },
});

PostScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Post",
    headerTintColor: "#00B0FF",
  };
};

export default PostScreen;
