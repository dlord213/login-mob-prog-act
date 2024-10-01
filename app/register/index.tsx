import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable, TextInput, ToastAndroid } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import * as SecureStorage from "expo-secure-store";

import style from "@/styles/register";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import UserContext from "@/contexts/UserContext";

export default function Page() {
  const { emailAddress, setEmailAddress, setLoggedInState } =
    useContext(UserContext);

  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string | null) => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    return false;
  };

  const handleRegister = async () => {
    if (!validateEmail(emailAddress)) {
      setError("Please enter a valid email address.");
      return;
    }
    await SecureStorage.setItemAsync("email-address", emailAddress);
    setLoggedInState(true);
    setError(null);
    router.replace("/dashboard");
    ToastAndroid.show(
      `${emailAddress} - ${password} / Registered`,
      ToastAndroid.SHORT
    );
  };

  return (
    <SafeAreaView style={style.safeAreaView}>
      <Link href="/" replace>
        <AntDesign
          name="arrowleft"
          size={24}
          color={Colors.Text_Light.Default}
        />
      </Link>
      <View style={{ gap: 8 }}>
        <Text
          style={[style.boldFont, style.textDefaultColor, { fontSize: 24 }]}
        >
          Register
        </Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text style={[style.regularFont, style.textSecondaryColor]}>
            Already have an account?
          </Text>
          <Link href="/login" replace>
            <Text style={[style.boldFont, { color: Colors.Wewak[600] }]}>
              Login
            </Text>
          </Link>
        </View>
      </View>
      <TextInput
        placeholder="Email Address"
        style={style.textInputStyle}
        value={emailAddress}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        textContentType="emailAddress"
        cursorColor={Colors.Wewak[300]}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <TextInput
        placeholder="Password"
        style={style.textInputStyle}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        cursorColor={Colors.Wewak[300]}
      />
      <Pressable
        onPress={handleRegister}
        style={({ pressed }) => [
          style.pressableStyle,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={[style.regularFont, { color: Colors.Wewak[50] }]}>
          Register
        </Text>
      </Pressable>
      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}
