import React, {Component} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import Text from './CustomText';
import PropTypes from 'prop-types';
import styles from './Styles/SliderOptions';

class SliderOptions extends Component {

  static propTypes = {
      data: PropTypes.number.isRequired,
      onPress: PropTypes.func.isRequired
  }

  constructor (props) {
      super(props);
      this.state = {
          checked: this.props.data[0].value
      };
  }

  onPress = item => {
      this.setState({
          checked: item.value
      });

  }


  render () {
      return (
          <FlatList
              style={styles.main}
              data={this.props.data}
              numColumns={this.props.data.length}
              extraData = {this.state}
              renderItem={({item}) =>
                  <TouchableOpacity
                      style={[styles.item, item.value === this.state.checked ? styles.checked : styles.unchecked]}
                      onPress={() => { this.onPress(item), this.props.onPress(item); }}>
                      <Text
                          style={[item.value === this.state.checked ? styles.checkedText : styles.uncheckedText]}
                      >{item.label}</Text>
                  </TouchableOpacity>
              }
          />
      );
  }
}

export default SliderOptions;
