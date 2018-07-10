import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { Data } from '../Config';
import PropTypes from 'prop-types';
import mainStyles from '../Themes/Styles';
import styles from './Styles/Postpone';

class Postpone extends Component {

  static propTypes = {
    menuID: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      menuID: this.props.menuID,
      menu: Data.categories[this.props.menuID],
      modalVisible: false
    }
    this.history = require('../Images/Icons/icon-history.png');
  }

  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}
        onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}>
        <View style={styles.postponeContainer}>
					<Image style={styles.postponeIcon} source={this.history}/>
					<Text style={styles.postponeText}>POSTPONE</Text>
				</View>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <View style={styles.flexRow}>
                <View style={[styles.separated, {backgroundColor: this.state.menu.color}]}></View>
                <View style={styles.flexOne}>
                  <View style={styles.menu}>
                    <View style={[styles.menuIconContainer, {backgroundColor: this.state.menu.color}]}>
                      <Image style={styles.menuIcon} source={this.state.menu.icon}/>
                    </View>
                    <Text style={[styles.menuText, mainStyles.ml10]}>{this.state.menu.name}</Text>
                  </View>
                  <View style={styles.menu}>
                    <Text style={styles.postponeText}>Expected at 12.30</Text>
                  </View>
                </View>
              </View>
              <Text numberOfLines={3} style={[styles.title, mainStyles.mt20]}>This note will be postponed 10 mins from now</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonPostpone, mainStyles.mt20]}
                onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}>
                <Text style={[styles.buttonText , styles.textPostpone]}>POSTPONE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, mainStyles.mt20]}
                onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}>
                <Text style={styles.buttonText}>TAKE note now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}

export default Postpone
