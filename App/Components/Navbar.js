import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { EventDispatcher } from '../Actions';
import Text from './CustomText'
import PropTypes from 'prop-types'
import styles from './Styles/Navbar'

class Navbar extends Component {

  static propTypes = {
    appName: PropTypes.string.isRequired,
    backMenu: PropTypes.string,
  }

  constructor(props){
    super(props);
    this.arrowImage = require('../Images/Navbar/icon-arrow-left.png');
    this.menuImage = require('../Images/Navbar/test_note_icon.png');
  }

  _backMenu(){
    const { navigate } = this.props.navigation;
    navigate(this.props.backMenu);
  }

  _carePlanMenu(){
    const { serviceUser, user_id } = this.props;
    const url = "http://pegasus.moharadev.com/serviceuser/viewdata/" + serviceUser.id;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => this._backMenu()}>
          {this.props.backMenu &&
            <Image style={styles.menuImage} source={this.arrowImage}/>
          }
        </TouchableOpacity>
        <Text style={[styles.appName, styles.menuText , this.props.style]}>{this.props.appName}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => this._carePlanMenu()}>
          {this.props.backMenu &&
            <Image style={styles.menuCarePlan} source={this.menuImage}/>
          }
        </TouchableOpacity>
      </View>
    )
  }
}

const stateToProps = (state) => {
  return {
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id
  };
}

export default  connect(stateToProps)(Navbar)
