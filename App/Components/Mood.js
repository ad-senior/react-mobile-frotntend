import React, { Component } from 'react'
// import { View, Text, Image, TouchableOpacity } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg'
import Text from './CustomText'
import { connect } from 'react-redux'
import SliderRating from './SliderRating';
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
      moods: []
    }
  }

  componentDidMount(){
    const { moods } = this.props;
    this.setState({ moods });
  }

  _rating(item){
    const mood = {
      'id': item.id,
      'rating': 0,
      'name': item.name
    }
    this.setState({ mood });
  }

  _onSlidingComplete(val){
    const { onPressMood } = this.props;
    let mood = this.state.mood;
    mood.rating = val;
    onPressMood(mood);
  }

  _renderMood(){
    return this.state.moods.map(item =>
      <TouchableOpacity style={styles.moodContainer} onPress={() => this._rating(item)} key={`mood-${item.id}`}>
        <View style={styles.imgContainer}>
        <Image style={styles.image} source={{uri: item.image}}/>
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.mood.id ? <SliderRating name={this.state.mood.name} onSlidingComplete={this._onSlidingComplete.bind(this)} /> : this._renderMood()}
      </View>
    )
  }
}

const stateToProps = (state) => {
  return {
    moods: state.daily.moods
  };
}

export default connect(stateToProps, null)(Mood)
