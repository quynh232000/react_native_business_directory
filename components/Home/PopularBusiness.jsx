import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfigs";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBusinessList();
  }, []);
  const getBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
    setLoading(false);
  };
  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>
      <FlatList
        // onRefresh={businessList}
        // refreshing={loading}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
        data={businessList}
        renderItem={({ item, index }) => (
          <PopularBusinessCard business={item} key={index} />
        )}
      />
    </View>
  );
}
