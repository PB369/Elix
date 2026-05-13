import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

type ContentCardProps = {
  icon: React.ReactNode;
  title: string;
  category: string;
  status: "Em reforço" | "Dominado";
  progress: number;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48 - 12) / 2; // px-6 both sides + gap

const ContentCard = ({
  icon,
  title,
  category,
  status,
  progress,
}: ContentCardProps) => {
  const isDominado = status === "Dominado";

  return (
    <View
      style={{
        width: CARD_WIDTH,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(139,92,246,0.2)",
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={["#130b24", "#0d0717"]}
        className="flex-1 p-4"
        style={{ minHeight: 200 }}
      >
        {/* Header */}
        <View className="flex-row items-start justify-between mb-3">
          <View
            className="w-9 h-9 rounded-xl items-center justify-center"
            style={{ backgroundColor: "rgba(139,92,246,0.2)" }}
          >
            {icon}
          </View>
          <TouchableOpacity>
            <Feather name="more-vertical" size={16} color="rgba(255,255,255,0.35)" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text
          className="text-white font-bold text-base leading-snug mb-1"
          numberOfLines={2}
        >
          {title}
        </Text>

        {/* Category */}
        <Text style={{ color: "#7c3aed" }} className="text-xs font-medium mb-3">
          {category}
        </Text>

        {/* Status badge */}
        <View
          className="self-start flex-row items-center px-2.5 py-1 rounded-full mb-auto"
          style={{
            backgroundColor: isDominado
              ? "rgba(109,40,217,0.2)"
              : "rgba(139,92,246,0.12)",
            borderWidth: 1,
            borderColor: isDominado
              ? "rgba(109,40,217,0.4)"
              : "rgba(139,92,246,0.25)",
          }}
        >
          {isDominado ? (
            <Feather name="check-circle" size={11} color="#a78bfa" />
          ) : (
            <MaterialCommunityIcons name="refresh" size={12} color="#a78bfa" />
          )}
          <Text style={{ color: "#a78bfa" }} className="text-xs ml-1 font-medium">
            {status}
          </Text>
        </View>

        {/* Wave decoration */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            opacity: 0.35,
          }}
        >
          <LinearGradient
            colors={["transparent", "#4c1d95"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
          />
        </View>

        {/* Progress */}
        <Text
          style={{ color: "#8b5cf6" }}
          className="text-2xl font-bold mt-10 relative z-10"
        >
          {progress}%
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ContentCard