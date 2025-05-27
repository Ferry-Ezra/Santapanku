import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';
import FormScreen from '../screens/FormScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Santapanku' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Makanan' }} />
      <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Tambah Data Makanan' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') iconName = 'home-outline';
          else if (route.name === 'Order') iconName = 'cart-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4e7fff',
        tabBarInactiveTintColor: 'gray',
        headerShown: route.name !== 'HomeStack',  
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ tabBarLabel: 'Beranda' }} />
      <Tab.Screen name="Order" component={OrderScreen} options={{ tabBarLabel: 'Pesanan' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />
    </Tab.Navigator>
  );
}

