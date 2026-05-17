import { ScrollView } from "react-native";
import LiquidFillCard from "./LiquidFillCard";

const ContentCards = () => {
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
      snapToInterval={190+ 16} // Largura do card + gap
      className="w-full h-full"
    >
      <LiquidFillCard
        status="Consolidado"
        title="Neurologia"
        progress={15}
        icon={'🧠'}
        style={{ width: 190 }} // 2. Trava a largura do card
      />
      
      <LiquidFillCard
        status="Em reforço"
        title="Sistema Digestivo"
        progress={20}
        icon={'👩‍⚕️'}
        style={{ width:  190 }} // 2. Trava a largura do card
      />
            <LiquidFillCard
        status="Consolidado"
        title="Cardio"
        progress={70}
        icon={'❤️'}
        style={{ width:  190 }} // 2. Trava a largura do card
      />
      
      <LiquidFillCard
        status="Em reforço"
        title="Neurologia"
        progress={65}
        icon={'😁'}
        style={{ width:  190 }} // 2. Trava a largura do card
      />
    </ScrollView>
  );
};

export default ContentCards;