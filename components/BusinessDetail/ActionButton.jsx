import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/phone-call.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("./../../assets/images/placeholder.png"),
      url: "https://www.google/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("./../../assets/images/internet.png"),
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("./../../assets/images/share.png"),
      url: "tel:" + business?.contact,
    },
  ];
  const onPressHandle = (item) => {
    if (item.name == "Share") {
      Share.share({
        message:
          business?.name +
          "\n Address:" +
          business?.address +
          "\n Find more details on Business Directory App by Mr Quynh!",
      });
    } else {
      Linking.openURL(item?.url);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onPressHandle(item)} key={index}>
            <Image
              source={item?.icon}
              style={{
                width: 38,
                height: 38,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
