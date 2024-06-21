import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "./../../constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { query } from "firebase/database";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../configs/FirebaseConfigs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
export default function AddBusiness() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [image, setImage] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Business",
      headerShown: true,
    });
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0]?.uri);
  };
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        { label: doc.data().name, value: doc.data().name },
      ]);
    });
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    try {
      const fileName = Date.now().toString() + ".jpg";
      const resp = await fetch(image);
      const blob = await resp.blob();
      const imageRef = ref(storage, "business-app/" + fileName);
      const snapshot = await uploadBytes(imageRef, blob);
      // console.log("File uploaded successfully:", snapshot.metadata.fullPath);
      getDownloadURL(imageRef).then(async (downloadUrl) => {
        saveBusinessDetail(downloadUrl);
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  const saveBusinessDetail = async (imageUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      website: website,
      about: about,
      category: category,
      imageUrl: imageUrl,
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userImage: user?.imageUrl,
    });

    Toast.show({
      type: "success",
      text1: "Success!",
      text2: "New Business Added...",
    });
    setLoading(false);
  };
  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          color: "gray",
        }}
      >
        Fill all details to add new business
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 20,
          }}
          onPress={onImagePick}
        >
          {!image ? (
            <Image
              source={require("./../../assets/images/picture.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          onChangeText={(v) => setName(v)}
          placeholder="Name"
          placeholderTextColor={"gray"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            color: "red",
            fontFamily: "outfit",
          }}
        />
        <TextInput
          onChangeText={(v) => setAddress(v)}
          placeholder="Address"
          placeholderTextColor={"gray"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            color: "red",
            fontFamily: "outfit",
          }}
        />
        <TextInput
          onChangeText={(v) => setContact(v)}
          placeholder="Contact"
          placeholderTextColor={"gray"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            color: "red",
            fontFamily: "outfit",
          }}
        />
        <TextInput
          onChangeText={(v) => setWebsite(v)}
          placeholder="Website"
          placeholderTextColor={"gray"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            color: "red",
            fontFamily: "outfit",
          }}
        />
        <TextInput
          onChangeText={(v) => setAbout(v)}
          multiline
          numberOfLines={5}
          placeholder="About"
          placeholderTextColor={"gray"}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            color: "red",
            fontFamily: "outfit",
            height: 100,
            textAlign: "top",
          }}
        />
        <View
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        >
          <Text style={{ fontFamily: "outfit-medium" }}>Category:</Text>
          <RNPickerSelect
            style={{
              backgroundColor: "red",
              color: "red",
            }}
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={() => onAddNewBusiness()}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          color: "white",
          borderRadius: 5,
          marginTop: 30,
          alignContent: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size={"medium"} color={"white"} />
        ) : (
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "outfit-bold",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
      <View style={{ height: 300 ,paddingBottom:600}}>
        <Text
          style={{
            height: 500,
          }}
        ></Text>
      </View>
    </ScrollView>
  );
}
