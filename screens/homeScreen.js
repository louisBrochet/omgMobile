import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ActivateSheet from '../components/activateSheet';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';

function HomeScreen({navigation: {navigate}}) {
  const sheetRef = React.useRef(null);
  let tgl = 0;

  const toggleSheet = () => {
    if (tgl) {
      tgl--;
    } else {
      tgl++;
    }
    sheetRef.current.snapTo(tgl);
  };

  const renderContent = () => (
    <View style={styles.bottomSheet}>
      <TouchableNativeFeedback onPress={toggleSheet}>
        <Text style={styles.tglBtnSheet}>Activate tag</Text>
      </TouchableNativeFeedback>
      <View style={styles.hr} />
      <ActivateSheet navigate={navigate} />
    </View>
  );

  return (
    <View style={styles.view}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.contentView} />
      <BottomSheet
        ref={sheetRef}
        snapPoints={['8%', '80%']}
        renderContent={renderContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: '#007bff',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
  },
  contentView: {
    height: '100%',
    width: '100%',
  },
  tglBtnSheet: {
    color: 'white',
    marginTop: '2%',
    fontSize: 25,
    width: '100%',
    height: '10%',
    textAlign: 'center',
  },
  hr: {
    height: 1,
    backgroundColor: 'white',
    width: '60%',
    marginTop: '2%',
  },
});

export default HomeScreen;
// #007bff
