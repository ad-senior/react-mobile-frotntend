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
          checked: 0
      };
  }

  onPress = item => {

      this.setState({checked: item});
      this.props.onChoose(Data.urgencyFlags[item].value);
  }

  render () {
      return (
          <View style={[styles.fullWidth, styles.flexRow]}>
              <TouchableOpacity style={[styles.button1, this.state.checked === 0 ? styles.checked : styles.unchecked]} onPress={() => this.onPress(0)}>
                  <Image style={styles.icon} source={images.iconExclamation} />
                  <Text style={styles.text1}>{Data.urgencyFlags[0].label}</Text>
              </TouchableOpacity>
              <View style={styles.separator} opacity={0.22} />
              <TouchableOpacity style={[styles.button2, this.state.checked === 1 ? styles.checked : styles.unchecked]} onPress={() => this.onPress(1)}>
                  <Image style={styles.icon} source={images.iconUserCheck} />
                  <Text style={styles.text2}>{Data.urgencyFlags[1].label}</Text>
              </TouchableOpacity>


          </View>
      );
  }
}

export default UrgencyFlag;