import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs'; 
import Splash from '../screens/Splash/Splash';
import Login from '../screens/Login/Login';
import Cart from '../screens/Cart/Cart';
import Details from '../screens/Details/Details';
import Wishlist from '../screens/Wishlist/Wishlist';

const Stack = createNativeStackNavigator(); 

const StackRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
    </Stack.Navigator>
  );
};

export default StackRoute;
