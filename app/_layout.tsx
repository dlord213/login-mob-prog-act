import UserContext from "@/contexts/UserContext";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";

export default function RootLayout() {
  const [emailAddress, setEmailAddress] = useState("");
  const [loggedInState, setLoggedInState] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      let result = await SecureStorage.getItemAsync("email-address");
      if (result) {
        setLoggedInState(true);
        setEmailAddress(result);
      }
    };
    getSession();
  }, []);

  return (
    <UserContext.Provider
      value={{ setEmailAddress, emailAddress, setLoggedInState, loggedInState }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ animation: "fade" }} />
        <Stack.Screen
          name="register/index"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="login/index"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen name="dashboard/index" />
      </Stack>
    </UserContext.Provider>
  );
}
