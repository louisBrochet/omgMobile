import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  ToastAndroid,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {getRecentTags} from '../services/omgService';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

class ActivateSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: ['olé'],
    };
  }

  componentDidMount() {
    getRecentTags().then((res) => {
      if (res) {
        console.log('hahaha');
        this.setState({recent: res});
      } else {
        // this.toSignIn('').then(() => {});
        console.log(res);
      }
    });
  }

  async toSignIn(token) {
    await this.storeToken(token);
    await this.setApiKey(token);
  }

  setApiKey = async (apiKey) => {
    await this.props.dispatch({type: 'SETKEY', value: apiKey});
  };

  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('global.token', token);
    } catch (error) {
      console.log('Something went wrong in storeToken,', error);
    }
  };

  showRecentTags = () => {
    return (
      <View style={styles.recentView}>
        {this.state.recent.map((tag) => (
          <TouchableNativeFeedback>
            <Text style={styles.recentBtn}>{tag}</Text>
          </TouchableNativeFeedback>
        ))}
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.mainView} behavior={'height'}>
        <Text style={styles.title}>Recent tags</Text>
        {this.showRecentTags()}
        <Text style={styles.title}>Enter a tag</Text>
        <View style={styles.tagInputView}>
          <TextInput style={styles.tagInput} type="text" />
          <TouchableNativeFeedback>
            <Text style={styles.tagBtn}>ok</Text>
          </TouchableNativeFeedback>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    flex: 1,
  },
  recentView: {
    flexDirection: 'row',
  },
  recentBtn: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: '1%',
    padding: '2%',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: '3%',
    marginTop: '3%',
  },
  tagInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tagInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: '1%',
    paddingLeft: '5%',
    flex: 3,
    height: '70%',
  },
  tagBtn: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    margin: '1%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    height: '70%',
    color: '#007bff',
  },
});

const mapStateToProps = (state) => {
  return {
    apiKey: state.storeApiKey.apiKey,
  };
};

export default connect(mapStateToProps)(ActivateSheet);
