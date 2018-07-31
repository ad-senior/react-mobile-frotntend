import React, { Component } from 'react'
// import { View, Slider, Text } from 'react-native'
import { View } from 'react-native'
import Text from './CustomText'
import Slider from "react-native-slider";
import PropTypes from 'prop-types'
import { Data } from '../Config'
import styles from './Styles/SliderRating'
import LinearGradient from 'react-native-linear-gradient'
import moodsColor from './Config/SliderRating'

class SliderRating extends Component {

  static propTypes = {
    name: PropTypes.string,
    step: PropTypes.number,
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    value: PropTypes.number,
    onValueChange: PropTypes.func,
    onSlidingComplete: PropTypes.func,
    slides: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      ratings: Data.ratings
    }
  }

  _onValueChange(val){
    this.setState({value: val})
  }

  _onSlidingComplete(val){
    this.setState({value: val})
  }

  _renderSlides(slides){
    let items = slides ? slides : this.state.ratings
    return items.map(item =>
      <Text style={styles.textStep} key={`slider-${item.name}`}>{item.name}</Text>
    )
  }

  render(){
    const { name, step, minimumValue, maximumValue, value, onValueChange, onSlidingComplete, slides } = this.props;
    let moodObj = moodsColor.filter(function(obj){ if(obj.name == name) return obj })
    let moodColor = (moodObj.length > 0) ? moodObj[0].color : '#FFFFFF'
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{name ? name : 'Rating'}</Text>
                        
        <Slider
          style={styles.sliderCustom}
          step={step ? step : 1}          
          thumbTintColor='transparent'
          thumbImage={require('../../assets/img/slider/thumb.png')}
          thumbStyle={styles.thumbCustom}
          thumbTouchSize={{width: 500, height: 500}}                  
          trackStyle={styles.trackCustom}
          minimumTrackTintColor={moodColor}
          maximumTrackTintColor={moodColor}
          minimumValue={minimumValue ? minimumValue : 1}
          maximumValue={maximumValue ? maximumValue : 5}
          value={value ? value : 3}
          onValueChange={val => onValueChange ? onValueChange(val) : this._onValueChange(val)}
          onSlidingComplete={val => onSlidingComplete ? onSlidingComplete(val) : this._onSlidingComplete(val)}
        />

        <View style={styles.sliderContainer}>
          {this._renderSlides(slides)}
        </View>
      </View>
    )
  }
}

export default SliderRating
