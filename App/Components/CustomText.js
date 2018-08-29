import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import styles from './Styles/CustomText'


class CustomText extends Component {

  constructor(props){
        super(props)
  }

  render () {
    return (
      <Text style={[styles.defaultText,this.props.style]}>
        {this.props.children}
      </Text>
    )
  }

}

export default (CustomText)
