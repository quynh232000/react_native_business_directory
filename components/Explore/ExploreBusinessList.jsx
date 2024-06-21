import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businessList }) {
  return (
    <View
     
      style={{
        marginTop: 20,
        marginBottom: 140,
      }}
    >
      <FlatList
      style={{
        marginBottom:100
      }}
        data={businessList}
        scrollEnabled={true}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
      <View
        style={{
          height: 100,
        }}
      ></View>
    </View>
  );
}
