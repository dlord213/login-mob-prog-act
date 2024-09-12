import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function Page() {
  const router = useRouter();

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
          style={[
            style.boldFont,
            style.textDefaultColor,
            {
              fontSize: 24,
            },
          ]}
        >
          Login
        </Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text
            style={[
              style.regularFont,
              {
                color: Colors.Text_Light.Secondary,
              },
            ]}
          >
            Don't have an account?
          </Text>
          <Link href="/register" asChild replace>
            <Text
              style={[
                style.semiBoldFont,
                {
                  color: Colors.Wewak[600],
                },
              ]}
            >
              Register
            </Text>
          </Link>
        </View>
      </View>
      <TextInput placeholder="Email Address" style={style.textInputStyle} />
      <TextInput placeholder="Password" style={style.textInputStyle} />
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
              color: Colors.Wewak[50],
            },
          ]}
        >
          Login
        </Text>
      </Pressable>
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
  pressableStyle: {
    backgroundColor: Colors.Wewak[600],
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: "center",
  },
  textInputStyle: {
    backgroundColor: "#E3E3E3",
    borderRadius: 16,
    padding: 16,
  },
});
