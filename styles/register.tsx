import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

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

export default style;
