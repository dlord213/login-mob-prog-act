import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Pressable, TextInput, StyleSheet } from "react-native";
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
          style={{
            fontFamily: "WorkSans_700Bold",
            color: Colors.Text_Light.Default,
            fontSize: 24,
          }}
        >
          Register
        </Text>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular",
              color: Colors.Text_Light.Secondary,
            }}
          >
            Already have an account?
          </Text>
          <Link href="/login" asChild replace>
            <Text
              style={{
                fontFamily: "WorkSans_600SemiBold",
                color: Colors.Wewak[600],
              }}
            >
              Login
            </Text>
          </Link>
        </View>
      </View>
      <TextInput
        placeholder="Email Address"
        style={{
          backgroundColor: "#E3E3E3",
          borderRadius: 16,
          padding: 16,
        }}
      />
      <TextInput
        placeholder="Password"
        style={{
          backgroundColor: "#E3E3E3",
          borderRadius: 16,
          padding: 16,
        }}
      />
      <Pressable
        onPress={() => {
          router.replace("/login");
        }}
        style={({ pressed }) => [
          {
            backgroundColor: Colors.Wewak[600],
            opacity: pressed ? 0.7 : 1,
            paddingHorizontal: 24,
            paddingVertical: 8,
            borderRadius: 16,
            alignItems: "center",
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
});
