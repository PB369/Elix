import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";


export default function WelcomeScreen() {
  const elixPotionPath = require('@/assets/images/elix-potion.png')
  const elixLogoPath = require('@/assets/images/elix-logo.png')

  return (
    <View className="flex-1 bg-[#16111b] items-center justify-center px-6 overflow-hidden">
      <StatusBar barStyle="light-content" />

      {/* Atmospheric Purple Glow */}
      <View className="absolute inset-0 items-center justify-center">
        <LinearGradient
         colors={['transparent', 'rgba(138, 43, 226, 0.15)', 'transparent']}
         style={[StyleSheet.absoluteFill, { transform: [{ scale: 1.5 }] }]}
         start={{ x: 0.5, y: 0.3 }}
         end={{ x: 0.5, y: 0.7 }}
           />   {/* Glow Suave Superior para destacar o logo */}
           <View
         style={{
           position: 'absolute',
           top: -150,
           left: '50%',
           marginLeft: -250,
           width: 500,
           height: 500,
           backgroundColor: 'rgba(138, 43, 226, 0.1)',
           borderRadius: 250,
           filter: 'blur(80px)', // Nota: Requer suporte a Blur no RN ou uso de MaskedView/Canvas
         }}
           />   {/* Degradê de profundidade de baixo para cima */}
           <LinearGradient
         colors={['rgba(13, 9, 18, 0)', '#0d0912']}
         className="absolute bottom-0 left-0 right-0 h-1/2"
           />
      </View>

      {/* Main Content */}
      <View className="w-full max-w-md items-center space-y-8">
        {/* Logo */}
        <View className="w-40 mb-2">
          <Image
            source={elixLogoPath}
            resizeMode="contain"
            className="w-full h-20"
          />
        </View>

        {/* Main Image */}
        <View className="relative w-[307px] h-[307px] items-center justify-center">
          {/* Glow */}

          <Image
            source={elixPotionPath}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>

        {/* Text Content */}
        <View className="px-2 items-center mt-6">
          <Text className="text-[#eadfee] text-[36px] font-extrabold text-center leading-[40px] tracking-[-0.8px]">
            Transforme seus estudos em aprendizado real
          </Text>

          <Text className="text-[#cfc2d7] text-base text-center leading-7 mt-4 max-w-[280px]">
            O Elix ajuda você a dominar o que aprendeu através de revisões
            diárias
          </Text>
        </View>

        {/* Buttons */}
        <View className="w-full mt-10 space-y-4">
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-full bg-[#8a2be2] py-4 rounded-full items-center"
            style={{
              shadowColor: "#8a2be2",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 10,
            }}
          >
            <Text className="text-[#eed9ff] text-lg font-bold">
              Começar Jornada
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full py-3 items-center"
          >
            <Text className="text-[#dcb8ff] text-base font-medium">
              Já tenho uma conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}