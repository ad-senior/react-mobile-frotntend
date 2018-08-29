import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native';
import Text from './CustomText'
import SliderRating from './SliderRating';
import Mood from './Mood';
import { Data } from '../Config'
import PropTypes from 'prop-types'
import styles from './Styles/MultiMood'

class MultiMood extends Component {

  static propTypes = {
    onPressMood: PropTypes.func.isRequired,
    label: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      moods: [],
      secondMood: false
    }
    this.addIcon = require('../Images/Form/ic_cancel_24px.png');
  }

  _onPressMood(index, mood){
    const { onPressMood } = this.props;
    let moods = this.state.moods;
    moods[index] = mood;
    this.setState({moods: moods, moodEmpty: false });
    onPressMood(moods);
  }

  render () {
    return (
      <View style={styles.container}>
        <Mood onPressMood={this._onPressMood.bind(this, 0)} />
        {this.state.secondMood && <Mood onPressMood={this._onPressMood.bind(this, 1)} />}
        {(!this.state.secondMood) && (this.state.moods.length > 0) &&
          <TouchableOpacity
            style={[styles.flexRow, styles.alignItems]}
            onPress={() => this.setState({secondMood: true})}>
            <Image style={styles.image} source={this.addIcon}/>
            <Text>Add secondary mood</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

export default MultiMood
