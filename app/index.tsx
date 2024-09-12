import { Link, SplashScreen, useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  WorkSans_400Regular,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_900Black,
  useFonts,
} from "@expo-google-fonts/work-sans";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import Carousel from "pinar";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    WorkSans_400Regular,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_900Black,
  });
  const { height, width } = useWindowDimensions();

  const router = useRouter();

  const data = [
    {
      title: "Stay focused, achieve more",
      description:
        "Unlock your full potential with our built-in Pomodoro timer and focus tools designed to help you stay on track.",
    },
    {
      title: "Organize your study life",
      description:
        "Keep all your notes in one place and easily manage your tasks. Study smarter, not harder.",
    },
    {
      title: "Boost your productivity",
      description:
        "With our tools, you can schedule your study time, set goals, and track your progress effortlessly.",
    },
  ];

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={style.safeAreaView}>
      <Text
        style={{
          fontFamily: "WorkSans_900Black",
          color: Colors.Text_Light.Default,
          fontSize: 36,
        }}
      >
        étudier
      </Text>
      <Carousel
        loop
        autoplay
        autoplayInterval={5000}
        height={height / 5}
        showsControls={false}
      >
        {data.map((elem) => (
          <View key={elem.title}>
            <Text
              style={{
                fontFamily: "WorkSans_700Bold",
                color: Colors.Text_Light.Secondary,
                fontSize: 24,
              }}
            >
              {elem.title}
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                color: Colors.Text_Light.Secondary,
                fontSize: 16,
              }}
            >
              {elem.description}
            </Text>
          </View>
        ))}
      </Carousel>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          onPress={() => {
            router.replace("/login");
          }}
          style={({ pressed }) => [
            {
              backgroundColor: Colors.Wewak[200],
              opacity: pressed ? 0.7 : 1,
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 16,
              alignItems: "center",
              flex: 1,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: Colors.Wewak[500],
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.replace("/register");
          }}
          style={({ pressed }) => [
            {
              backgroundColor: Colors.Wewak[500],
              opacity: pressed ? 0.7 : 1,
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 16,
              alignItems: "center",
              flex: 1,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: Colors.Wewak[50],
            }}
          >
            Register
          </Text>
        </Pressable>
      </View>

      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
    backgroundColor: Colors.Wewak[50],
  },
});
