import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfigs";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Review from "../../components/BusinessDetail/Review";

export default function BusenissDetail() {
  const [businessDetail, setBusinessDetail] = useState({});
  const navigation = useNavigation();
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerTitle: "Detail",
  //   });
  // }, []);
  const { businessid } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  // get detail by id
  useEffect(() => {
    getBusinessDetailById();
  }, []);
  const getBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBusinessDetail({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.log("No such document!");
    }
    setLoading(false);
  };
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{
            marginTop: "60%",
          }}
        />
      ) : (
        <View>
          {/* intro */}
          <Intro business={businessDetail} />
          {/* action button */}
          <ActionButton business={businessDetail} />
          {/* about section */}
          <About business={businessDetail} />
          {/* review session */}
          <Review business={businessDetail} />
        </View>
      )}
    </ScrollView>
  );
}
