import ContentCards from "@/components/HomeScreenComponents/ContentCards";
import DoseCard from "@/components/HomeScreenComponents/DoseCard";
import Header from "@/components/HomeScreenComponents/Header";
import UploadButton from "@/components/HomeScreenComponents/UploadButton";
import YourContents from "@/components/HomeScreenComponents/YourContents";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Text, View } from "react-native";
import "../../global.css";




export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // 1. Ref para controlar o Bottom Sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // 2. Define as alturas que o Bottom Sheet pode assumir (ex: 25% e 50% da tela)
  const snapPoints = useMemo(() => ['15%'], []);
  // 3. Função disparada pelo seu Upload Button
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} // Fica invisível quando o modal fecha
        appearsOnIndex={0}     // Aparece assim que o modal abre no primeiro snap point
        pressBehavior="close"  // Garante que o toque fechará o modal
      />
    ),
    []
  );


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
        <UploadButton onPress={handlePresentModalPress}/>





             {/* O BOTTOM SHEET EM SI */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0} // abre no primeiro ponto
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: 'black' }}
      >
        <BottomSheetView style={{flex:1,alignItems:'center',padding:24}}>
          <Text style={{color:"white"}}>Adicionar Conteúdo</Text>
          {/* Ex: Botões de Câmera, Galeria, Arquivos */}
        </BottomSheetView>
      </BottomSheetModal>
           
    </View>
  );
}