import React from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStackNavigator, DetailsStackNavigator} from './stackNavigator';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTags, faCoffee} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <FontAwesomeIcon icon={faTags} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsStackNavigator}
        options={{
          tabBarIcon: ({color, focused, size}) => (
            <FontAwesomeIcon icon={faCoffee} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
