import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import MultiMood from '../Components/MultiMood';
import Picker from '../Components/Picker';
import Checkbox from '../Components/Checkbox';
import mainStyles from '../Themes/Styles';
import styles, { pickerSelectStyles, pickerSelectBodyStyles } from './Styles/Activity';
import DateTimePicker from 'react-native-modal-datetime-picker';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityType: undefined,
      engaged: undefined,
      isValid: true,
      indoor: false,
      outdoor: false,
      suRequested: false,
      activityTypeEmpty: false,
      activityEmpty: false,
      locationEmpty: false,
      engagedEmpty: false,
      durationEmpty: false,
      requestEmpty: false,
      moodEmpty: false,
      activity: '',
      whereExactly: '',
      requestText: '',
      moods: [],
      hours: '00',
      minutes: '00',
      isDateTimePickerVisible: false,
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    const h = date.getHours();
    const m = date.getMinutes();
    const hts = h < 10 ? '0' + h.toString() : h.toString();
    const mts = m < 10 ? '0' + m.toString() : m.toString();
    this.setState({hours: hts, minutes: mts, durationEmpty: false});

    this._hideDateTimePicker();
  };

  _onPressMood(moods){
    this.setState({moods: moods, moodEmpty: false });
  }

  _showAlert(){
    Alert.alert(
      'Please complete the required information',
      '',
      [{text: 'Close', onPress: () => this.setState({isValid: true})}]
    )
  }

  _validation(){
    let activityTypeEmpty = this.state.activityTypeEmpty;
    let activityEmpty = this.state.activityEmpty;
    let locationEmpty = this.state.locationEmpty;
    let engagedEmpty = this.state.engagedEmpty;
    let durationEmpty = this.state.durationEmpty;
    let requestEmpty = this.state.requestEmpty;
    let moodEmpty = this.state.moodEmpty;
    let whereExactlyEmpty = this.state.whereExactlyEmpty;
    let isValid = this.state.isValid;

    if(!this.state.activityType){
      isValid = false;
      activityTypeEmpty = true;
    }
    if(!this.state.activity){
      isValid = false;
      activityEmpty = true;
    }
    if(!this.state.indoor && !this.state.outdoor){
      isValid = false;
      locationEmpty = true;
    }
    if(!this.state.whereExactly){
      isValid = false;
      whereExactlyEmpty = true;
    }
    if(!this.state.engaged){
      isValid = false;
      engagedEmpty = true;
    }
    if(this.state.hours === '00' && this.state.minutes === '00'){
      isValid = false;
      durationEmpty = true;
    }
    if(!this.state.requestText){
      isValid = false;
      requestEmpty = true;
    }
    if(this.state.moods.length < 1){
      isValid=false;
      moodEmpty=true;
    }

    this.setState({
      isValid: isValid,
      activityTypeEmpty: activityTypeEmpty,
      activityEmpty: activityEmpty,
      locationEmpty: locationEmpty,
      engagedEmpty: engagedEmpty,
      durationEmpty: durationEmpty,
      requestEmpty: requestEmpty,
      moodEmpty: moodEmpty,
      whereExactlyEmpty: whereExactlyEmpty
    })

    return isValid
  }

  _submitForm(){
    if(this._validation()){
      const { navigate } = this.props.navigation;
      const { serviceUser, user_id } = this.props;
      const data = {
        "activity_type": this.state.activityType,
        "activity_description": this.state.activity,
        "activity_place": this.state.indoor ? "IN" : "OUT",
        "activity_place_description": this.state.whereExactly,
        "su_engaged_with": this.state.engaged,
        "activity_duration": `${this.state.hours}:${this.state.minutes}`,
        "activity_future_request": this.state.requestText,
        "mood_1": this.state.moods[0].id,
        "rating_1": this.state.moods[0].rating,
        "su_requested_take_part_again": this.state.suRequested,
        "service_user": serviceUser.id,
        "created_by": user_id
      }

      if(this.state.moods.length > 1){
          data["mood_2"] = this.state.moods[1].id;
          data["rating_2"] = this.state.moods[1].rating;
       }

      this.props.submitActivity(data)
          .then((response) => {
            let data = response.postSuccess;
            if (data.error){
              Alert.alert(
                data.message,
                null,
                [{text: 'Close'}]
              )
            }else{
              const { navigate } = this.props.navigation;
              navigate('HomeScreen');
            }
          })
    }
  }

  _renderForm(){
    return (
      <View style={[mainStyles.mt20,mainStyles.prl20]}>
        <Picker
          style={this.state.activityTypeEmpty ? [mainStyles.pickerRequired, styles.picker] : [mainStyles.picker, styles.picker] }
          placeholder="Activity type"
          data={Data.activityTypeChoices}
          onPress={(val) => this.setState({activityType: val, activityTypeEmpty: false})}/>
        <TextInput
          style={this.state.activityEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="What activity was it?"
          onChangeText={(text) => this.setState({activity: text, activityEmpty: false})}
          value={this.state.activity}
          underlineColorAndroid='transparent'/>
        <Text style={this.state.locationEmpty ? [mainStyles.mt10, mainStyles.itemRequired] : mainStyles.mt10}>Location of activity</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({indoor: true, outdoor: false, locationEmpty: false})}
            style={this.state.indoor === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.indoor === true ? styles.textActive : styles.textInActive}>Indoor</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({outdoor: true, indoor: false, locationEmpty: false})}
            style={this.state.outdoor === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.outdoor === true ? styles.textActive : styles.textInActive}>Outdoor</Text>
            </View>
          </TouchableOpacity>
        </View>
        {(this.state.indoor || this.state.outdoor) &&
          <TextInput
            style={this.state.whereExactlyEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
            placeholder="Where exactly?"
            onChangeText={(text) => this.setState({whereExactly: text, whereExactlyEmpty: false})}
            value={this.state.whereExactly}
            underlineColorAndroid='transparent'/>
        }
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
          <Text>SU engaged in activity with</Text>
          <Picker
            styleText={this.state.engagedEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
            placeholder="who"
            data={Data.activityEngagedChoices}
            onPress={(val) => this.setState({engaged: val, engagedEmpty: false})}/>
        </View>
        <Text style={mainStyles.mt10}>Duration of activity</Text>
        <View style={[styles.inputTimeContainer]}>
          <TouchableOpacity
            style={[styles.inputTimeContainer]}
            onPress={() => this._showDateTimePicker()}>
            <Text>hr</Text>
            <TextInput
              editable={false}
              style={this.state.durationEmpty ? [styles.textInputTime, mainStyles.itemRequired] : styles.textInputTime}
              onChangeText={(text) => this.setState({hours: text, durationEmpty: false})}
              value={this.state.hours}
              underlineColorAndroid='transparent'/>
            <Text>:</Text>
            <TextInput
              editable={false}
              style={this.state.durationEmpty ? [styles.textInputTime, mainStyles.itemRequired] : styles.textInputTime}
              onChangeText={(text) => this.setState({minutes: text, durationEmpty: false})}
              value={this.state.minutes}
              underlineColorAndroid='transparent'/>
            <Text> min</Text>
          </TouchableOpacity>
          <DateTimePicker
            titleIOS={'Pick a time'}
            is24Hour={true}
            mode={'time'}
            datePickerModeAndroid={'spinner'}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
        <TextInput
          style={this.state.requestEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="Requests for future activities..."
          onChangeText={(text) => this.setState({requestText: text, requestEmpty: false})}
          value={this.state.requestText}
          underlineColorAndroid='transparent'/>
        <Checkbox 
          style={mainStyles.mt20}
          checked={this.state.suRequested}
          title="SU requested to take part again in the future"
          onPress={() => this.setState({suRequested: !this.state.suRequested})} />
        <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
        <MultiMood onPressMood={this._onPressMood.bind(this)} />
        <TouchableOpacity
          style={[mainStyles.buttonSubmit,mainStyles.mb10]}
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
          {!this.state.isValid && this._showAlert()}
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

const dispatchToProps = (dispatch) => ({
  submitActivity: (dataObj) => EventDispatcher.PostActivity(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id
  };  
}

export default connect(stateToProps, dispatchToProps)(Activity)
