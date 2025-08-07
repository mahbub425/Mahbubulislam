import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/main/HomeScreen';
import { AddTransactionScreen } from '../screens/main/AddTransactionScreen';
import { TransactionsScreen } from '../screens/main/TransactionsScreen';
import { BudgetScreen } from '../screens/main/BudgetScreen';
import { GoalsScreen } from '../screens/main/GoalsScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="AddTransaction" 
      component={AddTransactionScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TransactionsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="TransactionsMain" 
      component={TransactionsScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="AddTransaction" 
      component={AddTransactionScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const BudgetStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="BudgetMain" 
      component={BudgetScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const GoalsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="GoalsMain" 
      component={GoalsScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileMain" 
      component={ProfileScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Budget') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          } else if (route.name === 'Goals') {
            iconName = focused ? 'flag' : 'flag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e1e5e9',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Transactions" component={TransactionsStack} />
      <Tab.Screen name="Budget" component={BudgetStack} />
      <Tab.Screen name="Goals" component={GoalsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};