import React, { Component } from 'react';
import { ActivityIndicator, View, Modal } from 'react-native';
import styles from './Styles/Loading';

class Loading extends Component {

  _closeModal() {
      setState({
          modalVisible: false
      });
  }

  render () {

    return (
      <Modal 
        visible={this.props.visible}
        onRequestClose={() => this._userLogin()}
        transparent={true}>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </Modal>
    )
  }
}

export default Loading
