import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {postSimpleTag} from '../services/omgService';

class ActivateModal extends Component {
  state = {
    modalVisible: false,
    inputTag: '',
  };

  handleText = (text) => {
    this.setState({inputTag: text});
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={styles.centeredModal}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Tag name :</Text>
              <TextInput
                onChangeText={this.handleText}
                style={styles.tagInput}
              />
              <View style={styles.modalButtons}>
                <TouchableHighlight
                  style={styles.discardBtn}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.btnDiscardText}>Discard</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.confirmBtn}
                  onPress={() => {
                    postSimpleTag(this.state.inputTag).then((res) => {
                      ToastAndroid.show(res, ToastAndroid.SHORT);
                    });
                    this.setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.btnConfirmText}>Confirm</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.textStyle}>Activate tag</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    alignSelf: 'center',
  },
  modalView: {
    marginLeft: '5%',
    marginRight: '5%',
    padding: '5%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 100,
  },
  openButton: {
    backgroundColor: '#2188fb',
    flex: 1,
    width: '100%',
    paddingTop: '4%',
    paddingBottom: '4%',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    height: '20%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  btnConfirmText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnDiscardText: {
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  confirmBtn: {
    padding: '5%',
    marginLeft: '5%',
    borderRadius: 10,
    backgroundColor: '#2188fb',
    justifyContent: 'center',
  },
  discardBtn: {
    borderRadius: 10,
    justifyContent: 'center',
  },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagInput: {
    borderColor: '#2188fb',
    borderWidth: 1,
    paddingLeft: '3%',
    color: 'gray',
    backgroundColor: 'whitesmoke',
    margin: '5%',
    borderRadius: 5,
    justifyContent: 'center',
  },
});

export default ActivateModal;
