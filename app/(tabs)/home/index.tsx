import ContentCards from "@/components/HomeScreenComponents/ContentCards";
import DoseCard from "@/components/HomeScreenComponents/DoseCard";
import Header from "@/components/HomeScreenComponents/Header";
import UploadButton from "@/components/HomeScreenComponents/UploadButton";
import YourContents from "@/components/HomeScreenComponents/YourContents";
import { AntDesign } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import '../../../global.css';
import { getHomeData } from "../../services/homeService";

export default function HomeScreen() {

   const { user, doseHoje, macrotemas } = getHomeData();

   

  // 1. Ref para controlar o Bottom Sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // 2. Define as alturas que o Bottom Sheet pode assumir (ex: 25% e 50% da tela)
  const snapPoints = useMemo(() => ['20%'], []);
  // 3. Função disparada pelo seu Upload Button
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

const renderBackdrop = useCallback(
    (props: any) => (
      
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1} 
        appearsOnIndex={0}     
        pressBehavior="close"  
      >
      
      </BottomSheetBackdrop>
    ),
    []
  );


  const renderBackground = useCallback(
  (props: any) => (
    <BlurView
      // O props.style é injetado pela biblioteca para posicionar o fundo
      style={[props.style, { borderRadius: 24, overflow: 'hidden' }]}
      tint="default"
      intensity={50} // Ajuste a força do vidro
    />
  ),
  []
);


  return (

   
    <View className="flex-1 bg-[#080510]">
       
        
          <Header/>
          <DoseCard onPress={() => {router.push("/(tabs)/home/Quiz")}} />
          <YourContents/>
          <ContentCards macrotemas={macrotemas}/>
      
       
        <UploadButton onPress={handlePresentModalPress}/>





             {/* O BOTTOM SHEET EM SI */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0} // abre no primeiro ponto
        snapPoints={snapPoints}
         backgroundComponent={renderBackground}
        backdropComponent={renderBackdrop}
        
      >
        <BottomSheetView style={{flex:1,alignItems:'center',padding:24}}>
            
              <TouchableOpacity onPress={()=>{ bottomSheetModalRef.current?.dismiss();router.push('/home/AddContent')}} className="flex-row items-center p-4 my-2 mx-4 rounded-xl shadow-sm elevation-1">
                
                {/* Ícone posicionado à esquerda com fundo leve */}
                <View className="mr-4 p-2.5 rounded-full">
                  <AntDesign name="plus" size={24} color="#d3a0fc" />
                </View>

                {/* Bloco de texto empilhado (Título em cima, Subtítulo em baixo) */}
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-white mb-1">
                    Adicionar Conteúdo
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Inclua Documentos, anotações de aula, o que estudou
                  </Text>
                </View>

              </TouchableOpacity>
      
        </BottomSheetView>
      </BottomSheetModal>
           
    </View>
  );
}

