import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams, RelativePathString } from 'expo-router';
const { height } = Dimensions.get('window');
const TUBE_HEIGHT = 80; 

type LoadingParams = {
  next: string
  title?: string
  subtitle?: string
}

type Props = {
  next?: string
  title?: string
  subtitle?: string
}

export default function LoadingScreen({ next, title, subtitle }: Props) {
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const params = useLocalSearchParams<LoadingParams>()
  
  const finalNext = next ?? (params.next as string) ?? "/home"
  const finalTitle = title ?? (params.title as string) ?? "Carregando..."
  const finalSubtitle = subtitle ?? (params.subtitle as string) ?? "Aguarde um momento..."
  
  const shouldNavigate = !!finalNext

  useEffect(() => {
    if(!shouldNavigate) return;

    Animated.timing(fillAnimation, {
      toValue: 0.9,
      duration: 3500,
      useNativeDriver: true,
    }).start()

    const timer = setTimeout(() => {
      Animated.timing(fillAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start()

      setTimeout(() => {
        router.replace(finalNext as RelativePathString)
      }, 900)
    }, 3500)

    return () => clearTimeout(timer)
  }, [shouldNavigate]);

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
          {finalTitle}
        </Text>

        <Text 
          className="mt-4 text-base text-[#cfc2d7]"
          style={{ fontFamily: 'Manrope' }}
        >
          {finalSubtitle}
        </Text>

      </View>
    </View>
  );
}