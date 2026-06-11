import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

interface UploadButtonProps {
  onPress: () => void;
}

const UploadButton = ({ onPress }: UploadButtonProps) => {
  // 1. Valor inicial da animação (de 0 a 1)
  const pulseAnim = useRef(new Animated.Value(0)).current;


  const scaleAnim = useRef(new Animated.Value(1)).current;

const handlePress = () => {
  Animated.sequence([
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      speed: 50,
      bounciness: 10,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 20,
      bounciness: 6,
      useNativeDriver: true,
    }),
  ]).start();

  onPress();
};

  useEffect(() => {
    // 2. Cria um loop infinito de animação
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 3000, // Duração de 2 segundos para um pulso suave
        useNativeDriver: true, // Roda direto na GPU para máxima performance
      })
    ).start();
  }, [pulseAnim]);

  // 3. Interpola os valores para escala e opacidade
  const glowStyle = {
    transform: [
      {
        scale: pulseAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5], // O brilho expande de 1x até 1.5x o tamanho do botão
        }),
      },
    ],
    opacity: pulseAnim.interpolate({
      inputRange: [0,0.2, 0.5,0.8,0.9, 1],
      outputRange: [1,0.8, 0.5, 0.3,0.1,0], // Começa visível e vai desvanecendo até sumir
    }),
  };

  return (
    // O container herda a posição absoluta que antes era do botão
    <View
      style={{
        position: "absolute",
        right: 24,
        bottom: 112,
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* O brilho animado que fica por trás */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 20,
            backgroundColor: "#8749f1", // Cor do brilho
          },
          glowStyle,
        ]}
      />

      {/* O botão interativo que fica por cima */}
 <TouchableOpacity
  onPress={handlePress}
  activeOpacity={1} // desativa o fade padrão, a animação cuida do feedback
  style={{ width: "100%", height: "100%" }}
>
  <Animated.View
    style={[
      {
        width: "100%",
        height: "100%",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#8749f1",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        transform: [{ scale: scaleAnim }],
      },
    ]}
  >
    <LinearGradient
      colors={["#8749f1", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    />
    <Feather name="plus" size={22} color="white" />
  </Animated.View>
</TouchableOpacity>
    </View>
  );
};

export default UploadButton;