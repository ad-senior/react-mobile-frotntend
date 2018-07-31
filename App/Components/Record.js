import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Modal } from 'react-native';
import Text from './CustomText'
import { Data } from '../Config';
import PropTypes from 'prop-types';
import mainStyles from '../Themes/Styles';
import styles from './Styles/Record';

class Record extends Component {

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
    this.mic = require('../Images/Icons/icon-mic.png');
  }

  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}
        onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}>
        <View style={styles.recordContainer}>
					<Image style={styles.recordIcon} source={this.mic}/>
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
                    <Text style={styles.recordText}>Expected at 12.30</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.button, mainStyles.mt20, styles.flexRow]}
                onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}>
                <Text style={[styles.buttonText, styles.buttonRecord]}>Click to record</Text>
                <View style={[styles.buttonIconContainer, {backgroundColor: this.state.menu.color}]}>
                  <Image style={styles.recordIcon} source={this.mic}/>
                </View>
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

export default Record
