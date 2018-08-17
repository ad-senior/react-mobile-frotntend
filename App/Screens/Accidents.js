import React, { Component } from 'react'
import { Modal, View, ScrollView, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import Geolocation from '../Components/Geolocation';
import Navbar from '../Components/Navbar';
import TitleForm from '../Components/TitleForm';
import MultiMood from '../Components/MultiMood';
import Picker from '../Components/Picker';
import Checkbox from '../Components/Checkbox';
import mainStyles from '../Themes/Styles'
import styles from './Styles/Accidents'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Colors from '../Themes/Colors';

class Accidents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginAggressive: undefined,
      reportTo: undefined,
      towardsSU: false,
      towardsStaff: false,
      callPolice: false,
      callParamedics: false,
      callFamily: false,
      isValid: true,
      isDateTimePickerVisible: false,
      happenedEmpty: false,
      reportToEmpty: false,
      lastIncidentEmpty: false,
      beginAggressiveEmpty: false,
      suSayEmpty: false,
      resolvedEmpty: false,
      moodEmpty: false,
      happened: '',
      suSay: '',
      resolved: '',
      moods: [],
      lastIncident: '00:00',
      lastHour: '00',
      lastMin: '00',
      location: [null, null]
    }
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

  _handleDatePicked = (date) => {
    const h = date.getHours();
    const m = date.getMinutes();
    const hts = h < 10 ? '0' + h.toString() : h.toString();
    const mts = m < 10 ? '0' + m.toString() : m.toString();
    this.setState({lastHour: `${hts}`, lastMin: `${mts}`, isDateTimePickerVisible: false});
    this.setState({lastIncident: `${hts}:${mts}`, lastIncidentEmpty: false, isDateTimePickerVisible: false});
  };

  _validation(){

    let isValid = this.state.isValid;
    let happenedEmpty = this.state.happenedEmpty;
    let lastIncidentEmpty = this.state.lastIncidentEmpty;
    let beginAggressiveEmpty = this.state.beginAggressiveEmpty;
    let reportToEmpty = this.state.reportToEmpty;
    let suSayEmpty = this.state.suSayEmpty;
    let resolvedEmpty = this.state.resolvedEmpty;
    let moodEmpty = this.state.moodEmpty;

    if(this.state.happened === ''){
      isValid=false;
      happenedEmpty=true;
    }
    if(this.state.lastIncident === '00:00'){
      isValid=false;
      lastIncidentEmpty=true;
    }
    if(this.state.beginAggressive === undefined){
      isValid=false;
      beginAggressiveEmpty=true;
    }
    if(this.state.reportTo === undefined){
      isValid=false;
      reportToEmpty=true;
    }
    if(this.state.suSay === ''){
      isValid=false;
      suSayEmpty=true;
    }
    if(this.state.resolved === ''){
      isValid=false;
      resolvedEmpty=true;
    }
    if(this.state.moods.length < 1){
      isValid=false;
      moodEmpty=true;
    }

    this.setState({
      isValid: isValid,
      happenedEmpty: happenedEmpty,
      lastIncidentEmpty: lastIncidentEmpty,
      beginAggressiveEmpty: beginAggressiveEmpty,
      reportToEmpty: reportToEmpty,
      suSayEmpty: suSayEmpty,
      resolvedEmpty: resolvedEmpty,
      moodEmpty: moodEmpty
    })

    return isValid;
  }

  _submitForm(){

    if(this._validation()){
      const { serviceUser, user_id } = this.props;
      const data = {
        'incident_description' : this.state.happened,
        'incident_time': this.state.lastIncident,
        'aggressive': this.state.beginAggressive,
        'reported_to': this.state.reportTo,
        'toward_su': this.state.towardsSU,
        'toward_staff': this.state.towardsStaff,
        'call_police': this.state.callPolice,
        'call_paramedics': this.state.callParamedics,
        'call_family': this.state.callFamily,
        'su_comments': this.state.suSay,
        'resolved': this.state.resolved,
        'mood_1': this.state.moods[0].id,
        'rating_1': this.state.moods[0].rating,
        'service_user': serviceUser.id,
        'created_by': user_id,
        'location': this.state.location
      }

      if(this.state.moods.length > 1){
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }

      this.props.submitAccident(data)
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
            navigate('HomeScreen', {
              message: 'Accident',
            });
          }
        })
    }
  }

  _renderCalled(){
    return (
      <View>
        <View style={mainStyles.buttonInActive}>
        <Checkbox
          style={[]}
          checked={this.state.callPolice}
          title="Police"
          onPress={() => this.setState({callPolice: !this.state.callPolice})} />
        </View>
        <View style={mainStyles.buttonInActive}>
          <Checkbox
          style={[]}
          checked={this.state.callParamedics}
          title="Paramedics"
          onPress={() => this.setState({callParamedics: !this.state.callParamedics})} />
        </View>
        <View style={mainStyles.buttonInActive}>
          <Checkbox
          style={[]}
          checked={this.state.callFamily}
          title="Family"
          onPress={() => this.setState({callFamily: !this.state.callFamily})} />
        </View>

      </View>
    )
  }

  _renderTowards(){
    if (this.state.beginAggressive === false || this.state.beginAggressive === undefined){
      return (<View></View>)
    } else {
      return (
        <View>
          <View style={mainStyles.buttonInActive}>
            <Checkbox
              style={[]}
              checked={this.state.towardsSU}
              title="Towards other SUs"
              onPress={() => this.setState({towardsSU: !this.state.towardsSU})} />
          </View>
          <View style={mainStyles.buttonInActive}>
            <Checkbox
              style={[]}
              checked={this.state.towardsStaff}
              title="Towards staff members"
              onPress={() => this.setState({towardsStaff: !this.state.towardsStaff})} />
          </View>
        </View>
      )
    }
  }

  _renderForm(){
    return (
      <View style={[mainStyles.mt20,mainStyles.prl20,mainStyles.centerVertical]}>
        <View style={[mainStyles.mt20]}>
          <TextInput
            style={this.state.happenedEmpty ? [mainStyles.textInputForm, mainStyles.inputRequired] : mainStyles.textInputForm}
            placeholder="What has happened?"
            onChangeText={(text) => this.setState({happened: text, happenedEmpty: false})}
            value={this.state.happened}
            underlineColorAndroid='transparent'/>
          <View style={[mainStyles.mt20]}>
            <Text style={[mainStyles.textQuestion]} >How long has/ did the incident lasted/ last?</Text>
            <View style={[{flex: 1, flexDirection: 'row' ,justifyContent : 'center', alignItems: 'center'},mainStyles.mt20]}>
              <Text style={[{color: '#B2B2B2',margin:10}]}>hr</Text>
              <TouchableOpacity onPress={() => this.setState({ isDateTimePickerVisible: true })}>
                <View style={[{flex: 1, flexDirection: 'row' ,justifyContent : 'center', alignItems: 'center'}]}>
                  <Text style={this.state.lastIncidentEmpty ? [styles.textInputTime, mainStyles.itemRequired, {borderBottomWidth: 1,borderBottomColor: Colors.hilightBlue}] : [styles.textInputTime, {borderBottomWidth: 1,borderBottomColor: Colors.hilightBlue}]}>
                    {this.state.lastHour}
                  </Text>
                  <Text style={[styles.textInputTime,{marginRight: 0}]}>:</Text>
                  <Text style={this.state.lastIncidentEmpty ? [styles.textInputTime, mainStyles.itemRequired, {borderBottomWidth: 1,borderBottomColor: Colors.hilightBlue}] : [styles.textInputTime, {borderBottomWidth: 1,borderBottomColor: Colors.hilightBlue}]}>
                    {this.state.lastMin}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={[{color: '#B2B2B2',margin:10}]}>min</Text>
            </View>
          </View>
        </View>
        <DateTimePicker
            titleIOS={'Pick a time'}
            is24Hour={true}
            mode={'time'}
            datePickerModeAndroid={'spinner'}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={() => this.setState({ isDateTimePickerVisible: false })}/>
        <View style={mainStyles.mt20}>
          <Text style={this.state.beginAggressiveEmpty ? [mainStyles.itemRequired, mainStyles.mt10, mainStyles.textQuestion] : [mainStyles.mt10, mainStyles.textQuestion]}>
            Is / was the SU being aggressive?
          </Text>
          <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
            <TouchableOpacity
              onPress={() => this.setState({beginAggressive: false, beginAggressiveEmpty: false})}
              style={this.state.beginAggressive === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
              <View style={styles.textContainer}>
                <Text style={this.state.beginAggressive === false ? styles.textActive : styles.textInActive}>No</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({beginAggressive: true, beginAggressiveEmpty: false})}
              style={this.state.beginAggressive === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
              <View style={styles.textContainer} >
                <Text style={this.state.beginAggressive === true ? styles.textActive : styles.textInActive}>Yes</Text>
              </View>
            </TouchableOpacity>
          </View>
          {this._renderTowards()}
        </View>
        <View style={mainStyles.mt20}>
          <Text style={[mainStyles.mt10, mainStyles.textQuestion]}>Who has been called?</Text>
            {this._renderCalled()}
        </View>
        <View style={mainStyles.mt20}>
          <TextInput
            style={this.state.suSayEmpty ? [mainStyles.textInputForm, mainStyles.mt20, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt20]}
            multiline={true}
            numberOfLines={2}
            placeholder="What did the SU say? OR breifly outline what the SU said?"
            onChangeText={(text) => this.setState({suSay: text, suSayEmpty: false})}
            value={this.state.suSay}
            underlineColorAndroid='transparent'/>
        </View>
        <View style={[mainStyles.mt20,mainStyles.mb20]}>
          <TextInput
            style={this.state.resolvedEmpty ? [mainStyles.textInputForm, mainStyles.mt20, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt20]}
            placeholder="How was incident resolved?"
            onChangeText={(text) => this.setState({resolved: text, resolvedEmpty: false})}
            value={this.state.resolved}
            underlineColorAndroid='transparent'/>
        </View>
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt20]}>
          <Text style={[mainStyles.textQuestion]}>Who was the incident</Text>
          <Picker
            styleText={this.state.reportToEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="reported to?"
            data={Data.accidentReportChoices}
            onPress={(val) => this.setState({reportTo: val, reportToEmpty: false})}/>
        </View>

        <View style={mainStyles.mt20}>
          <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
          <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
          <TouchableOpacity
            style={[mainStyles.buttonSubmit,mainStyles.mb20,mainStyles.mt20]}
            onPress={() => this._submitForm()}>
            <Text style={mainStyles.textSubmit}>SAVE NOTE</Text>
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
            <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={0} style={mainStyles.mt10}/>
          </View>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  submitAccident: (dataObj) => EventDispatcher.PostAccident(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id
  };
}

export default connect(stateToProps, dispatchToProps)(Accidents)
