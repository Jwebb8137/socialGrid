import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Input, Button } from "native-base";
import ImageUpload from "./ImageUpload";

const PostForm = ({ onSubmit, initialValues }) => {
  const [content, setContent] = useState(initialValues.content);
  const [photoUrl, setPhotoUrl] = useState(initialValues.media);

  const removeMedia = () => {
    console.log("removing media");
    setPhotoUrl("");
  };

  return (
    <View style={styles.container}>
      <ImageUpload
        setPhoto={(photoUrl) => setPhotoUrl(photoUrl)}
        initialValues={{
          media: photoUrl,
        }}
        removeMedia={removeMedia}
      />
      <Input
        variant='outline'
        placeholder='Type post here...'
        value={content}
        onChangeText={(text) => setContent(text)}
        size='lg'
        style={styles.input}
        multiline
        placeholderTextColor={"#545454"}
        textAlignVertical='top'
      />
      <Button
        variant='subtle'
        onPress={() => onSubmit(content, photoUrl)}
        w={{
          base: "100%",
          md: "25%",
        }}
        size='lg'
        p={3}
      >
        Save Post
      </Button>
    </View>
  );
};

PostForm.defaultProps = {
  initialValues: {
    content: "",
    media: "",
  },
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "transparent",
  },
  input: {
    height: 120,
    marginVertical: 15,
    borderColor: "gray",
    color: "gray",
  },
});

export default PostForm;
