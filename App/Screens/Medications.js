import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config'
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import PickerUser from '../Components/PickerUser';
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
      moods: []
    }
  }

  componentDidMount(){
    const { serviceUsers } = this.props;
    this.setState({ serviceUsers });
  }

  _showAlert(){
    Alert.alert(
      'Please complete the required information',
      '',
      [{text: 'Close', onPress: () => this.setState({isValid: true})}]
    )
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
    }
    if(!this.state.description){
      isValid=false;
      descriptionEmpty=true;
    }
    if(!this.state.comments){
      isValid=false;
      commentEmpty=true;
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
      const { user_id } = this.props;
      const data = {
        'dosage_given' : this.state.dosageGiven,
        'whole_dosage_taken' : this.state.dosageTaken,
        'whole_dosage_taken_reason' : this.state.description,
        'comment_future_medication' : this.state.comments,
        'mood_1': this.state.moods[0].id,
        'rating_1': this.state.moods[0].rating,
        'service_user': this.state.serviceUser.id,
        'created_by': user_id
      }

      if(this.state.moods.length > 1){
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }

      this.props.submitMedication(data)
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
              message: 'Medication',
            });
          }
        })
    }
  }

  _renderForm(){
    if (!this.state.serviceUsers){
      return (<View></View>)
    }else{
      return (
        <View style={[mainStyles.mt20,mainStyles.prl20]}>
          <PickerUser
            style={this.state.serviceUserEmpty ? mainStyles.pickerRequired : mainStyles.picker }
            placeholder="Medication given..."
            data={this.state.serviceUsers}
            onPress={(val) => this.setState({serviceUser: val, serviceUserEmpty: false})}/>
          <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
            <Text>Dosage given was</Text>
            <Picker
              styleText={this.state.dosageGivenEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
              placeholder="select"
              data={Data.optionChoices}
              onPress={(val) => this.setState({dosageGiven: val, dosageGivenEmpty: false})}/>
          </View>
          <Text style={this.state.dosageTakenEmpty ? [mainStyles.mt10, mainStyles.itemRequired] : mainStyles.mt10}>
            Whole dosage taken?
          </Text>
          <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
            <TouchableOpacity
              onPress={() => this.setState({dosageTaken: false, dosageTakenEmpty: false})}
              style={this.state.dosageTaken === false ? mainStyles.buttonActive : mainStyles.button}>
              <View style={styles.textContainer} >
                <Text style={this.state.dosageTaken === false ? styles.textActive : styles.textInActive}>No</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({dosageTaken: true, dosageTakenEmpty: false})}
              style={this.state.dosageTaken === true ? mainStyles.buttonActive : mainStyles.button}>
              <View style={styles.textContainer} >
                <Text style={this.state.dosageTaken === true ? styles.textActive : styles.textInActive}>Yes</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TextInput
            style={this.state.descriptionEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
            placeholder="Why?"
            onChangeText={(text) => this.setState({description: text, descriptionEmpty: false})}
            value={this.state.description}
            underlineColorAndroid='transparent'/>
          <TextInput
            style={this.state.commentEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
            placeholder="Additional comments for future medications..."
            onChangeText={(text) => this.setState({comments: text, commentEmpty: false})}
            value={this.state.comments}
            underlineColorAndroid='transparent'/>
          <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
          <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
          <TouchableOpacity
            style={[mainStyles.buttonSubmit,mainStyles.mb10]}
            onPress={() => this._submitForm()}>
            <Text style={[mainStyles.textSubmit]}>SAVE NOTE</Text>
          </TouchableOpacity>
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
            <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
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
    user_id: state.login.user_id
  };
}

export default connect(stateToProps, dispatchToProps)(Medications)
