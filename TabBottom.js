import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Weather from './Weather';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'WeatherTab') {
            iconName = focused ? 'cloud' : 'cloud-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 1.5,
          borderTopColor: 'white',
          height: 60,
        },
        tabBarActiveTintColor: 'rgba(13, 226, 214, 0.9)',
        tabBarInactiveTintColor: '#fff',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="WeatherTab"
        component={Weather}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
