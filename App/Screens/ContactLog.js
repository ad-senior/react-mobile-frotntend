import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config'
import { connect } from 'react-redux';
import { EventDispatcher } from '../Actions';
import MultiMood from '../Components/MultiMood';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import images from '../Themes/Images';
import mainStyles from '../Themes/Styles';
import styles from './Styles/ContactLog';

class ContactLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitor: undefined,
      text: '',
      description: '',
      comments: '',
      isValid: true,
      textEmpty: false,
      visitorEmpty: false,
      descriptionEmpty: false,
      commentEmpty: false,
      moodEmpty: false,
      moods: []
    }
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
    let textEmpty = this.state.textEmpty;
    let visitorEmpty = this.state.visitorEmpty;
    let descriptionEmpty = this.state.descriptionEmpty;
    let commentEmpty = this.state.commentEmpty;
    let moodEmpty = this.state.moodEmpty;

    if(!this.state.text){
      isValid=false;
      textEmpty=true;
    }
    if(this.state.visitor === undefined){
      isValid=false;
      visitorEmpty=true;
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
      textEmpty: textEmpty,
      visitorEmpty: visitorEmpty,
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
        "visited_or_called_person": this.state.text,
        "su_interact": this.state.visitor,
        "description": this.state.description,
        "addition_comments": this.state.comments,
        "mood_1": this.state.moods[0].id,
        "rating_1": this.state.moods[0].rating,
        "service_user": serviceUser.id,
        "created_by": user_id
      }

      if(this.state.moods.length > 1){
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }

      this.props.submitContactLog(data)
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
              message: 'Contact log',
            });
          }
        })
    }
  }

  _renderForm(){
    return (
      <View style={[mainStyles.mt20,mainStyles.prl20]}>
        <TextInput
          style={this.state.textEmpty ? [mainStyles.textInputForm, mainStyles.inputRequired] : mainStyles.textInputForm}
          onChangeText={(text) => this.setState({text: text, textEmpty: false})}
          value={this.state.text}
          underlineColorAndroid='transparent'
          placeholder="Who visited/called?"/>
        <Text style={this.state.visitorEmpty ? [mainStyles.mt10, mainStyles.itemRequired] : mainStyles.mt10}>Did visitor interact with SU?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({visitor: false, visitorEmpty: false})}
            style={this.state.visitor === false ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.visitor === false ? styles.textActive : styles.textInActive}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({visitor: true, visitorEmpty: false})}
            style={this.state.visitor === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.visitor === true ? styles.textActive : styles.textInActive}>Yes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          style={this.state.descriptionEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="Give a short description of the visit/call"
          onChangeText={(text) => this.setState({description: text, descriptionEmpty: false})}
          value={this.state.description}
          underlineColorAndroid='transparent'/>
        <TextInput
          style={this.state.commentEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="Additional comments for future contacts..."
          onChangeText={(text) => this.setState({comments: text, commentEmpty: false})}
          value={this.state.comments}
          underlineColorAndroid='transparent'/>
        <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
        <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
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
            <TitleForm menuID={6} style={mainStyles.mt10}/>
          </View>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  submitContactLog: (dataObj) => EventDispatcher.PostContactLog(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id
  };
}

export default connect(stateToProps, dispatchToProps)(ContactLog)
