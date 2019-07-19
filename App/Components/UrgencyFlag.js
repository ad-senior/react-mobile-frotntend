import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from '../Components/CustomText';
import PropTypes from 'prop-types';
import styles from './Styles/UrgencyFlag';
import Data from '../Config/MockData';
import images from '../Themes/Images';
class UrgencyFlag extends Component {

  static propTypes = {
      onChoose: PropTypes.func.isRequired,
  }

  constructor (props) {
      super(props);
      this.state = {
          checkedManagment: true,
          checkedHangover: false
      };
  }

  onPress = item => {
      let data = "", self = this;
      if(item == Data.urgencyFlags[0].value) {
        this.setState({
            checkedManagment: !this.state.checkedManagment
        });
      }
      if(item == Data.urgencyFlags[1].value) {
        this.setState({
            checkedHangover: !this.state.checkedHangover
        });
      }
      setTimeout(()=> {
        if(self.state.checkedManagment) {
            data += Data.urgencyFlags[0].value + ",";
        }
        if(self.state.checkedHangover) {
            data += Data.urgencyFlags[1].value;
        }
        self.props.onChoose(data);
      }, 50);
  }

  render () {
      return (
          <View style={[styles.fullWidth, styles.flexRow]}>
              <TouchableOpacity style={[styles.button1, this.state.checkedManagment ? styles.checked : styles.unchecked]} onPress={() => this.onPress(Data.urgencyFlags[0].value)}>
                  <Image style={styles.icon} source={images.iconExclamation} />
                  <Text style={styles.text1}>{Data.urgencyFlags[0].label}</Text>
              </TouchableOpacity>
              <View style={styles.separator} opacity={0.22} />
              <TouchableOpacity style={[styles.button2, this.state.checkedHangover ? styles.checked : styles.unchecked]} onPress={() => this.onPress(Data.urgencyFlags[1].value)}>
                  <Image style={styles.icon} source={images.iconUserCheck} />
                  <Text style={styles.text2}>{Data.urgencyFlags[1].label}</Text>
              </TouchableOpacity>


          </View>
      );
  }
}

export default UrgencyFlag;