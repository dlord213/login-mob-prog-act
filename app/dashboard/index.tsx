import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable } from "react-native";
import * as SecureStorage from "expo-secure-store";

import { useEffect, useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import style from "@/styles/dashboard";

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

  const handleLogout = async () => {
    router.replace("/");
    await SecureStorage.deleteItemAsync("email-address");
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
          onPress={handleLogout}
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
