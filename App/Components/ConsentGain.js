import React, { Component } from 'react'
import { View, Text, Button } from 'react-native';
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
      <View>
        <View style={styles.panel}>
          <Button
            onPress={() => this._onPressConsent()}
            title="Consent gained"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        {
          !this.state.checked &&
            <View style={styles.panelConsent}>
              <Text style={styles.appName}>If consent has not been gained, check for DOLS.</Text>
              <Text style={styles.appName}>DON'T PROCEED WITHOUT FURTHER APPROVAL</Text>
            </View>
        }
      </View>
    )
  }
}

export default ConsentGain
