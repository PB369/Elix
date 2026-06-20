import { Feather, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons"
import { Image, View } from "react-native"
import StatBadge from "./StatBadge"
import { Text } from "react-native-gesture-handler"

const Header = ()=>{
    return (
        <View className="flex-row items-center justify-between w-full px-6 pt-12 pb-6">
            {/* Logo */}
            <View className="flex-row items-center">
                <Image 
                    source={require('@/assets/images/elix-logo.png')} 
                    resizeMode="contain"
                    className="w-28 h-14"
                />
            </View>

            {/* Badges */}
            <View className="flex-row items-center">
                <StatBadge
                    icon={
                    <FontAwesome6 name="droplet" size={12} color="#a78bfa" />
                    }
                    value="250"
                />
                <StatBadge
                    icon={
                    <MaterialCommunityIcons
                        name="fire"
                        size={18}
                        color="#f97316"
                    />
                    }
                    value="14d"
                />
                {/* Google Drive Bagde */}
                <View
                    className="flex-row items-center px-2 py-1.5 rounded-full border border-white/10"
                    style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                >
                    <Text className="text-xs mr-1">🌈</Text>
                    <View
                    className="w-3.5 h-3.5 rounded-full items-center justify-center"
                    style={{ backgroundColor: "#22c55e" }}
                    >
                    <Feather name="check" size={8} color="white" />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Header