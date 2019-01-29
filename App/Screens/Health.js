import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Alert, AsyncStorage, } from 'react-native';
import { connect } from 'react-redux';
import { EventDispatcher } from '../Actions';
import { Data } from '../Config';
import Geolocation from '../Components/Geolocation';
import Text from '../Components/CustomText';
import TextInput from '../Components/CustomTextInput'
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import MultiMood from '../Components/MultiMood';
import Picker from '../Components/Picker';
import mainStyles from '../Themes/Styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './Styles/Health'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import BloodTest from "./HealthSubPages/BloodTest"
import BloodPressure from "./HealthSubPages/BloodPressure"
import FootCheck from "./HealthSubPages/FootCheck"
import BMI from "./HealthSubPages/BMI"
import Glucose from "./HealthSubPages/Glucose"
import HeartRate from "./HealthSubPages/HeartRate"
import OtherTest from "./HealthSubPages/OtherTest"
import Seizure from "./HealthSubPages/Seizure"
import Temperature from "./HealthSubPages/Temperature"
import WoundCare from "./HealthSubPages/WoundCare"
import PickHealthLocation from "../Components/PickLocalStorage"
class Health extends Component {
  constructor(props) {
    super(props);
    this.dataBloodPressure = [];

    for (pressure = 0; pressure < 100; pressure++)
      this.dataBloodPressure.push(pressure < 10 ? "0" + pressure.toString() : pressure.toString());

    this.state = {
      healths: [],
      moods: [],
      moodEmpty: false,
      healthEmpty: false,
      isValid: true,
      location: [null, null],
      SYSTOLICPickerVisible: false,
      DIASTOLICPickerVisible: false,
      DIASTOLIC: "--",
      SYSTOLIC: "--"
    }
  }
  componentDidMount = () => {
    AsyncStorage.setItem("IsReview", "False")
  }

  _showAlert() {
    Alert.alert(
      'Please complete the required information',
      '',
      [{ text: 'Close', onPress: () => this.setState({ isValid: true }) }]
    )
  }

  _getLocation = (loc) => {
    this.setState({ location: loc });
  }

  _validation() {
    let moodEmpty = this.state.moodEmpty;
    let healthEmpty = this.state.healthEmpty;
    let isValid = this.state.isValid;
    let timeEmpty = this.state.timeEmpty
    let whereEmpty = this.state.whereEmpty
    if (this.state.moods.length < 1) {
      isValid = false;
      moodEmpty = true;
    }
    if (!this.state.date) {
      isValid = false;
      timeEmpty = true;
    }
    if (!this.state.where) {
      isValid = false;
      whereEmpty = true;
    }
    switch (this.state.health) {

      case "BLOOD_TEST":
        isValid = this.bloodtest._validate() && isValid
        break;
      case "BLOOD_PRESSURE":
        isValid = this.bloodpressure._validate() && isValid
        break;
      case "FOOT":
        isValid = this.footcheck._validate() && isValid
        break;
      case "BMI":
        isValid = this.bmi._validate() && isValid
        break;
      case "HEART":
        isValid = this.heartrate._validate() && isValid
        break;
      case "TEMP":
        isValid = this.temperature._validate() && isValid
        break;
      case "GLU":
        isValid = this.glucose._validate() && isValid
        break;
      case "SEIZ":
        isValid = this.seizure._validate() && isValid
        break;
      case "WOUND":
        isValid = this.woundcare._validate() && isValid
        break;
      case "OTH":
        isValid = this.othertest._validate() && isValid
        break;
    }
    this.setState({
      isValid: isValid,
      healthEmpty: healthEmpty,
      moodEmpty: moodEmpty,
      whereEmpty: whereEmpty,
      timeEmpty: timeEmpty
    })

    return isValid
  }
  _submitForm() {
    if (this._validation()) {
      const { serviceUser, user_id } = this.props;
      const data = {
        'monitoring_type': this.state.healths,
        'mood_1': this.state.moods[0].id,
        'rating_1': this.state.moods[0].rating,
        'service_user': serviceUser.id,
        'created_by': user_id,
        'location': this.state.location,
        'date': this.state.date,
        'where': this.state.where,
        'notes_and_thoughts': this.state.notesThoughts
      }
      reviewPage = "HomeScreen"
      switch (this.state.health) {

        case "BLOOD_TEST":
          data = this.bloodtest._submit(data)
          reviewPage = "BloodTestReview"
          break;
        case "BLOOD_PRESSURE":
          data = this.bloodpressure._submit(data)
          reviewPage = "BloodPressureReview"
          break;
        case "FOOT":
          data = this.footcheck._submit(data)
          reviewPage = "FootCheckReview"
          break;
        case "BMI":
          data = this.bmi._submit(data)
          reviewPage = "BMIReview"
          break;
        case "HEART":
          data = this.heartrate._submit(data)
          reviewPage = "HeartRateReview"
          break;
        case "TEMP":
          data = this.temperature._submit(data)
          reviewPage = "TemperatureReview"
          break;
        case "GLU":
          data = this.glucose._submit(data)
          reviewPage = "GlucoseReview"
          break;
        case "SEIZ":
          data = this.seizure._submit(data)
          reviewPage = "SeizureReview"
          break;
        case "WOUND":
          data = this.woundcare._submit(data)
          reviewPage = "WoundCareReview"
          break;
        case "OTH":
          data = this.othertest._submit(data)
          reviewPage = "OtherTestReview"
          break;
      }
      if (this.state.moods.length > 1) {
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }

      const { navigate } = this.props.navigation;
      AsyncStorage.getItem("IsReview").then((value) => {
        if (value == "True") {
          navigate(reviewPage, { message: 'Health', data });
        } else {
          this.props.submitHealth(data)
            .then((response) => {
              let data = response.postSuccess;
              if (data.error) {
                Alert.alert(
                  JSON.stringify(data.message),
                  null,
                  [{ text: 'Close' }]
                )
              } else {
                navigate(reviewPage, { message: 'Health', data });
                AsyncStorage.setItem("ReviewID", data.id.toString());
              }
            })
        }
      }).done()
    }
  }


  _renderOptions = () => {
    return (<View >
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "BLOOD_TEST", healthTitle: "Blood test" }) }}><Text >Blood test</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "BLOOD_PRESSURE", healthTitle: "Blood pressure" }) }}><Text >Blood pressure</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "FOOT", healthTitle: "Foot check" }) }}><Text >Foot check</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "BMI", healthTitle: "BMI" }) }}><Text >BMI</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "HEART", healthTitle: "Heart rate" }) }}><Text >Heart rate</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "TEMP", healthTitle: "Temperature" }) }}><Text >Temperature</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "GLU", healthTitle: "Glucose" }) }}><Text >Glucose</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "SEIZ", healthTitle: "Seizure chart" }) }}><Text >Seizure chart</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "WOUND", healthTitle: "Wound care" }) }}><Text >Wound care</Text></TouchableOpacity>
      <TouchableOpacity style={[mainStyles.buttonRoundInActive, mainStyles.button, styles.flexRow, { marginVertical: 2 }]} onPress={() => { this.setState({ health: "OTH", healthTitle: "Other test result" }) }}><Text style={{ fontFamily: "WorkSans-Bold" }}>Other test result</Text></TouchableOpacity>
    </View>)
  }

  _renderForm() {
    return (
      <View style={[mainStyles.mt30, mainStyles.mb30,mainStyles.prl20]}>

        {
          !this.state.health ? this._renderOptions()
            :
            <View>
              <View style={[{ alignItems: "center", justifyContent: "center" }]}>
                <Picker
                  hasShadow={true}
                  shadowColor="#0066FF"
                  style={mainStyles.picker}
                  placeholder={this.state.healthTitle}
                  data={Data.healthChoices}
                  onPress={(val) => this.setState({ health: val, healthEmpty: false })} />
              </View>
              <TouchableOpacity style={[mainStyles.mt20, styles.flexRowFullWidth, styles.topLine]} onPress={() => this.setState({ isDateTimePickerVisible: true })}>
                <Ionicon style={{ paddingRight: 10 }} name="ios-calendar" color="#A7A7A7" size={20} />

                <Text style={[this.state.timeEmpty && { color: "red" }]}>{this.state.date ? this.state.date : "When did it happened?"}</Text>

              </TouchableOpacity>
              <DateTimePicker
                titleIOS={'Pick a time'}
                is24Hour={true}
                mode={'datetime'}
                datePickerModeAndroid={'spinner'}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={(date) => this.setState({ date: (date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString()) + "/" + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + "/" + date.getFullYear().toString().substr(2, 2) + " - " + (date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes(9).toString()), isGlucoseDateTimePickerVisible: false, timeEmpty: false })}
                onCancel={() => this.setState({ isDateTimePickerVisible: false })} />
              <View style={[styles.flexRowFullWidth, styles.topLineTextInput]}>
                <Icon name="location-on" color="#A7A7A7" size={20} />
                <PickHealthLocation
                  storagekey="keyHealthLocation"
                  style={this.state.whereEmpty ? mainStyles.pickerRequired : mainStyles.picker}
                  placeholder="Where did it happen"
                  hideIcon={true}
                  styleText={{ flex: 1 }}
                  onPress={(text) => this.setState({ where: text, whereEmpty: false })} />
              </View>

              {
                this.state.health == "BLOOD_TEST" && <BloodTest onRef={ref => (this.bloodtest = ref)}></BloodTest>
              }
              {
                this.state.health == "BLOOD_PRESSURE" && <BloodPressure onRef={ref => (this.bloodpressure = ref)}></BloodPressure>
              }
              {
                this.state.health == "FOOT" && <FootCheck onRef={ref => (this.footcheck = ref)}></FootCheck>
              }
              {
                this.state.health == "BMI" && <BMI onRef={ref => (this.bmi = ref)}></BMI>
              }
              {
                this.state.health == "HEART" && <HeartRate onRef={ref => (this.heartrate = ref)}></HeartRate>
              }
              {
                this.state.health == "TEMP" && <Temperature onRef={ref => (this.temperature = ref)}></Temperature>
              }
              {
                this.state.health == "GLU" && <Glucose onRef={ref => (this.glucose = ref)}></Glucose>
              }
              {
                this.state.health == "SEIZ" && <Seizure onRef={ref => (this.seizure = ref)}></Seizure>
              }
              {
                this.state.health == "WOUND" && <WoundCare onRef={ref => (this.woundcare = ref)}></WoundCare>
              }

              {
                this.state.health == "OTH" && <OtherTest onRef={ref => (this.othertest = ref)}></OtherTest>
              }
              <TouchableOpacity onPress={() => this.setState({ show_notes: true })}>
                <View style={styles.notesThoughts}>
                  <View style={styles.notesThoughtsView} >
                    <Text style={{ color: '#0066FF' }}>+</Text>
                  </View>
                  <Text style={styles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
                </View>
              </TouchableOpacity>
              {this.state.show_notes &&
                (<View style={[mainStyles.mt20, mainStyles.mb20]}>
                  <TextInput
                    style={[mainStyles.textInputForm, mainStyles.mt20]}
                    placeholder="Notes and thoughts"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ notesThoughts: text })}
                  />
                </View>)}
              <View style={mainStyles.mt20}>
                <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
                <MultiMood onPressMood={(moods) => this.setState({ moods: moods, moodEmpty: false })} />
                <TouchableOpacity
                  style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20]}
                  onPress={() => this._submitForm()}>
                  <Text style={mainStyles.textSubmit}>Preview and save</Text>
                </TouchableOpacity>
              </View>
            </View>
        }
      </View>

    )
  }

  render() {
    return (
      <View style={mainStyles.containerForm}>
        <Geolocation onLocation={this._getLocation} />
        <ScrollView>
          {!this.state.isValid && this._showAlert()}
          <View style={mainStyles.card} >
            <Navbar menuID={1} appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={1} style={mainStyles.mt10} />
          </View>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  submitHealth: (dataObj) => EventDispatcher.PostHealth(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id
  };
}

export default connect(stateToProps, dispatchToProps)(Health)
