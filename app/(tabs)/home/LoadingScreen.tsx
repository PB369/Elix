import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlaskConical } from 'lucide-react-native';
import { router } from 'expo-router';

const { height } = Dimensions.get('window');
const POTION_SIZE = 100; 

const waitChangeRoute = () =>{

  setTimeout(() => {
    router.push("/(tabs)/home");
  }, 1500); // Altere este valor para o tempo que desejar em milissegundos
}

export default function LoadingScreen() {
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const [percentage, setPercentage] = useState('0%');

useEffect(() => {
  // Ouvinte para atualizar o estado da porcentagem textual de forma limpa
  const listenerId = fillAnimation.addListener(({ value }) => {
    setPercentage(`${Math.round(value * 100)}%`);
  });

  // Animação inicial (até 90%)
  Animated.timing(fillAnimation, {
    toValue: 0.9,
    duration: 10000,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true, // Mantém a performance fluida
  }).start();

  // Simulação do término da carga (100%)
  const fakeApiCall = setTimeout(() => {
    fillAnimation.stopAnimation(() => {
      Animated.timing(fillAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        // --- ADICIONADO AQUI ---
        // Quando os 100% terminarem de encher, chama a função da rota
        if (finished) {
          waitChangeRoute();
        }
      });
    });
  }, 3500);

  return () => {
    clearTimeout(fakeApiCall);
    fillAnimation.removeListener(listenerId);
  };
}, [fillAnimation]);

  // Animações de preenchimento
  const bgScaleY = fillAnimation;
  const bgTranslateY = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  return (
    <View className="flex-1 bg-[#16111b]">
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#16111b' }]} />

      {/* Background animado */}
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ translateY: bgTranslateY }, { scaleY: bgScaleY }] },
        ]}
      >
        <LinearGradient
          colors={['#8A2BE2', '#000000']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>

      {/* Conteúdo Central */}
      <View className="absolute inset-0 z-10 items-center justify-center px-6">
        
        {/* --- PORCENTAGEM ACIMA --- */}
        <Text 
          className="text-7xl font-bold mb-3 tracking-wider text-[#eed9ff]/90 text-center"
          style={{ fontFamily: 'Manrope' }}
        >
          {percentage}
        </Text>

      

        {/* Textos Informativos */}
        <Text
          className="text-center text-[2.2rem] font-bold tracking-[-0.02em] text-[#eed9ff]"
          style={{ fontFamily: 'Manrope' }}
        >
          Preparando a revisão...
        </Text>

      </View>
    </View>
  );
}