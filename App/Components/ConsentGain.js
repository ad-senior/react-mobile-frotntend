import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import Text from './CustomText'
import Checkbox from './Checkbox';
import PropTypes from 'prop-types'
import styles from './Styles/ConsentGain'

class ConsentGain extends Component {

  static propTypes = {
    onPressConsent: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }
  }

  _onPressConsent(){
    const { onPressConsent } = this.props;
    this.setState({checked: true});
    onPressConsent(true);
  }

  render () {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={() => this._onPressConsent()}>
        <View style={this.state.checked ? styles.panelActive : styles.panel}>
          <Checkbox title="Has consent been gained?" checked={this.state.checked} onPress={() => this._onPressConsent()}/>
        </View>
        {
          !this.state.checked &&
          <View>
            <View style={styles.panelConsent}>
              <Text style={styles.text}>If consent has not been gained, check for DOLS.</Text>
            </View>
            <View style={styles.panelConsent}>
              <Text style={styles.text}>DON'T PROCEED WITHOUT FURTHER APPROVAL</Text>
            </View>
          </View>
        }
      </TouchableOpacity>
    )
  }
}

export default ConsentGain
