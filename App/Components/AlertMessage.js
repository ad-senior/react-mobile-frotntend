import React, { Component } from 'react'
import { View, Modal, TouchableOpacity } from 'react-native';
import Text from './CustomText'
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import styles from './Styles/AlertMessage';

class AlertMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  componentDidMount(){
    const { daily } = this.props;
    if(daily.fetching){
      this.setState({visible: true});
      setTimeout(() => this.setState({visible: false}), 2500);
      this.props.fetchDaily();
    }
  }

  render () {
    return (
      <Modal 
        animationType="slide"
        transparent={true}
        visible={this.state.visible}>
        {this.state.visible &&
          <TouchableOpacity
            style={styles.container}
            onPress={() => this.setState({visible: false})}>
              <View style={styles.alertContainer}>
                <View style={styles.alertBody}>
                  <Text style={styles.message}>Successfully</Text>
                </View>
              </View>
          </TouchableOpacity>
        }
      </Modal>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  fetchDaily: () => EventDispatcher.FetchDaily(dispatch),
});

const stateToProps = (state) => {
  return {
    daily: state.daily,
  };  
}

export default connect(stateToProps, dispatchToProps)(AlertMessage)
