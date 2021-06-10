import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStackNavigator} from './stackNavigator';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTags, faChartArea} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';
import {connect} from 'react-redux';
import {
  StatusBar,
  TextInput,
  View,
  Text,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {signin, verifyToken} from '../services/omgService';

const Tab = createBottomTabNavigator();

class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  componentDidMount() {
    this.getToken().then((token) => {
      if (token !== '') {
        verifyToken(token).then((res) => {
          if (!res.ok) {
            this.storeToken('').then(() => {});
          } else {
            console.log(token);
          }
        });
      }
    });
    this.getToken().then((token) => {
      this.setApiKey(token).then(() => {});
    });
  }

  async storeToken(token) {
    try {
      await AsyncStorage.setItem('global.token', token);
    } catch (error) {
      console.log('Something went wrong in storeToken,', error);
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem('global.token');
    } catch (error) {
      console.log('Something went wrong in getToken', error);
    }
  }

  setEmail = (text) => this.setState({email: text});
  setPassword = (text) => this.setState({password: text});

  handleSignIn = () => {
    Keyboard.dismiss();
    if (this.state.email !== '' && this.state.password !== '') {
      signin(this.state.email, this.state.password).then((res) => {
        if (res.status === 'ok') {
          console.log(res.token);
          this.setApiKey(res.token).then(() => {
            this.storeToken(res.token).then(() => {
              this.setState({email: '', password: '', error: ''});
            });
          });
        } else {
          this.setState({error: res.message});
        }
      });
    } else {
      this.setState({error: 'Missing email and/or password'});
    }
  };

  async setApiKey(apiKey) {
    await this.props.dispatch({type: 'SETKEY', value: apiKey});
  }

  showError() {
    let message = <Text />;
    if (this.state.error !== '') {
      message = <Text style={styles.textError}>{this.state.error}</Text>;
    }
    return message;
  }

  render() {
    return !this.props.apiKey ? (
      <View style={styles.containerSignIn}>
        <StatusBar barStyle="light-content" backgroundColor="#007bff" />
        <KeyboardAvoidingView style={styles.containerKeyboard} behavior={''}>
          <View style={styles.containerBrand}>
            <FontAwesomeIcon
              icon={faChartArea}
              size={40}
              style={styles.logoBrand}
              color={'white'}
            />
            <Text style={styles.textBrand}>OMG </Text>
          </View>
          <View style={styles.cardSignIn}>
            <Text style={styles.cardTitle}>Sign In</Text>
            <TextInput
              type="email"
              id="exampleInputEmail"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChangeText={this.setEmail}
              style={styles.inputSignIn}
            />
            <TextInput
              type="password"
              secureTextEntry={true}
              id="exampleInputPassword"
              placeholder="Password"
              onChangeText={this.setPassword}
              style={styles.inputSignIn}
            />
            {this.showError()}
            <TouchableNativeFeedback onPress={this.handleSignIn}>
              <Text style={styles.btnSignIn}>Sign In</Text>
            </TouchableNativeFeedback>
          </View>
        </KeyboardAvoidingView>
      </View>
    ) : (
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
      </Tab.Navigator>
    );
  }
}

const styles = {
  containerSignIn: {
    backgroundColor: '#007bff',
  },
  containerKeyboard: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  containerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  logoBrand: {
    marginRight: '1%',
  },
  textBrand: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  cardSignIn: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginLeft: '5%',
    marginRight: '5%',
    padding: '5%',
    borderRadius: 8,
    marginTop: '20%',
  },
  cardTitle: {
    fontSize: 30,
    marginBottom: '10%',
  },
  inputSignIn: {
    marginBottom: '5%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  btnSignIn: {
    backgroundColor: '#007bff',
    color: 'white',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '3%',
    marginTop: '2%',
    alignSelf: 'center',
    borderRadius: 8,
    fontSize: 18,
  },
  textError: {
    color: '#dc3545',
  },
};

const mapStateToProps = (state) => {
  return {
    apiKey: state.storeApiKey.apiKey,
  };
};

export default connect(mapStateToProps)(TabNavigator);
