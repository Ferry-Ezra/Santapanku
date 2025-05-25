import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';  // <--- import yang benar untuk non-expo
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack khusus untuk Home + Detail
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Beranda' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detail Makanan' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator utama
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'home-outline';
          } else if (route.name === 'Order') {
            iconName = 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4e7fff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // supaya header dari stack muncul, bukan tab navigator
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ tabBarLabel: 'Beranda' }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{ tabBarLabel: 'Pesanan' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
}
