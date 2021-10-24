import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/PostContext";
import PostForm from "../components/PostForm";

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, editPost } = useContext(Context);

  const post = state.find((post) => post._id === id);

  return (
    <PostForm
      initialValues={{
        content: post?.content ? post.content : "",
        media: post?.media ? post.media : "",
      }}
      onSubmit={(content, photoUrl) => {
        editPost(id, content, photoUrl);
      }}
    />
  );
};

EditScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Edit Post",
    headerTintColor: "#00B0FF",
  };
};

const styles = StyleSheet.create({});

export default EditScreen;
