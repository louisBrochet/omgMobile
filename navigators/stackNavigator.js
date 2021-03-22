import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import DetailsScreen from '../screens/detailsScreen';

const headerColor = '#fff';
const headerText = 'gray';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: headerColor,
        },
        headerTintColor: headerText,
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'OMG',
        }}
      />
    </HomeStack.Navigator>
  );
};

const DetailsStackNavigator = () => {
  return (
    <DetailsStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: headerColor,
        },
        headerTintColor: headerText,
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
      }}>
      <DetailsStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
          },
        }}
      />
    </DetailsStack.Navigator>
  );
};

export {HomeStackNavigator, DetailsStackNavigator};
