import React, { Component } from 'react'
import { View, ScrollView, Slider, TouchableOpacity, Alert,Modal,AsyncStorage } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import Geolocation from '../Components/Geolocation';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import MultiMood from '../Components/MultiMood';
import Picker from '../Components/Picker';
import Checkbox from '../Components/Checkbox';
import mainStyles from '../Themes/Styles';
import styles from './Styles/Activity';
import { Picker as TimePicker  } from 'react-native-wheel-datepicker';



import MultiOptionText from '../Components/MultiOptionText';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.minutes = [];
    for (min = 0; min < 60; min++)
      this.minutes.push(min<10? "0"+min.toString():min.toString());
    this.state = {
      activityType: undefined,
      engaged: undefined,
      isValid: true,
      indoor: false,
      outdoor: false,
      suRequested: false,
      activityPlaceDescription:undefined,
      activityPlaceDescriptionEmpty:false,
      activityTypeEmpty: false,
      activityEmpty: false,
      locationEmpty: false,
      engagedEmpty: false,
      durationEmpty: false,
      requestEmpty: false,
      moodEmpty: false,
      activity: '',
      requestText: '',
      moods: [],
      duration: '00:00',
      hours: "00",
      minutes:"00",
      durationText:"0hr 0 min",
      durationString: 0,
      isDateTimePickerVisible: false,
      location: [null, null],
      notesThoughts: ''
    }
  }

  _handleDatePicked = (h, m) => {
    m = h == 10 ? 0 : m;
    const hts = h < 10 ? '0' + h.toString() : h.toString();
    const mts =  m < 10 ? '0' + m.toString() : m.toString();
    
    var numberAsInt = h*60+m;
      this.setState({duration: `${hts}:${mts}`,durationText: `${h}hr ${m} min`, hours:hts,minutes:mts, durationEmpty: false, durationString:numberAsInt});
      
    

  };
  componentDidMount=()=>{ 
    AsyncStorage.setItem("IsReview","False")
  }
  
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

  _getLocation = (loc) => {
    this.setState({location: loc});
  }

  _validation(){
    let activityTypeEmpty = this.state.activityTypeEmpty;
    let activityEmpty = this.state.activityEmpty;
    let locationEmpty = this.state.locationEmpty;
    let engagedEmpty = this.state.engagedEmpty;
    let durationEmpty = this.state.durationEmpty;
    let requestEmpty = this.state.requestEmpty;
    let moodEmpty = this.state.moodEmpty;
    let isValid = this.state.isValid;
    let activityPlaceDescriptionEmpty = this.state.activityPlaceDescriptionEmpty;
    if(!this.state.activityType){
      isValid = false;
      activityTypeEmpty = true;
    }
    if(!this.state.activity){
      isValid = false;
      activityEmpty = true;
    }
    if(!this.state.activityPlaceDescription){
      isValid = false;
      activityPlaceDescriptionEmpty = true;
    }
    if(!this.state.indoor && !this.state.outdoor){
      isValid = false;
      locationEmpty = true;
    }
    if(!this.state.engaged){
      isValid = false;
      engagedEmpty = true;
    }
    if(this.state.duration === '00:00'){
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
      activityPlaceDescriptionEmpty:activityPlaceDescriptionEmpty
    })

    return isValid
  }

  _submitForm(){
    if(this._validation()){
      const { serviceUser, user_id } = this.props;
      const data = {
        "activity_type": this.state.activityType,
        "activity_description": this.state.activity,
        "activity_place": this.state.indoor ? "IN" : "OUT",
        "activity_place_description": this.state.activityPlaceDescription,
        "su_engaged_with": this.state.engaged,
        "activity_duration": this.state.duration,
        "activity_future_request": this.state.requestText,
        "mood_1": this.state.moods[0].id,
        "rating_1": this.state.moods[0].rating,
        "su_requested_take_part_again": this.state.suRequested,
        "service_user": serviceUser.id,
        "created_by": user_id,
        "location": this.state.location,
        'notes_and_thoughts': this.state.notesThoughts
      }

      if(this.state.moods.length > 1){
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }

      keywords = []
      keywords.activityTypeText = this.state.activityTypeText
      keywords.indoor = this.state.indoor ? "indoor" : "outdoor"
      keywords.engagedText = this.state.engagedText
      keywords.requested = this.state.suRequested ? "requested" : "did not request"
      
      const { navigate } = this.props.navigation;
        AsyncStorage.getItem("IsReview").then((value) => {
          if (value == "True") {
            navigate('ActivityReview', {message: 'Activity', data, keywords});
          }else{
            this.props.submitActivity(data)
              .then((response) => {
                let data = response.postSuccess;
                if (data.error){
                  Alert.alert(
                    JSON.stringify(data.message),
                    null,
                    [{text: 'Close'}]
                  )
                } else {
                  navigate('ActivityReview', {message: 'Activity', data, keywords});
                  AsyncStorage.setItem("ReviewID", data.id.toString());
                }
              })
          }
        }).done()
      
    }
  }

  _renderForm(){
    return (
      <View style={[mainStyles.mt20,mainStyles.prl20]}>
        <View style={[mainStyles.mt10]}>
          <Picker
            hasShadow={true}
            shadowColor="#0066FF"
            style={this.state.activityTypeEmpty ? [mainStyles.pickerRequired, styles.picker] : [mainStyles.picker, styles.picker] }
            placeholder="Activity type"
            data={Data.activityTypeChoices}
            pickerBinder={true}
            onSelectLabel={(val) => { this.setState({ activityTypeText: val }) }}
            onPress={(val) => this.setState({activityType: val, activityTypeEmpty: false})}/>
        </View>
        <View style={[mainStyles.mt20]}>
          <TextInput
            style={this.state.activityEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
            multiline={true}
            numberOfLines={1}
            placeholder="What activity was it?"
            onChangeText={(text) => this.setState({activity: text, activityEmpty: false})}
            value={this.state.activity}
            underlineColorAndroid='transparent'/>
        </View>
        <View style={[mainStyles.mt30,mainStyles.mh10]}>
          <Text style={this.state.locationEmpty ? [mainStyles.mt10, mainStyles.itemRequired, mainStyles.textQuestion] : [mainStyles.mt10, mainStyles.textQuestion]}>
            Location of activity
          </Text>
          <View style={[mainStyles.mt10]}>
            <MultiOptionText
              data={[{
              value: true,
              text: "Indoor"
            }, {
              value: false,
              text: "Outdoor"
            }]}
              onPress={item => { this.setState({indoor: item.value, outdoor: !item.value, locationEmpty: false})}}
            ></MultiOptionText>
            
          </View>
          
        </View>
        <View style={[mainStyles.mt20]}>
          <TextInput
            style={this.state.activityPlaceDescriptionEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
            multiline={true}
            numberOfLines={1}
            placeholder="Where was the activity?"
            onChangeText={(text) => this.setState({activityPlaceDescription: text, activityPlaceDescriptionEmpty: false})}
            value={this.state.activityPlaceDescription}
            underlineColorAndroid='transparent'/>
        </View>
        
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt53, mainStyles.mh10, {alignItems:"center"}]}>
          <Text style={[mainStyles.textQuestion]}>SU engaged in activity</Text>
          <Picker
            styleText={this.state.engagedEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
            placeholder="with   "
            data={Data.activityEngagedChoices}
            pickerBinder={true}
            onSelectLabel={(val) => { this.setState({ engagedText: val }) }}
            onPress={(val) => this.setState({engaged: val, engagedEmpty: false})}/>
        </View>
        <Text style={[mainStyles.textQuestion, mainStyles.mt63,mainStyles.mh10]}>
          Duration of activity
        </Text>
        <View style={[styles.inputTimeContainer,mainStyles.mh10,mainStyles.mt20]}>
          <TouchableOpacity
            style={[styles.inputTouchableContainer ]}
            onPress={() => this.setState({ isDateTimePickerVisible: true,hoursTemp:this.state.hours,minutesTemp:this.state.minutes })}>
            <Text>hr</Text>
            <Text style={[styles.textInputTime, this.state.durationEmpty ? mainStyles.itemRequired : {color:"black"}]}>
              {this.state.hours}
            </Text>
            <Text style={[this.state.durationEmpty ? mainStyles.itemRequired : {color:"black",fontSize:40}]}>
              :
            </Text>
            <Text style={[styles.textInputTime, this.state.durationEmpty ? mainStyles.itemRequired : {color:"black"}]}>
              {this.state.minutes}
            </Text>
            <Text> min</Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
          
            visible={this.state.isDateTimePickerVisible}>
            
            <View style={styles.modalContainer}>
              <View style={[styles.modal, { width: 200 ,maxHeight:"80%"}]}>
                <View >
                  <View style={[styles.flexRow, { justifyContent: "space-evenly", alignItems: "center",marginVertical:10 }]}>
                    <View style={[styles.timePickerLine,{translateX:-18}]}></View>
                    <View style={[styles.timePickerLine,{translateX:82}]}></View>
                    <TimePicker 
                    itemSpace={80}
                    textSize={18}
                    style={styles.timePicker}
                    selectedValue={this.state.hoursTemp}
                    pickerData={["00", "01", "02", "03", "04", "05", "06", "07", "08", "09","10"]}
                    onValueChange={(item) => { this.setState({ hoursTemp: item }) }} />
                    <Text style={{fontSize:30}}>:</Text>
                    <TimePicker 
                      itemSpace={80}
                      textSize={18}
                      style={styles.timePicker}
                      selectedValue={this.state.minutesTemp}
                      pickerData={this.minutes} 
                      onValueChange={(item) => { this.setState({ minutesTemp: item })}} />
                  </View>
                  <View style={[styles.flexRow, { justifyContent: "space-around", alignItems: "center" }]}>
                    <TouchableOpacity
                      style={[styles.flexRow]}
                      onPress={() => { this.setState({ isDateTimePickerVisible: false })}}>
                      <Text style={[{color:"#76C5B2",fontSize:18,fontFamily:"WorkSans-SemiBold"}, mainStyles.prl40]}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.flexRow]}
                      onPress={() => { this.setState({ isDateTimePickerVisible: false });this._handleDatePicked(parseInt(this.state.hoursTemp),parseInt(this.state.minutesTemp))}}>
                        <Text style={[{color:"#76C5B2",fontSize:18,fontFamily:"WorkSans-SemiBold"}, mainStyles.prl40]}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              </View>
              
          </Modal>
        </View>
        <View style={styles.sliderView}>
          <Slider
            style={{ width: '100%' }}
            step={1}
            minimumValue={0}
            maximumValue={600}
            value={this.state.durationString}
            onValueChange={val => {
              let hours = Math.trunc( val / 60);
              let minutes = val % 60;
              const hts = hours < 10 ? '0' + hours.toString() : hours.toString();
              const mts = minutes<10 ? '0' + minutes.toString() : minutes.toString();
              this.setState({ durationString: val ,duration: `${hts}:${mts}`,hours:hts,minutes:mts,durationText:`${hours}hr ${minutes} min`})}
            }
            thumbTintColor={'#0066FF'}
            
            minimumTrackTintColor={'#D4D4D4'}
            maximumTrackTintColor={'#D4D4D4'}
          />
          <Text style={{marginTop: 7, textAlign: 'center',fontFamily:"WorkSans-Bold",color:"black"}}>{this.state.durationText}</Text>
        </View>

        <TextInput
          style={this.state.requestEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="Requests for future activities"
          onChangeText={(text) => this.setState({requestText: text, requestEmpty: false})}
          value={this.state.requestText}
          underlineColorAndroid='transparent'/>
        <Checkbox
          style={[mainStyles.mt20,styles.checkboxView]}
          checked={this.state.suRequested}
          title="SU requesed to take part again in the future"
          onPress={() => this.setState({suRequested: !this.state.suRequested})} />
        <TouchableOpacity onPress={() => this.setState({ show_notes: true })}>
          <View style={styles.notesThoughts}>
            <View style={styles.notesThoughtsView} >
              <Text style={{color:'#0066FF'}}>+</Text>
            </View>
            <Text style={styles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
          </View>
          </TouchableOpacity>
          { this.state.show_notes &&
          (<View style={[mainStyles.mt20,mainStyles.mb20]}>
            <TextInput
              style={[mainStyles.textInputForm, mainStyles.mt20]}
              placeholder="Notes and thoughts"
              underlineColorAndroid='transparent'
              onChangeText={(text) =>  this.setState({notesThoughts:text})}
            />
          </View>) }
        <View style={mainStyles.mt20}>
          <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
          <MultiMood onPressMood={this._onPressMood.bind(this)} />
          <TouchableOpacity
            style={[mainStyles.buttonSubmit,mainStyles.mb20,mainStyles.mt20]}
            onPress={() => this._submitForm()}>
            <Text style={mainStyles.textSubmit}>Preview and save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={mainStyles.containerForm}>
        <Geolocation onLocation={this._getLocation} />
        <ScrollView>
          {!this.state.isValid && this._showAlert()}
          <View style={mainStyles.card} >
            <Navbar menuID={7} appName="NEW NOTE" backMenu="CategoryScreen" navigation={this.props.navigation} />
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
