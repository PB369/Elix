import { Button } from '@react-navigation/elements';
import { router } from 'expo-router';
import { View } from 'react-native';


export default function CardData() {

  
  return (
    <>
    <View className="flex-1 justify-center bg-[#080510]">


    <Button onPressIn={()=> router.back()}>Back</Button>

    </View>
    </>
   
   
  );
}
