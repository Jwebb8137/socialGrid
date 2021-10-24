import React, { useState, useContext } from "react";
import { Image } from "react-native";
import { Button, View, Spinner } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const UploadImage = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [photo, setPhoto] = useState(props.initialValues.media);
  const [loading, setLoading] = useState(false);
  let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvkqz0fed/upload";

  let openImagePickerAsync = async () => {
    setLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      setLoading(false);
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    let data = {
      file: base64Img,
      upload_preset: "inspired-uploads",
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();
        setPhoto(data.url);
        setLoading(false);
        props.setPhoto(data.url);
      })
      .catch((err) => console.log(err));
  };

  const removeMedia = () => {
    setPhoto("");
    props.removeMedia();
  };

  const renderUploadButton = () => {
    return (
      <Button
        variant='subtle'
        onPress={openImagePickerAsync}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
        }}
        size='lg'
      >
        {loading ? (
          <Spinner color='cyan.500' size='lg' />
        ) : (
          <Ionicons name='add' size={44} color='#545454' />
        )}
      </Button>
    );
  };

  const renderImage = () => {
    return (
      <>
        <Image
          alt='Uploaded Image'
          source={{ uri: `${props.media && !photo ? props.media : photo}` }}
          style={{ width: 100, height: 100, borderRadius: 10, marginRight: 5 }}
        />
        <TouchableOpacity onPress={removeMedia}>
          <Ionicons name='close-circle-outline' size={28} color='black' />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {!photo ? renderUploadButton() : renderImage()}
    </View>
  );
};

UploadImage.defaultProps = {
  initialValues: {
    media: "",
  },
};

export default UploadImage;
