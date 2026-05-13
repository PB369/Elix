import ContentCards from "@/components/HomeScreenComponents/ContentCards";
import DoseCard from "@/components/HomeScreenComponents/DoseCard";
import LiquidFillCard from "@/components/HomeScreenComponents/LiquidFillCard";
import Header from "@/components/HomeScreenComponents/Header";
import UploadButton from "@/components/HomeScreenComponents/UploadButton";
import YourContents from "@/components/HomeScreenComponents/YourContents";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  View
} from "react-native";
import "../../global.css";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

            {/* TESTANDO  - Incluir no componente dos conteudos*/}
          {/* <LiquidFillCard progress={60}   icon={
                <MaterialCommunityIcons
                name="brain"
                size={30}
                color="#a78bfa"
                />
            }title="Ola" status="Consolidado"/> */}
          <YourContents/>
          <ContentCards/>
       
        </Animated.View>
        <UploadButton/>
           
    </View>
  );
}