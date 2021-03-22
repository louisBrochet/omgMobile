import React from 'react';
import 'react-native-gesture-handler';
import {View, StatusBar, StyleSheet} from 'react-native';
import ActivateModal from './activateModal';

function HomeScreen({navigation}) {
  return (
    <View style={styles.view}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ActivateModal />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default HomeScreen;
