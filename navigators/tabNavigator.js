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

/**
 * Navigation component. (bottom tab bar)
 */
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
    // manages auto connection
    this.getToken().then((token) => {   // retrieve the token stored in the phone
      if (token !== '') {   // if the token is not blank
        verifyToken(token).then((res) => {    // check the validity of the token with the API
          if (!res.ok) {
            this.storeToken('').then(() => {});   // if the token not valid. it is deleted in the storage
          }
        });
      }
    });
    this.getToken().then((token) => {   // retrieve the token stored in the phone
      this.setApiKey(token).then(() => {});   // save the token in the redux store
    });
  }

  // Store the token in the phone storage
  async storeToken(token) {
    try {
      await AsyncStorage.setItem('global.token', token);
    } catch (error) {
      console.log('Something went wrong in storeToken,', error);
    }
  }

  //retrieve the token from the phone storage
  async getToken() {
    try {
      return await AsyncStorage.getItem('global.token');
    } catch (error) {
      console.log('Something went wrong in getToken', error);
    }
  }

  setEmail = (text) => this.setState({email: text});
  setPassword = (text) => this.setState({password: text});

  /**
   * method called when the signin btn pressed
   */
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

  // save the apiKey in the redux store
  async setApiKey(apiKey) {
    await this.props.dispatch({type: 'SETKEY', value: apiKey});
  }

  /**
   * displays errors when they occur
   *
   * @return {JSX.Element}
   */
  showError() {
    let message = <Text />;
    if (this.state.error !== '') {
      message = <Text style={styles.textError}>{this.state.error}</Text>;
    }
    return message;
  }

  /**
   * manage authentification and routing
   *
   * @return {JSX.Element}
   */
  render() {
    return !this.props.apiKey ? (   // if not connected (apikey redux store empty) render signin screen
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
    ) : (   // if connected render tab navigator
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
