import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
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
    this.menuImage = require('../Images/Navbar/hamburger.png');
  }

  _backMenu(){
    const { navigate } = this.props.navigation;
    navigate(this.props.backMenu);
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => this._backMenu()}>
          {this.props.backMenu &&
            <Image style={styles.menuImage} source={this.arrowImage}/>
          }
        </TouchableOpacity>
        <Text style={[styles.appName, styles.menuText]}>{this.props.appName}</Text>
        <Image style={styles.menuImage} source={this.menuImage}/>
      </View>
    )
  }
}

export default Navbar
