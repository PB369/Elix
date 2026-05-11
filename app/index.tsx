import { Link } from "expo-router";
import { View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="">
      <Link href="/welcome">
        Go to Welcome screen
      </Link>
    </View>
  );
}
