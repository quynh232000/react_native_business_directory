import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfigs";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({explore=false,onCategorySelect}) {
  const router = useRouter()
    const [categoryList,setCategoryList] = useState([])
    useEffect(()=>{
            getCategoryList()
    },[])
    const getCategoryList= async()=>{
        setCategoryList([])
        const q = query(collection(db,'Category'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setCategoryList(prev=>[...prev,{...doc.data(),id:doc.id}])
        })
    }
    const onCategoryPressHandle=(category)=>{
      if(explore){
        onCategorySelect(category)
      }else{
        router.push('/businesslist/'+category.name)

      }
    }
  return (
    <View>
     {!explore && <View
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
          Category
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>}
      <View style={{paddingLeft:20}}>
        <FlatList 
        horizontal={true}
        style={{display: "flex",gap:10}}
        data={categoryList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
           <CategoryItem key={index} category={item} onCategoryPress={(category)=>onCategoryPressHandle(category)}/>
        )}
        />
      </View>
    </View>
  );
}
