import { Entypo, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

const DoseCard = ({ onPress }: { onPress: () => void }) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmer]);

  const glowOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.85],
  });

  return (
    <View
      className="mx-6 rounded-3xl overflow-hidden"
      style={{ borderWidth: 1, borderColor: "rgba(139,92,246,0.35)" }}
    >
      <LinearGradient
        colors={["#1a0a2e", "#170d35", "#0f0a1e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5 pt-4"
      >
        {/* Top row */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1 pr-4">
            {/* Icon badge */}
            <View
              className="w-12 h-12 rounded-xl items-center justify-center mb-3"
              style={{ backgroundColor: "#0B031B", borderWidth:1, borderColor: "#48356b" }}
            >
              <Text className="">✨</Text>
            </View>

            <Text className="text-white text-2xl font-bold leading-tight mb-1">
              Sua dose de hoje{"\n"}está pronta{" "}
              <Entypo name="check" size={24} color="#7c3aed" />
            </Text>
            <Text className="text-white/50 text-sm">
              Baseada no que{" "}
              <Text style={{ color: "#7c3aed" }}>você estudou</Text>
            </Text>
          </View>

          {/* 3D phone illustration — SVG-style with View layers */}
          <Animated.View style={{ opacity: glowOpacity }}>
            <View className="items-center justify-center" style={{ width: 90, height: 90 }}>
              {/* Glow platform */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: 70,
                  height: 18,
                  borderRadius: 999,
                  backgroundColor: "#7c3aed",
                  opacity: 0.5,
                  shadowColor: "#7c3aed",
                  shadowRadius: 20,
                  shadowOpacity: 1,
                  shadowOffset: { width: 0, height: 0 },
                }}
              />
              {/* Phone frame */}
              <View
                style={{
                  width: 50,
                  height: 72,
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: "rgba(167,139,250,0.6)",
                  backgroundColor: "rgba(109,40,217,0.25)",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#7c3aed",
                  shadowRadius: 12,
                  shadowOpacity: 0.8,
                  shadowOffset: { width: 0, height: 0 },
                }}
              >
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    borderWidth: 2,
                    borderColor: "rgba(167,139,250,0.9)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="check" size={14} color="#a78bfa" />
                </View>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-4">
          <Feather name="clock" size={14} color="rgba(255,255,255,0.4)" />
          <Text className="text-white/40 text-xs ml-2">
            5 perguntas
            <Text className="text-white/25">  |  Revisão rápida</Text>
          </Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.85}
          style={{ borderRadius: 16, overflow: "hidden" }}
        >
          <LinearGradient
            colors={["#6d28d9", "#5b21b6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center justify-between px-5 py-4"
          >
            <Text className="text-white text-base font-semibold">
              Começar revisão
            </Text>
            <View
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              <Feather name="arrow-right" size={16} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default DoseCard