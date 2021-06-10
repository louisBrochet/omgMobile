import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';

const headerColor = '#fff';
const headerText = 'gray';

const HomeStack = createStackNavigator();

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

export {HomeStackNavigator};
