import React from 'react';
import 'react-native-gesture-handler';
import {View, Text, Button, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const headerColor = '#fff';
const headerText = 'gray';

function HomeScreen({navigation}) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'OMG',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerTitleStyle: {
              alignSelf: 'flex-start',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
