import { Button } from '@react-navigation/elements';
import { router } from 'expo-router';
import { View } from 'react-native';


export default function CardData() {

  
  return (
    <>
    <View style={{flex:1, justifyContent:"center"}}>


    <Button onPressIn={()=> router.back()}>Back</Button>

    </View>
    </>
   
   
  );
}
