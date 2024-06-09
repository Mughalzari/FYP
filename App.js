import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './registration/mainNavigator';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import FlashMessage from "react-native-flash-message";
import { GlobalContextProvider } from "./context/GlobalContextProvider";
import reducer, { initState } from "./context/reducer";
import { GestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GlobalContextProvider initialState={initState} reducer={reducer}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </GlobalContextProvider>
      <FlashMessage position="top" duration={5000} hideOnPress={true} />
    </SafeAreaView>

  );
};

export default App;
