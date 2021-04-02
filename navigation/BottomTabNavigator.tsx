import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ReadQRScreen from '../screens/ReadQRScreen';
import ListQRScreen from '../screens/ListQRScreen';
import { BottomTabParamList, ReadQRParamList, ListQRParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const tabBackgroundColor = colorScheme === 'dark' ? '#0D1117' : '#FFFFFF';
  const tabIconColor = colorScheme === 'dark' ? '#F8A728' : '#1167B1';
  const tabLabelColor = colorScheme === 'dark' ? '#FFFFFF' : '#000';
  const tabActiveBackgroundColor = colorScheme === 'dark' ? '#080a0e' : '#e6e6e6';

  return (
    <BottomTab.Navigator
      initialRouteName='ReadQR'
      tabBarOptions={{
        activeBackgroundColor: tabActiveBackgroundColor,
        activeTintColor: tabLabelColor,
        inactiveTintColor: tabLabelColor,
        labelPosition: 'below-icon',
        style: { backgroundColor: tabBackgroundColor, height: 65 },
        labelStyle: {
          fontSize: 12,
          paddingTop: 2,
          paddingBottom: 5,
        },
      }}
    >
      <BottomTab.Screen
        name='ReadQR'
        component={ReadQRNavigator}
        options={{
          tabBarLabel: 'Read QR',
          tabBarIcon: () => <TabBarIcon name='qrcode-scan' color={tabIconColor} />,
        }}
      />
      <BottomTab.Screen
        name='ListQR'
        component={ListQRNavigator}
        options={{
          tabBarLabel: 'List QR',
          tabBarIcon: () => <TabBarIcon name='format-list-text' color={tabIconColor} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ReadQRStack = createStackNavigator<ReadQRParamList>();

function ReadQRNavigator() {
  return (
    <ReadQRStack.Navigator>
      <ReadQRStack.Screen name='ReadQRScreen' component={ReadQRScreen} options={{ headerTitle: 'Read QR code' }} />
    </ReadQRStack.Navigator>
  );
}

const ListQRStack = createStackNavigator<ListQRParamList>();

function ListQRNavigator() {
  return (
    <ListQRStack.Navigator>
      <ListQRStack.Screen name='ListQRScreen' component={ListQRScreen} options={{ headerTitle: 'List QR code' }} />
    </ListQRStack.Navigator>
  );
}
