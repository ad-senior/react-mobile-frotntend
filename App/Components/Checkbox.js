import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from './CustomText';
import PropTypes from 'prop-types';
import styles from './Styles/Checkbox';

class Checkbox extends Component {

  static propTypes = {
      checked: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
  }

  render () {
      return (
          <TouchableOpacity
              onPress={() => this.props.onPress()}
              style={[styles.container, this.props.style]}>
              <View style={this.props.checked ? styles.borderParentChecked : styles.borderParent}>
                  <View style={this.props.checked ? [styles.border, styles.bgActive] : styles.border}>
                  </View>
              </View>
              { this.props.isRedText &&
                <View style={styles.title}>
                    <Text style={styles.titleRedActive}>{this.props.title} wew</Text>
                </View>
              }
              { !this.props.isRedText &&
                <View style={styles.title}>
                    <Text style={this.props.checked && styles.titleActive}>{this.props.title}</Text>
                </View>
              }
          </TouchableOpacity>
      );
  }
}

export default Checkbox;
