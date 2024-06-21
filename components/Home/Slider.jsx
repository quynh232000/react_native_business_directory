import { View, Text, FlatList,Image } from "react-native";
import React, { useEffect, useState } from "react";
// import { query } from "firebase/database";
import { collection, getDocs,query } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfigs";

export default function Slider() {
  const [sliderList,setSliderList] = useState([])
  useEffect(() => {
    GetSilderList();
  }, []);
  const GetSilderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setSliderList(prev=>[...prev,doc.data()])
    });
  };
  return (
    <View>
      <Text style={{fontFamily:"outfit-bold",fontSize:20,paddingLeft:20,paddingTop:20,marginBottom:5}}>
        #Special for you 
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft:20}}
        renderItem={({item,index})=>(
          <Image key={index} source={{uri:item.imageUrl}}
          style={{
            width:300,
            height:150,
            objectFit:"cover",
            borderRadius:15,
            marginRight:15,
          }}/>
        )}
      
      />
    </View>
  );
}
