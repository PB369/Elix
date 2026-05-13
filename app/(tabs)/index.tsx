import "../../global.css";
import React, { useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Animated,
  StatusBar,
} from "react-native";
import DoseCard from "@/components/HomeScreenComponents/DoseCard";
import ContentCards from "@/components/HomeScreenComponents/ContentCards";
import Header from "@/components/HomeScreenComponents/Header";
import YourContents from "@/components/HomeScreenComponents/YourContents";
import UploadButton from "@/components/HomeScreenComponents/UploadButton";

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 bg-[#080510]">
        <Animated.View
          style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Header/>
          <DoseCard onPress={() => {}} />
          <YourContents/>
          <ContentCards/>
        </Animated.View>
        <UploadButton/>
    </View>
  );
}