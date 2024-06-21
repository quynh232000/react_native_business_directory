import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "./../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          color: "white",
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <View>
          <Text style={{ color: "white" }}>Welcome,</Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: "white",
            }}
          >
            {user?.fullName.toUpperCase()}
          </Text>
        </View>
      </View>
      {/* search bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 8,
        }}
      >
        <FontAwesome name="search" size={20} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Tìm kiếm.."
          style={{ color: Colors.PRIMARY, fontFamily: "outfit" }}
          placeholderTextColor={Colors.PRIMARY}
          color={Colors.PRIMARY}
        />
      </View>
    </View>
  );
}
