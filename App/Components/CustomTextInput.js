import React, { Component } from 'react'
import { TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import styles from './Styles/CustomText'


class CustomTextInput extends Component {

  constructor(props){
        super(props)
  }

  render () {
    return (
      <TextInput {...this.props} style={[styles.defaultText,this.props.style]}  >
        {this.props.children}
      </TextInput>
    )
  }

}

export default (CustomTextInput)
