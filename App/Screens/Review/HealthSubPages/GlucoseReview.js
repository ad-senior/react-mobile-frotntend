import React, {Component} from 'react';
import {Alert} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {EventDispatcher} from '../../../Actions';
import Reviewer from "../../Reviewer";
import {emptyString} from '../../../Common/Strings';
class BloodTestReview extends Component {
    constructor (props) {
        super(props);
        this.sentData = false;
        this._loadKeywords();

        this._loadPositions();
    }
  componentWillUnmount = () => {
      if (!this.sentData && this.props.navigation.getParam('offline')) {
          const apiData = this.props.navigation.getParam('data');
          this.props.saveNote(apiData);

      }
  }
  _loadPositions = () => {
      const {navigation} = this.props;
      const data = navigation.getParam('data');

      this.positions = [];
      this.positions[0] = "The ";
      this.positions[1] = " was tested on ";
      this.positions[2] = " at ";
      this.positions[3] = ". Doctor ";
      if (data.glucose_level != emptyString) {
          this.positions[4] = " referred. The glucose level was ";
          if (data.notes_and_thoughts) {
              this.positions[5] = ". ";
              this.positions[6] = ". The mood was ";
              this.positions[7] = ". ";
          }
          else {
              this.positions[5] = ". The mood was ";
              this.positions[6] = ". ";
          }
      }
      else {
          if (data.notes_and_thoughts) {
              this.positions[4] = " referred. ";
              this.positions[5] = ". The mood was ";
              this.positions[6] = ". ";
          }
          else {
              this.positions[4] = " referred. The mood was ";
              this.positions[5] = ". ";
          }
      }



  }
  _loadKeywords = () => {
      const {navigation, moods} = this.props;
      const data = navigation.getParam('data');
      const keywords = navigation.getParam('keywords');
      this.keyWords = [];
      this.keyWords[0] = "glucose level";
      this.keyWords[1] = data.date;
      this.keyWords[2] = data.where.toLowerCase();
      this.keyWords[3] = keywords.referred.toLowerCase();
      if (data.glucose_level != emptyString) {

          this.keyWords[4] = data.glucose_level.toLowerCase();
          if (data.notes_and_thoughts) {
              this.keyWords[5] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
              if (data.mood_2) {
                  const index2 = _.findIndex(moods, ['id', data.mood_2]);
                  mood2 = moods[index2].name;
                  this.keyWords[6] = moods[index2].name.toLowerCase();
              }
              if (data.mood_1) {
                  const index1 = _.findIndex(moods, ['id', data.mood_1]);
                  this.keyWords[6] = this.keyWords[6] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[6] : moods[index1].name.toLowerCase();
              }
              else this.keyWords[6] = "NO_MOOD";
          }
          else {
              if (data.mood_2) {
                  const index2 = _.findIndex(moods, ['id', data.mood_2]);
                  mood2 = moods[index2].name;
                  this.keyWords[5] = moods[index2].name;
              }
              if (data.mood_1) {
                  const index1 = _.findIndex(moods, ['id', data.mood_1]);
                  this.keyWords[5] = this.keyWords[5] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[5] : moods[index1].name.toLowerCase();
              }
              else this.keyWords[5] = "NO_MOOD";
          }
      }
      else {

          if (data.notes_and_thoughts) {
              this.keyWords[4] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
              if (data.mood_2) {
                  const index2 = _.findIndex(moods, ['id', data.mood_2]);
                  mood2 = moods[index2].name;
                  this.keyWords[5] = moods[index2].name;
              }
              if (data.mood_1) {
                  const index1 = _.findIndex(moods, ['id', data.mood_1]);
                  this.keyWords[5] = this.keyWords[5] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[5] : moods[index1].name.toLowerCase();
              }
              else this.keyWords[5] = "NO_MOOD";
          }
          else {
              if (data.mood_2) {
                  const index2 = _.findIndex(moods, ['id', data.mood_2]);
                  mood2 = moods[index2].name;
                  this.keyWords[4] = moods[index2].name;
              }
              if (data.mood_1) {
                  const index1 = _.findIndex(moods, ['id', data.mood_1]);
                  this.keyWords[4] = this.keyWords[4] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[4] : moods[index1].name.toLowerCase();
              }
              else this.keyWords[4] = "NO_MOOD";
          }

      }



  }
  _saveFullDescription = (reviewerData) => {
      if (!this.props.navigation.getParam('offline')) {
          const apiData = this.props.navigation.getParam('data');

          apiData.id = reviewerData.id;
          apiData.full_description = reviewerData.message;
          this.props.updateNote(apiData);
      }
  }


  _submitForm = (reviewerData) => {
      const apiData = this.props.navigation.getParam('data');
      this.sentData = true;

      apiData.full_description = reviewerData.message;
      if (this.props.navigation.getParam('offline')) {

          this.props.saveNote(apiData);
          const {navigate} = this.props.navigation;
          navigate('HomeScreen', {
              message: 'Glucose level',
          });
      }
      else {
          apiData.id = reviewerData.id;
          try {
              this.props.updateNote(apiData)
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
                              const {navigate} = this.props.navigation;
                              navigate('HomeScreen', {
                                  message: 'Glucose level',
                              });
                          }
                      } else {
                          Alert.alert(
                              "An error happened while trying to send data.",
                              null,
                              [{text: 'Close'}]
                          );
                      }
                  });

          } catch (err) {
              const {navigate} = this.props.navigation;
              navigate('HomeScreen', {
                  message: 'Glucose level',
              });
          }
      }

  }

  render () {
      return (
          <Reviewer
              menuID={1}
              asyncStorage={(this.props.navigation.getParam('data').notes_and_thoughts ? "notes" : "no_notes") + (this.props.navigation.getParam('data').glucose_level != emptyString ? "glucoseLevel" : "no_glucoseLevel") + "Glucose Level ReviewPositions"}
              positions={this.positions}
              keywords={this.keyWords}
              _submitForm={data => this._submitForm(data)}
              _saveFullDescription={data => this._saveFullDescription(data)}
              navigation={this.props.navigation}
          ></Reviewer>
      );
  }
}

const dispatchToProps = (dispatch) => ({
    updateNote: (dataObj) => dispatch(EventDispatcher.UpdateHealthOffline(dataObj)),
    saveNote: (dataObj) => dispatch(EventDispatcher.PostHealthOffline(dataObj))
});

const stateToProps = (state) => {
    return {
        serviceUsers: state.serviceuser.results,
        serviceUser: state.serviceuser.user,
        user_id: state.login.user_id,
        moods: state.daily.moods,
    };
};

export default connect(stateToProps, dispatchToProps)(BloodTestReview);
