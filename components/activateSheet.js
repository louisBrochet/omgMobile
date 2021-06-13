import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import {getRecentTags, postSimpleTag} from '../services/omgService';
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';

/**
 * activation tag menu. Display activation tag menu
 */
class ActivateSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: [],   // array for recent tags
      date: new Date(Date.now()),   // date to initialize datepicker
      tag: '',  // save chosen tag
    };
  }

  // when component is loaded, retrieves recent tags
  componentDidMount() {
    getRecentTags().then((res) => {
      if (res) {
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

  /**
   * Displays recent tags
   *
   * @return {JSX.Element}
   */
  showRecentTags = () => {
    if (this.state.recent.length > 0) {
      let recentButtons = this.state.recent.map((tag) => (
        <TouchableNativeFeedback onPress={this.onRecentTagPressed}>
          <Text id={tag} style={styles.recentBtn}>
            {tag}
          </Text>
        </TouchableNativeFeedback>
      ));
      return <View style={styles.recentView}>{recentButtons}</View>;
    } else {
      return (
        <View style={styles.recentView}>
          <Text style={styles.noRecentText}>No tag previously activated.</Text>
        </View>
      );
    }
  };

  onDateChange = (event) => {
    console.log(event);
    this.setState({date: event});
  };

  onManualTagChange = (event) => {
    this.setState({tag: event.nativeEvent.text});
  };

  onRecentTagPressed = (event) => {
    console.log(event);
  };

  /**
   * Manage insert activation tag request. called when activate tag btn pressed
   */
  activateTag = () => {
    if (this.state.tag) {
      postSimpleTag(this.state.tag, this.state.date).then((r) => {
        ToastAndroid.show(r, ToastAndroid.SHORT);
      });
    } else {
      ToastAndroid.show('You have to choose a tag !', ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.title}>Choose tag</Text>
        <Text style={styles.title2}>Recent tags</Text>
        {this.showRecentTags()}
        <Text style={styles.title2}>Enter a tag</Text>
        <View style={styles.tagInputView}>
          <TextInput
            style={styles.tagInput}
            type="text"
            onChange={this.onManualTagChange}
          />
        </View>
        <Text style={styles.titleBis}>Select date</Text>
        <View style={styles.datetimePicker}>
          <DatePicker
            date={this.state.date}
            onDateChange={this.onDateChange}
            androidVariant={'nativeAndroid'}
          />
        </View>
        <TouchableNativeFeedback onPress={this.activateTag}>
          <Text style={styles.activateBtn}>Activate tag</Text>
        </TouchableNativeFeedback>
      </View>
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
    marginTop: '3%',
    fontWeight: 'bold',
  },
  titleBis: {
    color: 'white',
    fontSize: 20,
    marginTop: '3%',
    marginBottom: '3%',
    fontWeight: 'bold',
  },
  title2: {
    color: 'white',
    fontSize: 16,
    marginBottom: '1%',
    marginLeft: '1%',
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
  activateBtn: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: '10%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    padding: '2%',
    height: '8%',
    alignSelf: 'center',
    color: '#007bff',
  },
  noRecentText: {
    color: 'white',
    marginLeft: '1%',
  },
  datetimePicker: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    apiKey: state.storeApiKey.apiKey,
  };
};

export default connect(mapStateToProps)(ActivateSheet);
