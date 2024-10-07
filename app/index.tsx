import { SplashScreen, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

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

import SparkAnimation from "../assets/lottie/spark.json";
import TimerAnimation from "../assets/lottie/timer.json";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [loaded, error] = useFonts({
    WorkSans_400Regular,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_900Black,
  });

  const { loggedInState } = useContext(UserContext);
  const { height, width } = useWindowDimensions();

  const screenHeight = useMemo(() => height, [height]);
  const screenWidth = useMemo(() => width, [width]);

  const router = useRouter();

  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTimer((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [showTimer]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      if (loggedInState) {
        router.replace("/dashboard");
      }
    }
  }, [loaded, error, loggedInState]);

  const memoizedLottieView = useMemo(() => {
    return showTimer ? (
      <LottieView
        source={SparkAnimation}
        autoPlay
        loop
        style={{ width: screenWidth, height: screenHeight }}
      />
    ) : (
      <LottieView
        source={TimerAnimation}
        autoPlay
        loop
        style={{ width: screenWidth, height: screenHeight }}
      />
    );
  }, [showTimer, screenHeight, screenWidth]);

  const memoizedCarousel = useMemo(
    () => (
      <Carousel
        loop
        autoplay
        autoplayInterval={5000}
        height={screenHeight / 5}
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
    ),
    [screenHeight]
  );

  if (!loaded && !error) {
    return null;
  }

  if (!loggedInState) {
    return (
      <SafeAreaView style={style.safeAreaView}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {memoizedLottieView}
        </View>
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
        {memoizedCarousel}
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

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ActivityIndicator size={64} color={Colors.Wewak[600]} />
    </SafeAreaView>
  );
}
