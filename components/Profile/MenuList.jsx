import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("./../../assets/images/box.png"),
      path: "/business/my-business",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ];
  const router = useRouter();
  const onMenuClick = (item) => {
    if (item.path == "logout") {
      console.log(123);
      signOut();
      return;
    }
    if (item.path == "share") {
      Share.share({
        message: "Download the business app by Mr.Quynh, download url",
      });
      return;
    }
    router.push(item.path);
  };
  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              borderColor: "rgba(22,22,24,.3)",
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 36,
                height: 36,
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: "outfit",
                fontSize: 20,
                flex: 1,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "outfit",
          textAlign: "center",
          marginTop: 100,
          color: "gray",
        }}
      >
        Developed by Mr.Quynh @ 2024
      </Text>
    </View>
  );
}
