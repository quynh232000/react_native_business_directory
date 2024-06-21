import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)} style={{marginRight:14}}>
      <View style={{
        width: 74,
            height: 74,
            borderRadius: 99,
            padding:10,
            backgroundColor: "#fff",
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "rgba(rgba(22,22,24,.2))",
    
      }}>
        <Image
          style={{
            borderColor: "rgba(22,22,24,.12)",
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "rgba(rgba(22,22,24,.2))",
            borderWidth: 1,
            padding: 10,
            backgroundColor: "#fff",
            alignItems: "center",
            marginRight: 10,
            width: "100%",
            height: "100%",
            borderRadius: 99,
          }}
          source={{ uri: category.icon }}
        />
      </View>
      <Text style={{ marginTop: 10, textAlign: "center" }}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
