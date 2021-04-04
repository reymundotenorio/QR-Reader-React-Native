/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

  const { tabBackgroundColor } = Colors[colorScheme];
  const { tabActiveColor } = Colors[colorScheme];
  const { tabInactive } = Colors[colorScheme];
  // const tabActiveBackgroundColor = Colors[colorScheme].tabActiveBackgroundColor;

  return (
    <BottomTab.Navigator
      initialRouteName="ReadQR"
      tabBarOptions={{
        // activeBackgroundColor: tabActiveBackgroundColor,
        activeTintColor: tabActiveColor,
        inactiveTintColor: tabInactive,
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
        name="ReadQR"
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        component={ReadQRNavigator}
        options={{
          tabBarLabel: 'Read QR',
          tabBarIcon: ({ focused }) => (
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            <TabBarIcon
              name="qrcode-scan"
              color={focused ? tabActiveColor : tabInactive}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ListQR"
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        component={ListQRNavigator}
        options={{
          tabBarLabel: 'List QR',
          tabBarIcon: ({ focused }) => (
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            <TabBarIcon
              name="format-list-text"
              color={focused ? tabActiveColor : tabInactive}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ReadQRStack = createStackNavigator<ReadQRParamList>();

function ReadQRNavigator() {
  const colorScheme = useColorScheme();
  const tabBackgroundColor = colorScheme === 'dark' ? '#0D1117' : '#FFFFFF';

  return (
    <ReadQRStack.Navigator>
      <ReadQRStack.Screen
        name="ReadQRScreen"
        component={ReadQRScreen}
        options={{
          headerTitle: 'Read QR code',
          headerStyle: { backgroundColor: tabBackgroundColor },
        }}
      />
    </ReadQRStack.Navigator>
  );
}

const ListQRStack = createStackNavigator<ListQRParamList>();

function ListQRNavigator() {
  const colorScheme = useColorScheme();
  const tabBackgroundColor = colorScheme === 'dark' ? '#0D1117' : '#FFFFFF';

  return (
    <ListQRStack.Navigator>
      <ListQRStack.Screen
        name="ListQRScreen"
        component={ListQRScreen}
        options={{
          headerTitle: 'List QR code',
          headerStyle: { backgroundColor: tabBackgroundColor },
        }}
      />
    </ListQRStack.Navigator>
  );
}
