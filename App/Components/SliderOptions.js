import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from './CustomText';
import PropTypes from 'prop-types';
import styles from './Styles/SliderOptions';

class SliderOptions extends Component {

  static propTypes = {
      data: PropTypes.array.isRequired,
      onPress: PropTypes.func.isRequired
  }

  constructor (props) {
      super(props);
      this.state = {
          checked: 0
      };
  }

  onPress = item => {
      this.setState({
          checked: item
      });

  }


  render () {
      return (
          <View style={styles.main}>
              <TouchableOpacity
                  style={[styles.item, 0 === this.state.checked ? styles.checked : styles.unchecked]}
                  onPress={() => { this.onPress(0), this.props.onPress(this.props.data[0]); }}>
                  <Text
                      style={[0 === this.state.checked ? styles.checkedText : styles.uncheckedText]}
                  >{this.props.data[0].label}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[styles.item, 1 === this.state.checked ? styles.checked : styles.unchecked]}
                  onPress={() => { this.onPress(1), this.props.onPress(this.props.data[1]); }}>
                  <Text
                      style={[1 === this.state.checked ? styles.checkedText : styles.uncheckedText]}
                  >{this.props.data[1].label}</Text>
              </TouchableOpacity>
          </View>
      );
  }
}

export default SliderOptions;
