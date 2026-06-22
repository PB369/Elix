import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {





  return (
    // 1. O GestureHandlerRootView DEVE ter flex: 1
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 2. O BottomSheetModalProvider engloba o Stack */}
      <BottomSheetModalProvider>
        
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="AddSubject" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="signUp" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
  
  // return (

    
  //   <Stack screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="index" />
  //     <Stack.Screen name="welcome" />
  //     <Stack.Screen name="signUp" />
  //     <Stack.Screen name="(tabs)" />
  //   </Stack>
  // );
}