import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import ConsentGain from '../Components/ConsentGain';
import Mood from '../Components/Mood';
import styles from './Styles/PersonalCare'

class PersonalCare extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      consentGained: false, 
      mood: {},
    }   
  }

  _userCategory() {
    const { navigate } = this.props.navigation;
    navigate('CategoryScreen')
  }

  _onPressConsent(consent){
    this.setState({consentGained: consent});
  }

  _onPressMood(mood){
    this.setState({ mood });
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this._userCategory()}>
            <Text style={styles.menuBackArrow}>&#8592;</Text>
          </TouchableOpacity>
          <Text style={styles.appName}>DAILY NOTES</Text>
          <Text style={styles.menuHamburger}>&#9776;</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.appName}>Personal Care</Text>
        </View>
        <ConsentGain onPressConsent={this._onPressConsent.bind(this)} />
        {this.state.consentGained && <Mood onPressMood={this._onPressMood.bind(this)} />}
      </View>
    )
  }
}

export default PersonalCare
