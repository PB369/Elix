import React from 'react';
import { View, StyleSheet } from 'react-native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';

// Componente estilizado para o container principal
const StyledView = styled(View);

/**





BackgroundGlow - Componente para gerar o efeito de profundidade e brilho



característico do Elix. Utiliza uma combinação de degradês lineares



e posicionamento absoluto para criar a atmosfera "The Sanctuary".
 /
export const BackgroundGlow: React.FC = () => {
  return (
 


   {/ Brilho Principal Central (Ambient Glow) */}
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
 </StyledView>

  );
};

export default BackgroundGlow;