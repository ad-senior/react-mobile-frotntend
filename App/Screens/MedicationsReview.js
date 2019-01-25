import React, { Component } from 'react'
import { View, TouchableOpacity, Alert, StyleSheet, Keyboard ,AsyncStorage } from 'react-native';
import _ from 'lodash';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import mainStyles from '../Themes/Styles';
import styles  from './Styles/MedicationsReview';
import Moment from 'moment';


class MedicationsReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dosageTaken: this.props.navigation.getParam('data').whole_dosage_taken,
      dosageGiven: this.props.navigation.getParam('data').dosage_given,
      serviceUser: this.props.navigation.getParam('data').medication_name,
      date: '',
      mood_1: '',
      mood_2: '',
      reportTo: undefined,
      serviceUsers: undefined,
      description: '',
      comments: '',
      isValid: true,
      serviceUserEmpty: false,
      dosageGivenEmpty: false,
      dosageTakenEmpty: false,
      mood_1Empty: false,
      descriptionEmpty: false,
      selectedValue: '',
      moods: [],
      dosage: [{label: 'AS_PER_MAR_CHART', value: 'AS_PER_MAR_CHART'}, {label: 'OTH', value: 'OTH'}],
      whole_dosage_taken: [{label: 'was', value: true}, {label: 'was not', value: false}],
      location: [null, null],
      positionOfKeyWords:[],
      position1: "Medication given was ",
      position2: ".Dosage given was ",
      position3: " and the whole dosage ",
      position4: " taken.The mood was ",
      position5: ".Note was submitted on ",
      position6: " ",
      editable:true,
      selection: {},
      message: '',
      isPositionUpdated: false
    }
  }

  componentDidMount(){
    const { serviceUsers, navigation, moods } = this.props;
    const {dosage, dosageGiven, dosageTaken, serviceUser,position1,position2,position3,position4,position5,position6} = this.state;
    const data = navigation.getParam('data');
    this.setState({ serviceUsers });
    const dateString = Moment(data.created_on).format('DD-MM-YYYY')
    this.setState({date:dateString})
    var mood2 = '';
    if (data.mood_2) {
      const index2 = _.findIndex(moods, ['id', data.mood_2]);
      this.setState({ mood_2: moods[index2].name });
      mood2 = moods[index2].name;
    }
    if (data.mood_1) {
      const index1 = _.findIndex(moods, ['id', data.mood_1]);
      this.setState({mood_1: moods[index1].name});
      AsyncStorage.getItem("IsReview").then(async (value) => {
        if(value == "True"){
          AsyncStorage.setItem('IsReview', "False")
          const req = await AsyncStorage.getItem("MessageArray");
          const arr = JSON.parse(req);
          if (arr.length > 0) {
            this.state.position1 = arr[0];
            this.state.position2 = arr[1];
            this.state.position3 = arr[2];
            this.state.position4 = arr[3];
            this.state.position5 = arr[4];
            this.state.position6 = arr[5];
            const keyword2 = arr[0].length + serviceUser.length + arr[1].length
            const keyword3 = keyword2 + dosageGiven.length + arr[2].length
            const key4length = dosageTaken ? 'was'.length : 'was not'.length
            const keyword4 = keyword3 + arr[3].length + key4length
            var keyword5 = keyword4 + moods[index1].name.length + arr[4].length
            var keywordEnd = moods[index1].name.length + keyword4
            if (mood2.length > 0) {
              keyword5 = keyword4 + moods[index1].name.length + mood2.length + 1 + arr[4].length
              keywordEnd = moods[index1].name.length + mood2.length + 1 + keyword4
            }
            this.state.positionOfKeyWords = [
              {position:arr[0].length,end:serviceUser.length + arr[0].length},
              {position:keyword2, end:dosageGiven.length + keyword2},
              {position:keyword3, end:key4length + keyword3},
              {position:keyword4, end:keywordEnd},
              {position:keyword5, end:dateString.length + keyword5}
            ]
            var messageString;
            messageString =  arr[0] + serviceUser + arr[1] + dosageGiven +
              arr[2] + (dosageTaken ? 'was' : 'was not') + arr[3] + moods[index1].name +
              arr[4] + dateString + arr[5]
            if(mood2.length > 0) {
              messageString =  arr[0] + serviceUser + arr[1] + dosageGiven +
                arr[2] + (dosageTaken ? 'was' : 'was not') + arr[3] + moods[index1].name + "," + mood2 +
              arr[4] + dateString + arr[5]
            }

            this.setState({message: messageString})
          }
        } else {
            const keyword2 = position1.length + serviceUser.length + position2.length
            const keyword3 = keyword2 + dosageGiven.length + position3.length
            const key4length = dosageTaken ? 'was'.length : 'was not'.length
            const keyword4 = keyword3 + position4.length + key4length
            var keyword5 = keyword4 + moods[index1].name.length + position5.length;
            var keywordEnd = moods[index1].name.length + keyword4
            if (mood2.length > 0) {
              keyword5 = keyword4 + moods[index1].name.length + mood2.length + 1 + position5.length
              keywordEnd = moods[index1].name.length + mood2.length + 1 + keyword4
            }
            this.state.positionOfKeyWords = [
              {position:position1.length,end:serviceUser.length + position1.length},
              {position:keyword2, end:dosageGiven.length + keyword2},
              {position:keyword3, end:key4length + keyword3},
              {position:keyword4, end:keywordEnd},
              {position:keyword5, end:dateString.length + keyword5}
            ]
            var messageString =  position1 + serviceUser + position2 + dosageGiven +
              position3 + (dosageTaken ? 'was' : 'was not') + position4 + moods[index1].name +
              position5 + dateString + position6
            if(mood2.length > 0) {
              var messageString =  position1 + serviceUser + position2 + dosageGiven +
                position3 + (dosageTaken ? 'was' : 'was not') + position4 + moods[index1].name + "," + mood2 +
                position5 + dateString + position6
            }
            this.setState({message: messageString})
        }
      }).done()

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
      let {
        serviceUserEmpty,
        dosageGivenEmpty,
        dosageTakenEmpty,
        mood_1Empty,
        description,
        dosageGiven,
        dosageTaken,
        serviceUser,
        mood_1,
        isValid
      } = this.state;
      if(!serviceUser){
        isValid=false;
        serviceUserEmpty=true;
      }
      if(!dosageGiven){
        isValid=false;
        dosageGivenEmpty=true;
      }
      if(!mood_1){
        isValid=false;
        mood_1Empty=true;
      }
      if(dosageTaken === undefined){
        isValid=false;
        dosageTakenEmpty=true;
      }else if (this.state.dosageTaken === false){
        if (!description){
          isValid=false;
          dosageTakenEmpty=true;
        }
      }else if (this.state.dosageTaken === true){
        dosageTakenEmpty=false;
      }

      this.setState({
        isValid: isValid,
        serviceUserEmpty: serviceUserEmpty,
        dosageGivenEmpty: dosageGivenEmpty,
        dosageTakenEmpty: dosageTakenEmpty,
        mood_1Empty: mood_1Empty,
      });
      return isValid
  }

  _submitForm() {
    const apiData = this.props.navigation.getParam('data');

    AsyncStorage.getItem("ReviewID").then((value) => {
      if(this._validation()){
        const { serviceUser, user_id } = this.props;
        const data = {
          'dosage_given' : this.state.dosageGiven,
          'whole_dosage_taken' : this.state.dosageTaken,
          'whole_dosage_taken_reason' : apiData.whole_dosage_taken_reason,
          'comment_future_medication' : apiData.comment_future_medication,
          'mood_1': apiData.mood_1,
          'mood_2': apiData.mood_2,
          'rating_1': apiData.rating_1,
          'rating_2': apiData.rating_2,
          'created_by': user_id,
          'medication_name': this.state.serviceUser,
          'location': this.state.location,
          'id': value,
          "service_user": serviceUser.id,
          'notes_and_thoughts' : apiData.notes_and_thoughts,
          'full_description': this.state.message
        }
        this.props.updateMedication(data)
          .then((response) => {
            let data = response.postSuccess;
            if (data.error){
              Alert.alert(
                data.message,
                null,
                [{text: 'Close'}]
              )
            } else {
              const { navigate } = this.props.navigation;
              navigate('HomeScreen', {
                message: 'Medication',
              });
            }
          })
      }
    }).done()

  }

  handleMessageChange = (message: string) => {
    this.setState({ message })
  };


  handleKeyDown = (e) => {
    var keyType = '' ;
    const { selection,isPositionUpdated } = this.state ;
    if (isPositionUpdated == true){
      this.setState({isPositionUpdated:false})
      if (e.nativeEvent.key == "Backspace") {
        keyType = 'BackSpace'
      } else if (e.nativeEvent.key == "Enter"){
        Keyboard.dismiss()
      } else {
        keyType = 'Character'
      }
      var i1 = 0;
      var flag = 0;

      for (var i = 0; i < this.state.positionOfKeyWords.length; i++) {
        var object = this.state.positionOfKeyWords[i];
        if(selection.start <= this.state.positionOfKeyWords[this.state.positionOfKeyWords.length -1].end){
          if (selection.start > object.end && selection.start < this.state.positionOfKeyWords[i + 1].position) {
            i1 = i;
            const { start } = selection;
            flag =  1
          } else if (selection.start < object.position && i == 0) {
            i1 = -1;
            const { start } = selection;
            flag =  1 ;
          }

          if (flag == 1 && i > i1) {
            if (keyType == 'BackSpace') {
              object.position = object.position - 1
              object.end = object.end - 1
            } else if(keyType == 'Character') {
              object.position = object.position + 1
              object.end = object.end + 1
            }
            this.state.positionOfKeyWords[i] = object
            if (i == this.state.positionOfKeyWords.length -1) {
              flag = 0
            }
          }
        }
      }
    }

  };


  renderBackToScreen = () => {
    AsyncStorage.setItem("IsReview", "True");
    this.props.navigation.pop()
    var arrText = [];

    for (var i = 0; i <= this.state.positionOfKeyWords.length; i++) {
      var object = this.state.positionOfKeyWords[i];
      let strSub = ''
      if (i == 0){
        strSub = this.state.message.substring(0,object.position)
      }
      else if(i == this.state.positionOfKeyWords.length){
        strSub = this.state.message.substring(this.state.positionOfKeyWords[i - 1].end,this.state.message.length)
      }
      else {
        strSub = this.state.message.substring(this.state.positionOfKeyWords[i - 1].end,object.position)
      }
      arrText.push(strSub)
    }
    AsyncStorage.setItem("MessageArray", JSON.stringify(arrText));
  }

  render () {
    const {navigation, moods} = this.props;
    const {dosage, dosageGiven, dosageTaken, serviceUser, date,mood_2, mood_1,position1,position2,position3,position4,position5,position6} = this.state;
    const data = navigation.getParam('data');
    return (
      <View style={mainStyles.containerForm}>
        {!this.state.isValid && this._showAlert()}
        <View style={mainStyles.card} >
          <Navbar menuID={3} appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
          <TitleForm menuID={3} style={mainStyles.mt10}/>
        </View>
        <View style={styles.textInputView}>
          <TextInput multiline={true} editable={this.state.editable} onChangeText={this.handleMessageChange.bind(this)}
                     onSelectionChange={({ nativeEvent: { selection } }) => {
                       this.setState({ selection });
                       this.setState({isPositionUpdated:true})
                       for (var i = 0; i < this.state.positionOfKeyWords.length; i++) {
                         var object = this.state.positionOfKeyWords[i];
                         if(selection.start > object.position && selection.start < object.end){
                           this.setState({editable:false})
                           Keyboard.dismiss()
                           Alert.alert(
                             '',
                             'Sorry you can\'t edit that data here. Please go back to the note capture screen to edit that information',
                             [
                               {text: 'Continue', onPress: () => this.setState({editable:true})},
                               {text: 'go back to first screen', onPress: () => {this.renderBackToScreen()} , style: 'cancel'},
                             ],
                             { cancelable: false }
                           )
                         }else if (selection.start == object.position || selection.start == object.end){
                           this.setState({editable:false})
                           Keyboard.dismiss()
                           Alert.alert(
                             '',
                             'Sorry you can\'t edit that data here. Please go back to the note capture screen to edit that information',
                             [
                               {text: 'Continue', onPress: () => this.setState({editable:true})},
                               {text: 'go back to first screen', onPress: () => {this.renderBackToScreen()} , style: 'cancel'},
                             ],
                             { cancelable: false }
                           )
                         }
                       }
                     }}  onKeyPress={this.handleKeyDown} selectTextOnFocus={false} blurOnSubmit={true}>
            {position1}
            <Text style={styles.textHighlight}>{serviceUser}</Text>
            {position2}
            <Text style={styles.textHighlight}>{dosageGiven}</Text>
            {position3}
            <Text style={styles.textHighlight}>{dosageTaken ? 'was' : 'was not'}</Text>
            {position4}
            <Text style={styles.textHighlight}>{mood_2.length > 0 ? mood_1 + "," + mood_2 : mood_1 }</Text>
            {position5}
            <Text style={{backgroundColor: 'yellow'}}>{date}</Text>
            {position6}
          </TextInput>
        </View>
        <TouchableOpacity
          style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20, mainStyles.mh20]}
          onPress={() => this._submitForm()}>
          <Text style={[mainStyles.textSubmit]}>SAVE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  updateMedication: (dataObj) => EventDispatcher.UpdateMedication(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    moods: state.daily.moods
  };
}

export default connect(stateToProps, dispatchToProps)(MedicationsReview)

export const style = StyleSheet.create({
  textWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  }
})
