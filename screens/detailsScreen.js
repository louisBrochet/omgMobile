import React from 'react';
import 'react-native-gesture-handler';
import {View, Text, Button, StyleSheet} from 'react-native';

function DetailsScreen({navigation}) {
  return (
    <View style={styles.center}>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailsScreen;
