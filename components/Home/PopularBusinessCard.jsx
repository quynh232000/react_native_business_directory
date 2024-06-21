import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PopularBusinessCard({ business }) {
  const router = useRouter()
  return (
    <TouchableOpacity
      style={{
        marginRight: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
      }}
      onPress={()=>router.push("/businessdetail/"+business.id)}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 16,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 13,
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
          <View style={{
          backgroundColor: Colors.PRIMARY,
          borderRadius:5,
          paddingHorizontal:10,
          marginTop:10
          }}>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 13,
                color: "#fff",
                padding: 3,
              }}
            >
              {business.category ?? "--"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
