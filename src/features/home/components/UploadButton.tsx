import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

interface UploadButtonProps {
  onPress: () => void;
}

const UploadButton = ({ onPress }: UploadButtonProps) => {
  // 1. Valor inicial da animação (de 0 a 1)
  const pulseAnim = useRef(new Animated.Value(0)).current;

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
        width: 52,
        height: 52,
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
            borderRadius: '30%',
            backgroundColor: "#8749f1", // Cor do brilho
          },
          glowStyle,
        ]}
      />

      {/* O botão interativo que fica por cima */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: '30%',
          borderWidth: 2,
          borderColor: "#8749f1",
          backgroundColor: "#5b21b6",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name="plus" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default UploadButton;