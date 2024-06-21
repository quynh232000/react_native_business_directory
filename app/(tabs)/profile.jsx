import { View, Text } from "react-native";
import React from "react";
import UserIntro from "../../components/Profile/UserIntro";
import { useUser } from "@clerk/clerk-expo";
import MenuList from "../../components/Profile/MenuList";

export default function profile() {
  
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 30,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
        }}
      >
        Profile
      </Text>
      {/* user info */}
      <UserIntro />
      {/* menu list */}
      <MenuList/>
    </View>
  );
}
