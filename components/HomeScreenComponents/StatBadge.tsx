import { Text, Touchable, TouchableOpacity, View } from "react-native";

const StatBadge = ({
  icon,
  value,

}: {
  icon: React.ReactNode;
  value: string;

}) => (

<TouchableOpacity 
  activeOpacity={0.7}   // ← opacidade ao pressionar: 0 = some, 1 = sem efeito
>

  <View
    className="flex-row items-center min-h-10 px-3 py-1.5 ml-3 rounded-lg border border-white/10"
    style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
  >
    {icon}
    <Text className="text-white text-sm font-semibold ml-1.5">{value}</Text>
  </View>

  </TouchableOpacity>
);

export default StatBadge