import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ScrollView } from "react-native"
import ContentCard from "./ContentCard"


const ContentCards = ()=>{
    return (
        <ScrollView className="flex-row px-6 gap-3 h-full w-full">

            <ContentCard
            icon={
                <MaterialCommunityIcons
                name="brain"
                size={18}
                color="#a78bfa"
                />
            }
            title="Hipotálamo"
            category="Neuro"
            status="Em reforço"
            progress={60}
            /> 
             <ContentCard
            icon={
                <MaterialCommunityIcons
                name="sitemap"
                size={18}
                color="#a78bfa"
                />
            }
            title="Arquitetura de Sistemas"
            category="Sistemas"
            status="Dominado"
            progress={85}
            /> 
        </ScrollView>
    )
}

export default ContentCards