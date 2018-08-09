import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { EventDispatcher } from '../Actions';
import { Data } from '../Config';
import Geolocation from '../Components/Geolocation';
import Text from '../Components/CustomText';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import MultiMood from '../Components/MultiMood';
import MultiPicker from '../Components/MultiPicker';
import mainStyles from '../Themes/Styles';

class Health extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healths: [],
      moods: [],
      moodEmpty: false,
      healthEmpty: false,
      isValid: true,
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

  _validation(){
    let moodEmpty = this.state.moodEmpty;
    let healthEmpty = this.state.healthEmpty;
    let isValid = this.state.isValid;

    if(this.state.healths.length < 1){
      isValid=false;
      healthEmpty=true;
    }
    if(this.state.moods.length < 1){
      isValid=false;
      moodEmpty=true;
    }

    this.setState({
      isValid: isValid,
      healthEmpty: healthEmpty,
      moodEmpty: moodEmpty,
    })

    return isValid
  }

  _submitForm(){
    if(this._validation()){
      const { serviceUser, user_id } = this.props;
      const data = {
        'monitoring_type': this.state.healths,
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

      this.props.submitHealth(data)
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
              message: 'Health',
            });
          }
        })
    }
  }

  _renderForm(){
    return (
      <View style={[mainStyles.mt20,mainStyles.prl20]}>
        <MultiPicker
          style={this.state.healthEmpty ? mainStyles.pickerRequired : mainStyles.picker }
          placeholder="Select or search..."
          data={Data.healthChoices}
          onPress={(val) => this.setState({healths: val, healthEmpty: false})}/>
        <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
        <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
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
        <Geolocation onLocation={this._getLocation} />
        <ScrollView>
          {!this.state.isValid && this._showAlert()}
          <View style={mainStyles.card} >
            <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={1} style={mainStyles.mt10}/>
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
