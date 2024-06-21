import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfigs";
import Toast from "react-native-toast-message";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const { user } = useUser();
  const router = useRouter();

  const onDelete = () => {
    Alert.alert(
      "Do you wnat to delete?",
      "Do you relly wnat to delete this business?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };
  const deleteBusiness = async () => {
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    Toast.show({
      type: "success", // other options: 'error', 'info'
      text1: "Success!",
      text2: "Delete Business Successfully.",
    });
  };
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
          paddingTop: 40,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons size={40} name="arrow-back-circle-sharp" color="white" />
        </TouchableOpacity>
        {/* <AntDesign name="heart" size={24} color="white" /> */}
        <AntDesign name="hearto" size={32} color="white" />
      </View>
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: "100%",
          height: 240,
          objectFit: "cover",
        }}
      />

      <View
        style={{
          padding: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontFamily: "outfit-bold",
            }}
          >
            {business.name}
          </Text>
          {user.primaryEmailAddress.emailAddress == business?.userEmail && (
            <TouchableOpacity onPress={() => onDelete()}>
              <FontAwesome
                name="trash"
                size={24}
                color="red"
                style={{
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "outfit",
          }}
        >
          {business.address}
        </Text>
      </View>
    </View>
  );
}
