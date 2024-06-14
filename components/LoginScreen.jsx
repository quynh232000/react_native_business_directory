import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import login from "../assets/images/login1.png";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 90,
        }}
      >
        <Image
          source={login}
          style={{
            with: 180,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "gray",
            objectFit: "cover",
          }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          <Text style={{ marginRight: 10, paddingRight: 10 }}>Mạng xã hội</Text>
          <Text style={{ color: "gray", paddingVertical: 20 }}>-</Text>
          <Text style={{ color: Colors.PRIMARY, marginLeft: 10 }}>
            Quin Social
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Quinsocial giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
          của bạn.
        </Text>
      </View>
      <TouchableOpacity
      onPress={onPress}
      style={styles.btn}>
        <Text style={{ color: "white" }}>Bắt đầu ngay</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 20,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
});
