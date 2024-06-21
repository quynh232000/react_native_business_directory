import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfigs";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

export default function Review({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState("");
  const { user } = useUser();

  const onSubmit = async () => {
    console.log(123);
    const docRef = doc(db, "BusinessList", business.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    Toast.show({
      type: "success", // other options: 'error', 'info'
      text1: "Success!",
      text2: "Comment Add Successfully.",
    });
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        paddingBottom: 600,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Review
      </Text>
      <Rating
        showRating={false}
        imageSize={20}
        onFinishRating={(rating) => setRating(rating)}
        style={{ paddingVertical: 10 }}
      />
      <TextInput
        onChangeText={(value) => setUserInput(value)}
        placeholder="Write your comment"
        numberOfLines={4}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          borderColor: Colors.GRAY,
        }}
      />
      <TouchableOpacity
        disabled={!userInput}
        onPress={onSubmit}
        style={{
          borderRadius: 6,
          backgroundColor: Colors.PRIMARY,
          padding: 10,
          color: "white",
          marginTop: 10,
          alignContent: "center",
        }}
      >
        <Text
          style={{
            alignContent: "center",
            textAlign: "center",
            color: "white",
            fontFamily: "outfit-bold",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>

      {/* display previus reviews */}
      <Text></Text>
      <View>
        {business?.reviews?.map((item, index) => (
          <View key={index} style={{
            display:"flex",
            flexDirection:"row",
            gap:10,
            alignItems:"center",
            marginBottom:5,
            borderBottomWidth:1,
            marginTop:10,
            paddingBottom:10,
            borderBottomColor:"rgba(22,22,24,.12)"

          }}>
            <Image
              source={{ uri: item.userImage }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 90,
              }}
            />
            <View style={{
                display:"flex"
            }}>
              <Text>{item.userName}</Text>
              <Rating imageSize={16} ratingCount={item.ratingCount} />
              <Text>{item?.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
