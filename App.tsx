import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigators/TabNavigator';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={TabNavigator}></Stack.Screen>
        <Stack.Screen name="Details" component={DetailsScreen}></Stack.Screen>
        <Stack.Screen name="Payment" component={PaymentScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
