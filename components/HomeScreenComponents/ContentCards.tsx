import { router } from "expo-router";
import { ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import LiquidFillCard from "./LiquidFillCard";

type Macrotema = {
  id: string;
  nome: string;
  status: string;
  liquido_percentual: number;
};

type ContentCardsProps = {
  macrotemas: Macrotema[];
};


const ContentCards = ({macrotemas}:ContentCardsProps) => {

   const { width } = useWindowDimensions();

   const OnPress = (item) =>{
    
console.log("Clicou no card:", item.nome); // <-- Adicione isso aqui!
    router.push("/(tabs)/home/CardData")
   }

  return (
    <ScrollView
      horizontal // 1. Torna a rolagem horizontal
      showsHorizontalScrollIndicator={false} // Esconde a barra de rolagem
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: 16, // Espaçamento entre os cards
      }}
      // (Opcional) Propriedades para um efeito de carrossel suave:
      decelerationRate="fast"
      snapToInterval={(width * 0.48) + 16} // Largura do card + gap
      className="w-full"
    >

    {macrotemas.map((item) => (
        // Always include a unique 'key' for list items

        <TouchableOpacity 
          key={item.id} // A key vem para o elemento pai
          onPress={() =>  OnPress(item)} // O onPress fica aqui
          activeOpacity={0.8} // Deixa o clique um pouco mais suave
        >

          <LiquidFillCard
  
     status={item.status}
     title={item.nome}
     progress={item.liquido_percentual}
     icon={'🧠'}
     style={{ width: width * 0.48}} // 2. Trava a largura do card
   />


        </TouchableOpacity>
      
      ))}
    
        
    
    
     
    </ScrollView>
  );
};

export default ContentCards;