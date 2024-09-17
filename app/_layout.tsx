import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
  );
}
