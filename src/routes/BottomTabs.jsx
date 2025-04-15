import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign'; 
import Home from '../screens/Home/Home';
import Cart from '../screens/Cart/Cart';
import Wishlist from '../screens/Wishlist/Wishlist';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2E2E2E', 
          borderTopWidth: 0,
          height: 70,
          elevation: 10,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#00E676',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          textTransform: 'uppercase',
        },
        tabBarIconStyle: {
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shoppingcart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Wishlist" 
        component={Wishlist} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="hearto" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
