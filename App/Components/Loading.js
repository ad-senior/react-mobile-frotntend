import React, { Component } from 'react';
import { ActivityIndicator, View, Modal } from 'react-native';
import styles from './Styles/Loading';

class Loading extends Component {

  render () {
    return (
      <Modal 
        visible={this.props.visible}
        transparent={true}>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </Modal>
    )
  }
}

export default Loading
