import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Data } from '../Config';
import { EventDispatcher } from '../Actions';
import { BASE_URL } from '../Config';
import Text from './CustomText'
import PropTypes from 'prop-types'
import styles from './Styles/Navbar'

class Navbar extends Component {

  static propTypes = {
    appName: PropTypes.string.isRequired,
    backMenu: PropTypes.string,
    menuID: PropTypes.number.isRequired,
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

  _searchIdByValue(careplan, _plan){
    for (var obj in careplan) {
  	  for (var mod in careplan[obj].app_model) {
        if (_plan === careplan[obj].app_model[mod]) {
          return careplan[obj].id;
        }
	    }
    }
    return '0';
  }

  _carePlanMenu(){
    //const SERV_URL = 'https://pegasus.moharadev.com/serviceuser/viewdata_mobile/'
    const SERV_URL = 'https://pegasus.bloomsupport.co/serviceuser/viewdata_mobile/'
    const { serviceUser, user_id, careplan } = this.props;
    const _plan = this.props.menuID === undefined ? '0' : Data.categories[this.props.menuID].plan;
    const _section = this._searchIdByValue(careplan, _plan);
    const url = SERV_URL + serviceUser.id + "/" + _section;
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
    user_id: state.login.user_id,
    careplan: state.daily.careplan
  };
}

export default  connect(stateToProps)(Navbar)
