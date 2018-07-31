import React, { Component } from 'react'
// import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import MultiMood from '../Components/MultiMood';
import Picker from '../Components/Picker';
import mainStyles from '../Themes/Styles';
import styles, { pickerSelectStyles, pickerSelectBodyStyles } from './Styles/Activity';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityType: undefined,
      engaged: undefined,
      indoor: false,
      outdoor: false,
      activity: '',
      whereExactly: '',
      request: '',
      mood: [],
      hours: '00',
      minutes: '00'
    }
  }

  _onPressMood(moods){
    this.setState({moods: moods, moodEmpty: false }); 
  }

  _submitForm(){
    const { navigate } = this.props.navigation;
    navigate('CategoryScreen');
  }

  _renderForm(){
    return (
      <View style={[mainStyles.mt20,mainStyles.prl20]}>
        <Picker 
          style={mainStyles.picker}
          placeholder="Activity type"
          data={Data.optionChoices}
          onPress={(val) => this.setState({activityType: val})}/>
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="What activity was it?"
          onChangeText={(text) => this.setState({activity: text})}
          value={this.state.activity}
          underlineColorAndroid='transparent'/>
        <Text style={mainStyles.mt10}>Where activity took place?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({indoor: true, outdoor: false})}
            style={this.state.indoor === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <Text>Indoor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({outdoor: true, indoor: false})}
            style={this.state.outdoor === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <Text>Outdoor</Text>
          </TouchableOpacity>
        </View>
        {(this.state.indoor || this.state.outdoor) &&
          <TextInput
            style={[mainStyles.textInputForm, mainStyles.mt10]}
            placeholder="Where exactly?"
            onChangeText={(text) => this.setState({whereExactly: text})}
            value={this.state.whereExactly}
            underlineColorAndroid='transparent'/>
        }
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
          <Text>SU engaged in activity with</Text>
          <Picker 
            styleText={mainStyles.pickerBody}
            placeholder="who"
            data={Data.optionChoices}
            onPress={(val) => this.setState({engaged: val})}/>
        </View>
        <Text style={mainStyles.mt10}>How long activity lasted?</Text>
        <View style={[styles.inputTimeContainer]}>
          <Text>hr</Text>
          <TextInput
            style={styles.textInputTime}
            onChangeText={(text) => this.setState({hours: text})}
            value={this.state.hours}
            underlineColorAndroid='transparent'/>
          <Text>:</Text>
          <TextInput
            style={styles.textInputTime}
            onChangeText={(text) => this.setState({minutes: text})}
            value={this.state.minutes}
            underlineColorAndroid='transparent'/>
          <Text> min</Text>
        </View>
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="Request for future activities?"
          onChangeText={(text) => this.setState({request: text})}
          value={this.state.request}
          underlineColorAndroid='transparent'/>
        <Text style={mainStyles.mood}>SU mood is</Text>
        <MultiMood onPressMood={this._onPressMood.bind(this)} />
        <TouchableOpacity
          style={mainStyles.buttonSubmit}
          onPress={() => this._submitForm()}>
          <Text style={mainStyles.textSubmit}>SAVE NOTE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={mainStyles.containerForm}>
        <ScrollView>
          <View style={mainStyles.card} >
            <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={7} style={mainStyles.mt10}/>
          </View>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

export default Activity
