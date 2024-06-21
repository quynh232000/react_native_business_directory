import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfigs";
import BusinessListItem from "../../components/BusinessList/BusinessListItem";
import { Colors } from "../../constants/Colors";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
  }, []);

  useEffect(() => {
    getBusenissList();
  }, [category]);
  const getBusenissList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, {id:doc?.id,...doc.data()}]);
    });
    setLoading(false);
  };

  return (
    <View>
      {businessList.length > 0 && loading == false ? (
        <FlatList
          data={businessList}
          onRefresh={getBusenissList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListItem business={item} key={index} />
          )}
        />
      ) : loading == true ? (
        <ActivityIndicator
          style={{
            marginTop: "60%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View
          style={{
            paddingTop: 60,
            paddingBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            gap: 10,
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require("./../../assets/images/search.png")}
          />
          <Text
            style={{
              color: "red",
              fontSize: 20,
              fontFamily: "outfit",
              textAlign: "center",
            }}
          >
            No Business fund!
          </Text>
        </View>
      )}
    </View>
  );
}
