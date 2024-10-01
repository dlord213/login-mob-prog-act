import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable } from "react-native";
import * as SecureStorage from "expo-secure-store";

import { useContext, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import style from "@/styles/dashboard";
import UserContext from "@/contexts/UserContext";

export default function Page() {
  const { emailAddress, setEmailAddress, setLoggedInState } =
    useContext(UserContext);

  const getEmailAddress = async () => {
    let result = await SecureStorage.getItemAsync("email-address");
    if (result) {
      setEmailAddress(result);
    } else {
      router.replace("/login");
    }
  };

  const handleLogout = async () => {
    setLoggedInState(false);
    await SecureStorage.deleteItemAsync("email-address");
    router.replace("/");
  };

  useEffect(() => {
    getEmailAddress();
  }, []);

  const pressableIconsViewStyle = useMemo(
    () => ({
      flexDirection: "row",
      gap: 16,
    }),
    []
  );

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
        <View style={pressableIconsViewStyle}>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            onPress={() => router.push("/profile")}
          >
            <FontAwesome
              name="user-circle-o"
              size={24}
              color={style.textDefaultColor}
            />
          </Pressable>
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
      </View>
      <StatusBar animated style="inverted" />
    </SafeAreaView>
  );
}
