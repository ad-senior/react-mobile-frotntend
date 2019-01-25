import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Image, Alert,AsyncStorage } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config'
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import Geolocation from '../Components/Geolocation';
import PickerMedication from '../Components/PickMedication';
import Picker from '../Components/Picker';
import MultiMood from '../Components/MultiMood';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import images from '../Themes/Images';
import mainStyles from '../Themes/Styles';
import styles, { pickerSelectBodyStyles } from './Styles/Medications'

class Medications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dosageTaken: undefined,
      dosageGiven: undefined,
      serviceUser: undefined,
      serviceUsers: undefined,
      description: '',
      comments: '',
      isValid: true,
      serviceUserEmpty: false,
      dosageGivenEmpty: false,
      dosageTakenEmpty: false,
      descriptionEmpty: false,
      commentEmpty: false,
      moodEmpty: false,
      moods: [],
      location: [null, null],
      notesThoughts: ''
    }
  }

  componentDidMount(){
    const { serviceUsers } = this.props;
    console.log('serviceUser', serviceUsers);
    this.setState({ serviceUsers });
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
    let isValid = this.state.isValid;
    let serviceUserEmpty = this.state.serviceUserEmpty;
    let dosageGivenEmpty = this.state.dosageGivenEmpty;
    let dosageTakenEmpty = this.state.dosageTakenEmpty;
    let descriptionEmpty = this.state.descriptionEmpty;
    let commentEmpty = this.state.commentEmpty;
    let moodEmpty = this.state.moodEmpty;


    if(!this.state.serviceUser){
      isValid=false;
      serviceUserEmpty=true;
    }
    if(!this.state.dosageGiven){
      isValid=false;
      dosageGivenEmpty=true;
    }
    if(this.state.dosageTaken === undefined){
      isValid=false;
      dosageTakenEmpty=true;
    }else if (this.state.dosageTaken === false){
      if (!this.state.description){
        isValid=false;
        dosageTakenEmpty=true;
      }
    }else if (this.state.dosageTaken === true){
      dosageTakenEmpty=false;
    }

    if(!this.state.description){
      if (this.state.dosageTaken != true){
        isValid=false;
        descriptionEmpty=true;
      }
    }

    if(this.state.moods.length < 1){
      isValid=false;
      moodEmpty=true;
    }


    this.setState({
      isValid: isValid,
      serviceUserEmpty: serviceUserEmpty,
      dosageGivenEmpty: dosageGivenEmpty,
      dosageTakenEmpty: dosageTakenEmpty,
      descriptionEmpty: descriptionEmpty,
      commentEmpty: commentEmpty,
      moodEmpty: moodEmpty
    })

    return isValid
  }

  _submitForm(){
    if(this._validation()){
      const { serviceUser, user_id } = this.props;
      const data = {
        'dosage_given' : this.state.dosageGiven,
        'whole_dosage_taken' : this.state.dosageTaken,
        'whole_dosage_taken_reason' : this.state.description,
        'comment_future_medication' : this.state.comments,
        'mood_1': this.state.moods[0].id,
        'rating_1': this.state.moods[0].rating,
        'created_by': user_id,
        'medication_name': this.state.serviceUser,
        "service_user": serviceUser.id,
        'location': this.state.location,
        'notes_and_thoughts': this.state.notesThoughts
      }
      if(this.state.moods.length > 1){
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }
      const { navigate } = this.props.navigation;
      AsyncStorage.getItem("IsReview").then((value) => {
        if (value == "True") {
          navigate('MedicationsReviewScreen', {message: 'Medication', data});
        }else{
          this.props.submitMedication(data)
            .then((response) => {
              let data = response.postSuccess;
              if (data.error){
                Alert.alert(
                  data.message,
                  null,
                  [{text: 'Close'}]
                )
              } else {
                navigate('MedicationsReviewScreen', {message: 'Medication', data});
                AsyncStorage.setItem("ReviewID", data.id.toString());
              }
            })
        }
      }).done()
    }
  }

  _renderForm(){
    if (!this.state.serviceUsers){
      return (<View></View>)
    }else{
      return (
        <View style={[mainStyles.mt20,mainStyles.prl20]}>
          <Geolocation onLocation={this._getLocation} />
          <PickerMedication
            style={this.state.serviceUserEmpty ? mainStyles.pickerRequired : mainStyles.picker }
            placeholder="What medication has been adminstered?"
            data={this.state.serviceUsers}
            onPress={(val) => this.setState({serviceUser: val, serviceUserEmpty: false})}/>
          <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
            <Text style={[mainStyles.textQuestion]}>Dosage given was</Text>
          </View>
          <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
            <TouchableOpacity
              onPress={() => this.setState({dosageGiven: "AS_PER_MAR_CHART"})}
              style={this.state.dosageGiven === "AS_PER_MAR_CHART" ? mainStyles.buttonActive : mainStyles.buttonInActive}>
              <View style={styles.textContainer} >
                <Text style={this.state.dosageGiven === "AS_PER_MAR_CHART" ? styles.textActive : styles.textInActive}>As Per MAR chart</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
            <TouchableOpacity
              onPress={() => this.setState({dosageGiven: "OTH"})}
              style={this.state.dosageGiven === "OTH" ? mainStyles.buttonActive : mainStyles.buttonInActive}>
              <View style={styles.textContainer} >
                <Text style={this.state.dosageGiven === "OTH" ? styles.textActive : styles.textInActive}>Other</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={this.state.dosageTaken === undefined ? [mainStyles.mt10, mainStyles.textQuestion, mainStyles.itemRequired] : [mainStyles.mt10, mainStyles.textQuestion]}>
            Was the whole dosage taken?
          </Text>
          <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
            <TouchableOpacity
              onPress={() => this.setState({dosageTaken: false, dosageTakenEmpty: false})}
              style={this.state.dosageTaken === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
              <View style={styles.textContainer} >
                <Text style={this.state.dosageTaken === false ? styles.textActive : styles.textInActive}>No</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({dosageTaken: true, dosageTakenEmpty: false})}
              style={this.state.dosageTaken === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
              <View style={styles.textContainer} >
                <Text style={this.state.dosageTaken === true ? styles.textActive : styles.textInActive}>Yes</Text>
              </View>
            </TouchableOpacity>
          </View>
          { this.state.dosageTaken === false &&
          <TextInput
            style={this.state.descriptionEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
            placeholder="If not, why?"
            onChangeText={(text) => this.setState({description: text, descriptionEmpty: false})}
            value={this.state.description}
            underlineColorAndroid='transparent'/>
          }
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
            <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
            <TouchableOpacity
              style={[mainStyles.buttonSubmit,mainStyles.mb20,mainStyles.mt20]}
              onPress={() => this._submitForm()}>
              <Text style={[mainStyles.textSubmit]}>Preview and save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={mainStyles.containerForm}>
        <ScrollView>
          {!this.state.isValid && this._showAlert()}
          <View style={mainStyles.card} >
            <Navbar menuID={3} appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={3} style={mainStyles.mt10}/>
          </View>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  submitMedication: (dataObj) => EventDispatcher.PostMedication(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id
  };
}

export default connect(stateToProps, dispatchToProps)(Medications)
