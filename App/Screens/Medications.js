import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import Text from '../Components/CustomText';
import TextInput from '../Components/CustomTextInput';
import {connect} from 'react-redux';
import {EventDispatcher} from '../Actions';
import Geolocation from '../Components/Geolocation';
import PickerMedication from '../Components/PickLocalStorage';
import MultiMood from '../Components/MultiMood';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import mainStyles from '../Themes/Styles';
import styles from './Styles/Medications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {emptyString} from '../Common/Strings';
import {Data} from '../Config';
import ConsentGain from '../Components/ConsentGain';
import UrgencyFlag from '../Components/UrgencyFlag';
class Medications extends Component {
    constructor (props) {
        super(props);
        this.state = {
            consentGained: false,
            dosageTaken: undefined,
            dosageGiven: undefined,
            serviceUser: undefined,
            serviceUsers: undefined,
            description: emptyString,
            comments: emptyString,
            isValid: true,
            serviceUserEmpty: false,
            dosageGivenEmpty: false,
            dosageTakenEmpty: false,
            descriptionEmpty: false,
            commentEmpty: false,
            moodEmpty: false,
            moods: [],
            location: [null, null],
            notesThoughts: emptyString,
            urgencyFlag: Data.urgencyFlags[0].value
        };
    }

    componentDidMount () {
        const {serviceUsers} = this.props;
        //console.log('serviceUser', serviceUsers);
        this.setState({serviceUsers});
        AsyncStorage.setItem("IsReview", "False");
    }

    _showAlert () {
        Alert.alert(
            'Please complete the required information',
            emptyString,
            [{text: 'Close', onPress: () => this.setState({isValid: true})}]
        );
    }

  _getLocation = (loc) => {
      this.setState({location: loc});
  }

  _onPressConsent (consent) {
      this.setState({consentGained: consent});
  }

  _validation () {
      let isValid = this.state.isValid;
      let serviceUserEmpty = this.state.serviceUserEmpty;
      let dosageGivenEmpty = this.state.dosageGivenEmpty;
      let dosageTakenEmpty = this.state.dosageTakenEmpty;
      let descriptionEmpty = this.state.descriptionEmpty;
      let commentEmpty = this.state.commentEmpty;
      let moodEmpty = this.state.moodEmpty;


      if (!this.state.serviceUser) {
          isValid = false;
          serviceUserEmpty = true;
      }
      if (!this.state.dosageGiven) {
          isValid = false;
          dosageGivenEmpty = true;
      }
      if (this.state.dosageTaken === undefined) {
          isValid = false;
          dosageTakenEmpty = true;
      } else if (this.state.dosageTaken === false) {
          if (!this.state.description) {
              isValid = false;
              dosageTakenEmpty = true;
          }
      } else if (this.state.dosageTaken === true) {
          dosageTakenEmpty = false;
      }

      if (!this.state.description) {
          if (this.state.dosageTaken != true) {
              isValid = false;
              descriptionEmpty = true;
          }
      }

      if (this.state.moods.length < 1) {
          isValid = false;
          moodEmpty = true;
      }


      this.setState({
          isValid: isValid,
          serviceUserEmpty: serviceUserEmpty,
          dosageGivenEmpty: dosageGivenEmpty,
          dosageTakenEmpty: dosageTakenEmpty,
          descriptionEmpty: descriptionEmpty,
          commentEmpty: commentEmpty,
          moodEmpty: moodEmpty
      });

      return isValid;
  }

  _submitForm () {
      if (this._validation()) {
          const {serviceUser, user_id} = this.props;
          const data = {
              'urgency_flag': this.state.urgencyFlag,
              'dosage_given': this.state.dosageGiven,
              'whole_dosage_taken': this.state.dosageTaken,
              'whole_dosage_taken_reason': this.state.description,
              'comment_future_medication': this.state.comments,
              'mood_1': this.state.moods[0].id,
              'rating_1': this.state.moods[0].rating,
              'created_by': user_id,
              'medication_name': this.state.serviceUser,
              "service_user": serviceUser.id,
              'location': this.state.location,
              'notes_and_thoughts': this.state.notesThoughts
          };
          if (this.state.moods.length > 1) {
              data["mood_2"] = this.state.moods[1].id;
              data["rating_2"] = this.state.moods[1].rating;
          }
          const {navigate} = this.props.navigation;
          AsyncStorage.getItem("IsReview").then((value) => {
              if (value == "True") {
                  navigate('MedicationsReviewScreen', {message: 'Medication', data});
              } else {
                  this.props.submitMedication(data)
                      .then((response) => {
                          if (response.type === "POST_SUCCESS") {

                              let data = response.postSuccess;
                              if (data.error) {
                                  Alert.alert(
                                      data.message,
                                      null,
                                      [{text: 'Close'}]
                                  );
                              } else {
                                  navigate('MedicationsReviewScreen', {message: 'Medication', data});
                                  AsyncStorage.setItem("ReviewID", data.id.toString());
                              }
                          } else {
                              navigate('MedicationsReviewScreen', {message: 'Medication', data, keywords, offline: true});
                          }
                      });
              }
          }).done();
      }
  }

  _renderForm () {
      if (!this.state.serviceUsers) {
          return (<View></View>);
      } else {
          return (
              <View style={[mainStyles.mt20, mainStyles.prl20]}>
                  <Geolocation onLocation={this._getLocation} />
                  <PickerMedication
                      storagekey="medications"
                      style={this.state.serviceUserEmpty ? mainStyles.pickerRequired : mainStyles.picker}
                      placeholder="What medication has been administered?"
                      onPress={(val) => this.setState({serviceUser: val, serviceUserEmpty: false})} />
                  <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
                      <Text style={[mainStyles.textQuestion]}>Dosage given was</Text>
                  </View>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({dosageGiven: Data.dosageTaken[0].value})}
                          style={this.state.dosageGiven === Data.dosageTaken[0].value ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.dosageGiven === Data.dosageTaken[0].value ? styles.textActive : styles.textInActive}>{Data.dosageTaken[0].label}</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({dosageGiven: Data.dosageTaken[1].value})}
                          style={this.state.dosageGiven === Data.dosageTaken[1].value ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.dosageGiven === Data.dosageTaken[1].value ? styles.textActive : styles.textInActive}>{Data.dosageTaken[1].label}</Text>
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
                  {this.state.dosageTaken === false &&
            <TextInput
                style={this.state.descriptionEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
                placeholder="If not, why?"
                onChangeText={(text) => this.setState({description: text, descriptionEmpty: false})}
                value={this.state.description}
                underlineColorAndroid='transparent' />
                  }
                  <TouchableOpacity onPress={() => this.setState({show_notes: true})}>
                      <View style={styles.notesThoughts}>
                          <Icon name="add-circle-outline" color="#0066FF" size={20} />
                          <Text style={styles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
                      </View>
                  </TouchableOpacity>
                  {this.state.show_notes &&
            (<View style={[mainStyles.mt20, mainStyles.mb20]}>
                <TextInput
                    style={[mainStyles.textInputForm, mainStyles.mt20]}
                    placeholder="Notes and thoughts"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({notesThoughts: text})}
                />
            </View>)}

                  <View style={mainStyles.mt20}>
                      <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
                      <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
                      <UrgencyFlag onChoose={(item) => this.setState({urgencyFlag: item})}></UrgencyFlag>
                      <TouchableOpacity
                          style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20]}
                          onPress={() => this._submitForm()}>
                          <Text style={[mainStyles.textSubmit]}>Preview and save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );
      }
  }

  render () {
      return (
          <View style={mainStyles.containerForm}>
              <ScrollView>
                  {!this.state.isValid && this._showAlert()}
                  <View style={mainStyles.card} >
                      <Navbar menuID={3} appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
                      <TitleForm menuID={3} style={mainStyles.mt10} />
                  </View>
                  {!this.state.consentGained && <ConsentGain style={[mainStyles.mt10, mainStyles.prl20]} onPressConsent={this._onPressConsent.bind(this)} />}
                  {this.state.consentGained && this._renderForm()}
              </ScrollView>
          </View>
      );
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
};

export default connect(stateToProps, dispatchToProps)(Medications);
