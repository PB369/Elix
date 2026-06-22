import { Text, Touchable, TouchableOpacity, View } from "react-native";

const StatBadge = ({
  icon,
  value,
  OnPress,

}: {
  icon: React.ReactNode;
  value: string;
  OnPress:()=>void

}) => (

<TouchableOpacity 
onPress={OnPress}
  activeOpacity={0.7}   // ← opacidade ao pressionar: 0 = some, 1 = sem efeito
>

  <View
    className="flex-row items-center min-h-10  ml-3 rounded-lg shadow-md shadow-red/50"
   
  >
    {icon}
    <Text className="text-white text-md font-semibold ml-1.5">{value}</Text>
  </View>

  </TouchableOpacity>
);

export default StatBadge