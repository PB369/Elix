import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');
const TUBE_HEIGHT = 80; 

export default function LoadingScreen() {
  const fillAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fillAnimation, {
      toValue: 0.9, 
      duration: 10000, 
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    const fakeApiCall = setTimeout(() => {
      fillAnimation.stopAnimation(() => {
        Animated.timing(fillAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    }, 3500);

    return () => {
      clearTimeout(fakeApiCall);
    };
  }, [fillAnimation]);

  const bgScaleY = fillAnimation;
  const bgTranslateY = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [height / 2, 0], 
  });

  const tubeScaleY = fillAnimation;
  const tubeTranslateY = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [TUBE_HEIGHT / 2, 0], 
  });

  return (
    <View className="flex-1 bg-[#16111b]">
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#16111b' }]} />

      {/* Gradiente vibrante restaurado */}
      <Animated.View 
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ translateY: bgTranslateY }, { scaleY: bgScaleY }] }
        ]}
      >
        <LinearGradient
          colors={['#8A2BE2', 'black']} 
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>

      <View className="absolute inset-0 z-10 items-center justify-center">
        
        {/* <View 
          className="mb-10 w-[45px] overflow-hidden rounded-[80px] border border-[#4c4354]/20 bg-[#110c16]"
          style={{ height: TUBE_HEIGHT }}
        >
        
          <Animated.View 
            className="bg-[#e3b4ff]"
            style={[
              StyleSheet.absoluteFillObject,
              { transform: [{ translateY: tubeTranslateY }, { scaleY: tubeScaleY }] }
            ]} 
          />
        </View> */}
        
        <Text 
          className="text-center text-[2.2rem] font-bold tracking-[-0.02em] text-[#eed9ff]"
          style={{ fontFamily: 'Manrope'}}
        >
          Preparando a revisão...
        </Text>

        <Text 
          className="mt-4 text-base text-[#cfc2d7]"
          style={{ fontFamily: 'Manrope' }}
        >
          Ajustando a combinação...
        </Text>

      </View>
    </View>
  );
}