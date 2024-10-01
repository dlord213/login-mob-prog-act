import { SplashScreen, useRouter } from "expo-router";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import {
  WorkSans_400Regular,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_900Black,
  useFonts,
} from "@expo-google-fonts/work-sans";

import Carousel from "pinar";

import Colors from "@/constants/Colors";
import data from "@/constants/LandingData";
import style from "@/styles/landing_page";
import UserContext from "@/contexts/UserContext";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    WorkSans_400Regular,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_900Black,
  });

  const { loggedInState } = useContext(UserContext);

  const { height } = useWindowDimensions();

  const router = useRouter();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      if (loggedInState) {
        router.replace("/dashboard");
      }
    }
  }, [loaded, error, loggedInState]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={style.safeAreaView}>
      <Text
        style={[
          style.blackFont,
          style.textDefaultColor,
          {
            fontSize: 36,
          },
        ]}
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
              style={[
                style.boldFont,
                style.textSecondaryColor,
                {
                  fontSize: 24,
                },
              ]}
            >
              {elem.title}
            </Text>
            <Text
              style={[
                style.regularFont,
                style.textSecondaryColor,
                {
                  fontSize: 16,
                },
              ]}
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
            style.pressableStyle,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text
            style={[
              style.regularFont,
              {
                color: Colors.Wewak[500],
              },
            ]}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.replace("/register");
          }}
          style={({ pressed }) => [
            style.pressableStyle,
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text
            style={[
              style.regularFont,
              {
                color: Colors.Wewak[500],
              },
            ]}
          >
            Register
          </Text>
        </Pressable>
      </View>
      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}
