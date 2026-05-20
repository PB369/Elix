import { Entypo, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

const DoseCard = ({ onPress }: { onPress: () => void }) => {
  const shimmer = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  const titleSize = width * 0.065;
  const subtitleSize = width * 0.035;
  const iconBoxSize = width * 0.13;
  const phoneWidth = width * 0.13;
  const phoneHeight = width * 0.2;
  const illustrationSize = width * 0.28;
  const cardPadding = width * 0.055;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 2200, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ])
    ).start();
  }, [shimmer]);

  const glowOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.9],
  });

  return (
    <View
      className="rounded-3xl overflow-hidden"
      style={{
        marginHorizontal: width * 0.03,
        borderWidth: 1,
        borderColor: "rgba(139,92,246,0.35)",
      }}
    >
      <LinearGradient
        colors={["#000000", "#190522", "#120325"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: cardPadding }}
      >
        {/* Top row */}
        <View className="flex-row items-start justify-between" style={{ marginBottom: 16 }}>

          <View className="flex-1" style={{ paddingRight: 12 }}>
            {/* Icon badge */}
            <View
              className="items-center justify-center"
              style={{
                width: iconBoxSize,
                height: iconBoxSize,
                borderRadius: iconBoxSize * 0.28,
                marginBottom: 12,
                backgroundColor: "#0B031B",
                borderWidth: 1,
                borderColor: "#48356b",
              }}
            >
              <Text style={{ fontSize: iconBoxSize * 0.45 }}>✨</Text>
            </View>

            {/* Title */}
            <Text
              className="font-bold text-white"
              style={{ fontSize: titleSize, lineHeight: titleSize * 1.25, marginBottom: 6 }}
            >
              Sua dose de hoje{"\n"}está pronta{" "}
              <Entypo name="check" size={titleSize} color="#7c3aed" />
            </Text>

            {/* Subtitle */}
            <Text className="text-white/50" style={{ fontSize: subtitleSize }}>
              Baseada no que{" "}
              <Text style={{ color: "#7c3aed" }}>você estudou</Text>
            </Text>
          </View>

          {/* Phone illustration */}
          <Animated.View style={{ opacity: glowOpacity }}>
            <View
              className="items-center justify-center"
              style={{ width: illustrationSize, height: illustrationSize }}
            >
              {/* Glow platform */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: illustrationSize * 0.75,
                  height: illustrationSize * 0.18,
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
                className="items-center justify-center"
                style={{
                  width: phoneWidth,
                  height: phoneHeight,
                  borderRadius: phoneWidth * 0.28,
                  borderWidth: 2,
                  borderColor: "rgba(167,139,250,0.6)",
                  backgroundColor: "rgba(109,40,217,0.25)",
                  shadowColor: "#7c3aed",
                  shadowRadius: 12,
                  shadowOpacity: 0.8,
                  shadowOffset: { width: 0, height: 0 },
                }}
              >
                <View
                  className="items-center justify-center"
                  style={{
                    width: phoneWidth * 0.55,
                    height: phoneWidth * 0.55,
                    borderRadius: phoneWidth * 0.275,
                    borderWidth: 2,
                    borderColor: "rgba(167,139,250,0.9)",
                  }}
                >
                  <Feather name="check" size={phoneWidth * 0.28} color="#a78bfa" />
                </View>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Divider info */}
        <View className="flex-row items-center" style={{ marginBottom: cardPadding }}>
          <Feather name="clock" size={subtitleSize * 1.1} color="rgba(255,255,255,0.4)" />
          <Text className="text-white/40" style={{ fontSize: subtitleSize, marginLeft: 6 }}>
            5 perguntas
            <Text className="text-white/25">{"  |  "}Revisão rápida</Text>
          </Text>
        </View>

        {/* CTA Button */}
      <TouchableOpacity
  onPress={onPress}
  activeOpacity={0.85}
  className="rounded-2xl overflow-hidden"
>
  <LinearGradient
    colors={["#6d28d9", "#5b21b6"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center", // 1. Centraliza o conteúdo principal (o texto)
      paddingVertical: cardPadding * 0.85,
      paddingHorizontal: cardPadding,
      position: "relative", // 2. Garante que o ícone absoluto se alinhe em relação ao botão
    }}
  >
    <Text className="text-white font-semibold" style={{ fontSize: width * 0.042 }}>
      Começar revisão
    </Text>

    <View
      className="items-center justify-center"
      style={{
        width: width * 0.09,
        height: width * 0.09,
        borderRadius: width * 0.045,
        backgroundColor: "rgba(255,255,255,0.15)",
        flexShrink: 0,
        // 3. Posiciona o ícone na extrema direita de forma absoluta
        position: "absolute",
        right: cardPadding, 
      }}
    >
      <Feather name="arrow-right" size={width * 0.04} color="white" />
    </View>
  </LinearGradient>
</TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default DoseCard;