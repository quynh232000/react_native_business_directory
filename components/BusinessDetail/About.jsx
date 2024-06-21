import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        padding:20,
        backgroundColor:"#fff"
    }}>
      <Text style={{
        fontFamily:"outfit-bold",
        fontSize:20
      }}>About</Text>
      <Text style={{
        lineHeight:25,
        fontSize:16
      }}>
        {business.about}
      </Text>
    </View>
  )
}