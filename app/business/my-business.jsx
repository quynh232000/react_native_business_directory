import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { query } from "firebase/database";
import { collection, getDocs, where } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfigs";
import BusinessListCard from "./../../components/Explore/BusinessListCard";
import { useNavigation } from "expo-router";
export default function MyBusiness() {
  const { user } = useUser();
  const [userBusinessList, setUserBusinessList] = useState([]);
const [loading,setLoading] = useState(false)
  const navigation = useNavigation()
  navigation.setOptions({
    headerShown: true,
    headerTitle: "My Business",
  })

  useEffect(() => {
    getUserBusiness();
  }, []);
  const getUserBusiness = async () => {
    setLoading(true);
    setUserBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setUserBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
    setLoading(false);
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          marginTop: 30,
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        My Business
      </Text>
      {userBusinessList && userBusinessList.length > 0 ? (
        <FlatList
        onRefresh={getUserBusiness}
        refreshing={loading}
          data={userBusinessList}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            color: "red",
            padding: 20,
          }}
        >
          No Business fund!
        </Text>
      )}
    </View>
  );
}
