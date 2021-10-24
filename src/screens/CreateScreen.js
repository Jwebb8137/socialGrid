import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/PostContext";
import PostForm from "../components/PostForm";

const CreateScreen = ({ navigation }) => {
  const { addPost } = useContext(Context);

  return (
    <PostForm
      onSubmit={(content, photoUrl) => {
        console.log(content, photoUrl);
        addPost(content, photoUrl);
      }}
    />
  );
};

CreateScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Create Post",
    headerTintColor: "#00B0FF",
  };
};

const styles = StyleSheet.create({});

export default CreateScreen;
