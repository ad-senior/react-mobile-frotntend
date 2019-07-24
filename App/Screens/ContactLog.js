import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Alert, AsyncStorage, Image} from 'react-native';
import Text from '../Components/CustomText';
import TextInput from '../Components/CustomTextInput';
import {connect} from 'react-redux';
import {EventDispatcher} from '../Actions';
import Geolocation from '../Components/Geolocation';
import MultiMood from '../Components/MultiMood';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import mainStyles from '../Themes/Styles';
import styles from './Styles/ContactLog';
import PickContactLog from "../Components/PickLocalStorage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {emptyString} from '../Common/Strings';
import images from '../Themes/Images';
import Data from '../Config/MockData';
import Picker from '../Components/Picker';
import UrgencyFlag from '../Components/UrgencyFlag';
class ContactLog extends Component {
    constructor (props) {
        super(props);
        this.state = {
            notes: undefined,
            notesAndThoughtsEmpty: false,
            type_of_visitEmpty: false,
            visitor: undefined,
            text: emptyString,
            description: emptyString,
            comments: emptyString,
            isValid: true,
            textEmpty: false,
            visitorEmpty: false,
            descriptionEmpty: false,
            commentEmpty: false,
            moodEmpty: false,
            moods: [],
            location: [null, null],
            urgencyFlag: Data.urgencyFlags[0].value
        };
    }

  componentDidMount = () => {
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

  _validation () {
      let isValid = this.state.isValid;
      let textEmpty = this.state.textEmpty;
      let visitorEmpty = this.state.visitorEmpty;
      let descriptionEmpty = this.state.descriptionEmpty;
      let commentEmpty = this.state.commentEmpty;
      let moodEmpty = this.state.moodEmpty;
      let notesAndThoughtsEmpty = this.state.notesAndThoughtsEmpty;
      let type_of_visitEmpty = this.state.type_of_visitEmpty;
      if (!this.state.text) {
          isValid = false;
          textEmpty = true;
      }
      if (this.state.visitor === undefined) {
          isValid = false;
          visitorEmpty = true;
      }
      if (!this.state.description) {
          isValid = false;
          descriptionEmpty = true;
      }
      if (!this.state.type_of_visit) {
          isValid = false;
          type_of_visitEmpty = true;
      }
      if (!this.state.comments) {
          isValid = false;
          commentEmpty = true;
      }
      if (this.state.moods.length < 1) {
          isValid = false;
          moodEmpty = true;
      }
      if (this.state.notesAndThoughts && (this.state.notes == undefined || this.state.notes == emptyString)) {
          isValid = false;
          notesAndThoughtsEmpty = true;
      }

      this.setState({
          isValid: isValid,
          textEmpty: textEmpty,
          visitorEmpty: visitorEmpty,
          descriptionEmpty: descriptionEmpty,
          commentEmpty: commentEmpty,
          moodEmpty: moodEmpty,
          notesAndThoughtsEmpty: notesAndThoughtsEmpty,
          type_of_visitEmpty: type_of_visitEmpty

      });

      return isValid;
  }

  _submitForm () {

      if (this._validation()) {

          const {serviceUser, user_id} = this.props;
          const data = {
              'urgency_flag': this.state.urgencyFlag,
              "visited_or_called_person": this.state.text,
              "su_interact": this.state.visitor,
              "description": this.state.description,
              "addition_comments": this.state.comments,
              "type_of_visit": this.state.type_of_visit,
              "mood_1": this.state.moods[0].id,
              "rating_1": this.state.moods[0].rating,
              "service_user": serviceUser.id,
              "created_by": user_id,
              "location": this.state.location,

          };
          if (this.state.notesAndThoughts)
              data.notes_and_thoughts = this.state.notes;

          keywords = [];
          keywords.visitor = this.state.visitor ? "interacted" : "did not interact";
          keywords.type_of_visit = this.state.type_of_visitText;

          if (this.state.moods.length > 1) {
              data["mood_2"] = this.state.moods[1].id;
              data["rating_2"] = this.state.moods[1].rating;
          }
          const {navigate} = this.props.navigation;
          let todoName = null;
          if (this.props.navigation.getParam('todoName')) {
            todoName = this.props.navigation.state.params.todoName;
          }
          data.name = todoName;
          AsyncStorage.getItem("IsReview").then((value) => {
              if (value == "True") {
                  navigate('ContactLogReviewScreen', {message: 'Contact', data});
              } else {
                  this.props.submitContactLog(data)
                      .then((response) => {
                          if (response.type === "POST_SUCCESS") {
                              let data = response.postSuccess;
                              if (data.error) {
                                  Alert.alert(
                                      JSON.stringify(data.message),
                                      null,
                                      [{text: 'Close'}]
                                  );
                              } else {
                                  navigate('ContactLogReviewScreen', {message: 'Contact', data, keywords});
                                  AsyncStorage.setItem("ReviewID", data.id.toString());
                              }
                          } else {
                              navigate('ContactLogReviewScreen', {message: 'Contact', data, keywords, offline: true});
                          }
                      });
              }
          }).done();

      }
  }

  _renderOptions () {
      if (this.state.type_of_visit)
          return (
              <View>
                  <View style={[{alignItems: "center", justifyContent: "center"}]}>
                      <Picker
                          hasShadow={true}
                          shadowColor="#0066FF"
                          style={mainStyles.picker}
                          placeholder={this.state.type_of_visitTitle}
                          data={Data.contactLogChoices}
                          onPress={(val) => this.setState({type_of_visit: val, type_of_visitEmpty: false})} />
                  </View>
                  {this._renderForm()}
              </View>);
      else
          return (
              <View style={[mainStyles.mt20, mainStyles.prl20, {alignItems: "center"}]}>
                  <Text>Select type of visit</Text>
                  <TouchableOpacity
                      style={[mainStyles.mt20, mainStyles.buttonInActive, {width: "100%", paddingVertical: 40, alignItems: "center", justifyContent: "center"}]}
                      onPress={() => this.setState({type_of_visit: Data.contactLogChoices[0].value, type_of_visitTitle: Data.contactLogChoices[0].label, type_of_visitText: Data.contactLogChoices[0].text})}
                  >
                      <Image style={styles.icon} source={images.arrowAndHouse} />
                      <Text>{Data.contactLogChoices[0].label}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={[mainStyles.mt20, mainStyles.buttonInActive, {width: "100%", paddingVertical: 40, alignItems: "center", justifyContent: "center"}]}
                      onPress={() => this.setState({type_of_visit: Data.contactLogChoices[1].value, type_of_visitTitle: Data.contactLogChoices[1].label, type_of_visitText: Data.contactLogChoices[1].text})}
                  >
                      <Image style={styles.icon} source={images.houseAndArrow} />
                      <Text>{Data.contactLogChoices[1].label}</Text>
                  </TouchableOpacity>
              </View>
          );
  }

  _renderForm () {
      switch (this.state.type_of_visit) {
      case Data.contactLogChoices[0].value:
          return (
              <View style={[mainStyles.mt10, mainStyles.prl20]}>
                  <View style={[mainStyles.textInputForm, styles.flexRow, {alignItems: "flex-end", paddingHorizontal: 0}]}>
                      <PickContactLog
                          key={Data.contactLogChoices[0].value + "Picker"}
                          storagekey="keyContactLogUserVisited"
                          style={this.state.textEmpty ? mainStyles.pickerRequired : mainStyles.picker}
                          placeholder={"Who visited/called?"}
                          styleText={{flex: 1}}
                          onPress={(text) => this.setState({text: text, textEmpty: false})} />
                  </View>
                  <View style={[mainStyles.mt20]}>
                      <Text style={this.state.visitorEmpty ? [mainStyles.mt10, mainStyles.itemRequired, mainStyles.textQuestion] : [mainStyles.mt10, mainStyles.textQuestion]}>
                Did visitor interact with SU?
                      </Text>
                  </View>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({visitor: false, visitorEmpty: false})}
                          style={this.state.visitor === false ? mainStyles.buttonActive : mainStyles.buttonInActive}
                      >
                          <View style={styles.textContainer} >
                              <Text style={this.state.visitor === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({visitor: true, visitorEmpty: false})}
                          style={this.state.visitor === true ? mainStyles.buttonActive : mainStyles.buttonInActive}
                      >
                          <View style={styles.textContainer} >
                              <Text style={this.state.visitor === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={[mainStyles.mt20]}>
                      <TextInput
                          style={this.state.descriptionEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
                          multiline={true}
                          numberOfLines={2}
                          placeholder="Give a short description of the visit/call"
                          onChangeText={(text) => this.setState({description: text, descriptionEmpty: false})}
                          value={this.state.description}
                          underlineColorAndroid='transparent' />
                  </View>
                  <View style={[mainStyles.mt20]}>
                      <TextInput
                          style={this.state.commentEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
                          multiline={true}
                          numberOfLines={2}
                          placeholder="Additional comments for future contacts..."
                          onChangeText={(text) => this.setState({comments: text, commentEmpty: false})}
                          value={this.state.comments}
                          underlineColorAndroid='transparent' />
                  </View>
                  <TouchableOpacity style={[mainStyles.notesThoughts, mainStyles.mt53]} onPress={() => this.setState({notesAndThoughts: !this.state.notesAndThoughts})}>
                      <Icon name="add-circle-outline" color="#0066FF" size={20} />
                      <Text style={mainStyles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
                  </TouchableOpacity>
                  {this.state.notesAndThoughts &&
              (<View style={[mainStyles.mt20, mainStyles.mb20]}>
                  <TextInput
                      style={[mainStyles.textInputForm, mainStyles.mt20]}
                      placeholder="Notes and thoughts"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.setState({notes: text, notesAndThoughtsEmpty: false})}
                      value={this.state.notes}

                  />
              </View>)
                  }
                  <View style={mainStyles.mt20}>
                      <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
                      <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
                      <UrgencyFlag onChoose={(item) => this.setState({urgencyFlag: item})}></UrgencyFlag>

                      <TouchableOpacity
                          style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20]}
                          onPress={() => this._submitForm()}>
                          <Text style={mainStyles.textSubmit}>Preview and save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );
      case Data.contactLogChoices[1].value:
          return (
              <View style={[mainStyles.mt10, mainStyles.prl20]}>
                  <View style={[mainStyles.textInputForm, styles.flexRow, {alignItems: "flex-end", paddingHorizontal: 0}]}>
                      <PickContactLog
                          key={Data.contactLogChoices[1].value + "Picker"}
                          storagekey={"keyContactLogUserWasVisited"}
                          style={this.state.textEmpty ? mainStyles.pickerRequired : mainStyles.picker}
                          placeholder={"Who was visited/called?"}
                          styleText={{flex: 1}}
                          onPress={(text) => this.setState({text: text, textEmpty: false})} />
                  </View>
                  <View style={[mainStyles.mt20]}>
                      <Text style={this.state.visitorEmpty ? [mainStyles.mt10, mainStyles.itemRequired, mainStyles.textQuestion] : [mainStyles.mt10, mainStyles.textQuestion]}>
                Did they interact with SU?
                      </Text>
                  </View>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({visitor: false, visitorEmpty: false})}
                          style={this.state.visitor === false ? mainStyles.buttonActive : mainStyles.buttonInActive}
                      >
                          <View style={styles.textContainer} >
                              <Text style={this.state.visitor === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({visitor: true, visitorEmpty: false})}
                          style={this.state.visitor === true ? mainStyles.buttonActive : mainStyles.buttonInActive}
                      >
                          <View style={styles.textContainer} >
                              <Text style={this.state.visitor === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View style={[mainStyles.mt20]}>
                      <TextInput
                          style={this.state.descriptionEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
                          multiline={true}
                          numberOfLines={2}
                          placeholder="Give a short description of the visit/call"
                          onChangeText={(text) => this.setState({description: text, descriptionEmpty: false})}
                          value={this.state.description}
                          underlineColorAndroid='transparent' />
                  </View>
                  <View style={[mainStyles.mt20]}>
                      <TextInput
                          style={this.state.commentEmpty ? [mainStyles.textInputForm, mainStyles.mt10, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt10]}
                          multiline={true}
                          numberOfLines={2}
                          placeholder="Additional comments for future contacts..."
                          onChangeText={(text) => this.setState({comments: text, commentEmpty: false})}
                          value={this.state.comments}
                          underlineColorAndroid='transparent' />
                  </View>
                  <TouchableOpacity style={[mainStyles.notesThoughts, mainStyles.mt53]} onPress={() => this.setState({notesAndThoughts: !this.state.notesAndThoughts})}>
                      <Icon name="add-circle-outline" color="#0066FF" size={20} />
                      <Text style={mainStyles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
                  </TouchableOpacity>
                  {this.state.notesAndThoughts &&
              (<View style={[mainStyles.mt20, mainStyles.mb20]}>
                  <TextInput
                      style={[mainStyles.textInputForm, mainStyles.mt20]}
                      placeholder="Notes and thoughts"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.setState({notes: text, notesAndThoughtsEmpty: false})}
                      value={this.state.notes}

                  />
              </View>)
                  }
                  <View style={mainStyles.mt20}>
                      <Text style={this.state.moodEmpty ? [mainStyles.mood, mainStyles.itemRequired] : mainStyles.mood}>SU mood is</Text>
                      <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
                      <UrgencyFlag onChoose={(item) => this.setState({urgencyFlag: item})}></UrgencyFlag>

                      <TouchableOpacity
                          style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20]}
                          onPress={() => this._submitForm()}>
                          <Text style={mainStyles.textSubmit}>Preview and save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );
      }


  }

  render () {
      return (
          <View style={mainStyles.containerForm}>
              <Geolocation onLocation={this._getLocation} />
              <ScrollView>
                  {!this.state.isValid && this._showAlert()}
                  <View style={mainStyles.card} >
                      <Navbar menuID={6} appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
                      <TitleForm menuID={6} style={mainStyles.mt10} />
                  </View>
                  {this._renderOptions()}
              </ScrollView>
          </View>
      );
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
};

export default connect(stateToProps, dispatchToProps)(ContactLog);
