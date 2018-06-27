import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import SliderRating from './SliderRating';
import { Data } from '../Config'
import PropTypes from 'prop-types'
import styles from './Styles/Mood'

class Mood extends Component {

  static propTypes = {
    onPressMood: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      mood: {},
      moods: Data.moods
    }
  }

  _rating(mood){
    this.setState({ mood });
  }

  _onSlidingComplete(val){
    const { onPressMood } = this.props;
    let mood = this.state.mood;
    mood.rating = val;
    onPressMood(mood);
  }

  renderMood(){
    return this.state.moods.map(item =>
      <TouchableOpacity style={styles.moodContainer} onPress={() => this._rating(item)} key={`mood-${item.id}`}>
        <Image style={styles.image} source={item.image}/>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.mood.id ? <SliderRating name={this.state.mood.name} onSlidingComplete={this._onSlidingComplete.bind(this)} /> : this.renderMood()}
      </View>
    )
  }
}

export default Mood
