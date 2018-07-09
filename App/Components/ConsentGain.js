import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
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
          <Checkbox title="Consent gained" checked={this.state.checked} onPress={() => this._onPressConsent()}/>
        </View>
        {
          !this.state.checked &&
            <View style={styles.panelConsent}>
              <Text style={styles.text}>If consent has not been gained, check for DOLS.</Text>
              <Text style={styles.text}>DON'T PROCEED WITHOUT FURTHER APPROVAL</Text>
            </View>
        }
      </TouchableOpacity>
    )
  }
}

export default ConsentGain
