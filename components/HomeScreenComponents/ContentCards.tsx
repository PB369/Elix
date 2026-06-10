import { ScrollView, useWindowDimensions } from "react-native";
import LiquidFillCard from "./LiquidFillCard";
import json from "../../app/Data/data.json"


console.log(json["macrotemas"])
const json1 = json.macrotemas
console.log(json1)

const ContentCards = () => {

   const { width } = useWindowDimensions();
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
      className="w-full h-full"
    >

    {json1.map((item) => (
        // Always include a unique 'key' for list items
             <LiquidFillCard
        status={item.status_consolidacao}
        title={item.nome}
        progress={50}
        icon={'🧠'}
        style={{ width: width * 0.48}} // 2. Trava a largura do card
      />
      
      ))}
    
        
    
    
     
    </ScrollView>
  );
};

export default ContentCards;