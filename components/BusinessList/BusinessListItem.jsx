import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListItem({ business }) {
  const router = useRouter()
  return (
    <TouchableOpacity
    onPress={()=> router.push('/businessdetail/'+business.id)}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 16,
      }}
    >
      <Image
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
        source={{ uri: business.imageUrl }}
      />
      <View
        style={{
          marginTop: 8,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            marginBottom:5
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: "gray",
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
            gap: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 15,
                height: 15,
                marginTop: 5,
              }}
              source={require("./../../assets/images/star.png")}
            />
            <Text
              style={{ fontFamily: "outfit-bold", marginTop: 5, color: "gray" }}
            >
              4.5
            </Text>
          </View>
          
        </View>
      </View>
    </TouchableOpacity>
  );
}
