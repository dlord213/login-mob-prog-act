import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Pressable } from "react-native";
import * as SecureStorage from "expo-secure-store";

import { useEffect, useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/constants/Colors";

export default function Page() {
  const [emailAddress, setEmailAddress] = useState<string | null>(null);

  const getEmailAddress = async () => {
    let result = await SecureStorage.getItemAsync("email-address");
    if (result) {
      setEmailAddress(result);
    } else {
      router.replace("/login");
    }
  };

  useEffect(() => {
    getEmailAddress();
  }, [emailAddress]);

  return (
    <SafeAreaView style={style.safeAreaView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={[style.boldFont, style.textDefaultColor, { fontSize: 24 }]}
          >
            Welcome!
          </Text>
          <Text style={[style.regularFont, style.textSecondaryColor]}>
            {emailAddress}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          onPress={() => {
            router.replace("/");
          }}
        >
          <MaterialIcons
            name="logout"
            size={24}
            color={style.textDefaultColor}
          />
        </Pressable>
      </View>
      <StatusBar animated style="inverted" />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
    backgroundColor: Colors.Wewak[50],
    gap: 16,
  },
  regularFont: {
    fontFamily: "WorkSans_400Regular",
  },
  semiBoldFont: {
    fontFamily: "WorkSans_600SemiBold",
  },
  boldFont: {
    fontFamily: "WorkSans_700Bold",
  },
  blackFont: {
    fontFamily: "WorkSans_900Black",
  },
  textDefaultColor: {
    color: Colors.Text_Light.Default,
  },
  textSecondaryColor: {
    color: Colors.Text_Light.Secondary,
  },
});
