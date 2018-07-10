import React, { Component } from 'react'
import { View, Text, Image } from 'react-native';
import { Data } from '../Config';
import PropTypes from 'prop-types';
import mainStyles from '../Themes/Styles';
import styles from './Styles/TitleForm';

class TitleForm extends Component {

  static propTypes = {
    menuID: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      menuID: this.props.menuID,
      menu: Data.categories[this.props.menuID],
    }
  }

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[styles.menuIconContainer, {backgroundColor: this.state.menu.color}]}>
          <Image style={styles.menuIcon} source={this.state.menu.icon}/>
        </View>
        <Text style={[styles.menuText, mainStyles.ml10, {color: this.state.menu.color}]}>{this.state.menu.name}</Text>
      </View>
    )
  }
}

export default TitleForm
