import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfigs";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";
export default function explore() {
  const [businessList, setBusinessList] = useState([]);

  const getBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category?.name)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        Explore More
      </Text>
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
          marginBottom: 20,
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
      {/* category */}
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category)}
      />
      {/* business list */}
      {businessList && businessList.length > 0 && (
        <ExploreBusinessList businessList={businessList} />
      )}
    </View>
  );
}
