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
      this.positions[3] = ". SU ";
      if (data.wound_care_location != emptyString) {
          this.positions[4] = " referred to Doctor. The location of the wound was ";
          if (data.wound_care_size != emptyString) {
              this.positions[5] = ". The size of the wound was ";
              if (data.wound_care_provided != emptyString) {
                  this.positions[6] = " and ";
                  this.positions[7] = ". ";
                  if (data.notes_and_thoughts) {
                      this.positions[8] = " ";
                      this.positions[9] = ". The mood was ";
                      this.positions[10] = ". ";
                  }
                  else {
                      this.positions[8] = ". The mood was ";
                      this.positions[9] = ". ";
                  }
              } else {
                  this.positions[6] = ". ";

                  if (data.notes_and_thoughts) {
                      this.positions[7] = ". ";
                      this.positions[8] = ". The mood was ";
                      this.positions[9] = ". ";
                  }
                  else {
                      this.positions[7] = ". The mood was ";
                      this.positions[8] = ". ";
                  }
              }

          }
          else {
              if (data.wound_care_provided != emptyString) {
                  this.positions[5] = ". ";
                  this.positions[6] = ". ";
                  if (data.notes_and_thoughts) {
                      this.positions[7] = ". ";
                      this.positions[8] = ". The mood was ";
                      this.positions[9] = ". ";
                  }
                  else {
                      this.positions[7] = ". The mood was ";
                      this.positions[8] = ". ";
                  }
              } else {
                  this.positions[5] = ". ";
                  if (data.notes_and_thoughts) {
                      this.positions[6] = ". ";
                      this.positions[7] = ". The mood was ";
                      this.positions[8] = ". ";
                  }
                  else {
                      this.positions[6] = ". The mood was ";
                      this.positions[7] = ". ";
                  }
              }
          }
      }
      else {
          if (data.wound_care_size != emptyString) {
              this.positions[4] = " referred . The size of the wound was ";
              if (data.wound_care_provided != emptyString) {
                  this.positions[5] = " and ";
                  this.positions[6] = ". ";
                  if (data.notes_and_thoughts) {
                      this.positions[7] = ". ";
                      this.positions[8] = ". The mood was ";
                      this.positions[9] = ". ";
                  }
                  else {
                      this.positions[7] = ". The mood was ";
                      this.positions[8] = ". ";
                  }
              } else {
                  this.positions[5] = ". ";

                  if (data.notes_and_thoughts) {
                      this.positions[6] = ". ";
                      this.positions[7] = ". The mood was ";
                      this.positions[8] = ". ";
                  }
                  else {
                      this.positions[6] = ". The mood was ";
                      this.positions[7] = ". ";
                  }
              }

          }
          else {
              if (data.wound_care_provided != emptyString) {
                  this.positions[4] = " referred to Doctor. ";
                  this.positions[5] = ". ";
                  if (data.notes_and_thoughts) {
                      this.positions[6] = ". ";
                      this.positions[7] = ". The mood was ";
                      this.positions[8] = ". ";
                  }
                  else {
                      this.positions[6] = ". The mood was ";
                      this.positions[7] = ". ";
                  }
              } else {
                  this.positions[4] = " referred to Doctor. ";
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
          }
      }
  }

  _loadKeywords = () => {
      const {navigation, moods} = this.props;
      const data = navigation.getParam('data');
      const keywords = navigation.getParam('keywords');
      this.keyWords = [];
      this.keyWords[0] = "wound care";
      this.keyWords[1] = data.date.toLowerCase();
      this.keyWords[2] = data.where.toLowerCase();
      this.keyWords[3] = keywords.referred.toLowerCase();
      if (data.wound_care_location != emptyString) {
          this.keyWords[4] = data.wound_care_location.toLowerCase();
          if (data.wound_care_size != emptyString) {

              this.keyWords[5] = data.wound_care_size.toLowerCase();
              if (data.wound_care_provided != emptyString) {
                  this.keyWords[6] = data.wound_care_provided.toLowerCase();
                  this.keyWords[7] = data.wound_care_further_actions.charAt(0).toUpperCase() + data.wound_care_further_actions.slice(1).toLowerCase();
                  if (data.notes_and_thoughts) {
                      this.keyWords[8] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[9] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[9] = this.keyWords[9] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[9] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[9] = "NO_MOOD";
                  }
                  else {
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[8] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[8] = this.keyWords[8] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[8] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[8] = "NO_MOOD";
                  }
              } else {
                  this.keyWords[6] = data.wound_care_further_actions.charAt(0).toUpperCase() + data.wound_care_further_actions.slice(1).toLowerCase();
                  if (data.notes_and_thoughts) {
                      this.keyWords[7] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[8] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[8] = this.keyWords[8] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[8] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[8] = "NO_MOOD";
                  }
                  else {
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[7] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[7] = this.keyWords[7] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[7] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[7] = "NO_MOOD";
                  }
              }


          }
          else {
              if (data.wound_care_provided != emptyString) {
                  this.keyWords[5] = data.wound_care_provided.charAt(0).toUpperCase() + data.wound_care_provided.slice(1).toLowerCase();
                  this.keyWords[6] = data.wound_care_further_actions.charAt(0).toUpperCase() + data.wound_care_further_actions.slice(1).toLowerCase();
                  if (data.notes_and_thoughts) {
                      this.keyWords[7] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[8] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[8] = this.keyWords[8] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[8] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[8] = "NO_MOOD";
                  }
                  else {
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[7] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[7] = this.keyWords[7] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[7] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[7] = "NO_MOOD";
                  }
              } else {
                  this.keyWords[5] = data.wound_care_further_actions.charAt(0).toUpperCase() + data.wound_care_further_actions.slice(1).toLowerCase();
                  if (data.notes_and_thoughts) {
                      this.keyWords[6] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[7] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[7] = this.keyWords[7] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[7] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[7] = "NO_MOOD";
                  }
                  else {
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[6] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[6] = this.keyWords[6] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[6] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[6] = "NO_MOOD";
                  }
              }

          }
      }
      else {
          if (data.wound_care_size != emptyString) {

              this.keyWords[4] = data.wound_care_size;
              if (data.wound_care_provided != emptyString) {
                  this.keyWords[5] = data.wound_care_provided.toLowerCase();
                  this.keyWords[6] = data.wound_care_further_actions.charAt(0).toUpperCase() + data.wound_care_further_actions.slice(1).toLowerCase();
                  if (data.notes_and_thoughts) {
                      this.keyWords[7] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[8] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[8] = this.keyWords[8] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[8] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[8] = "NO_MOOD";
                  }
                  else {
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[7] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[7] = this.keyWords[7] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[7] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[7] = "NO_MOOD";
                  }
              } else {
                  this.keyWords[5] = data.wound_care_further_actions.charAt(0).toUpperCase() + data.wound_care_further_actions.slice(1).toLowerCase();
                  if (data.notes_and_thoughts) {
                      this.keyWords[6] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[7] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[7] = this.keyWords[7] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[7] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[7] = "NO_MOOD";
                  }
                  else {
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[6] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[6] = this.keyWords[6] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[6] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[6] = "NO_MOOD";
                  }
              }


          }
          else {
              if (data.wound_care_provided != emptyString) {
                  this.keyWords[4] = data.wound_care_provided.charAt(0).toUpperCase() + data.wound_care_provided.slice(1).toLowerCase();
                  this.keyWords[5] = data.wound_care_further_actions.charAt(0).toUpperCase() + data.wound_care_further_actions.slice(1).toLowerCase();
                  if (data.notes_and_thoughts) {
                      this.keyWords[6] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[7] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[7] = this.keyWords[7] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[7] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[7] = "NO_MOOD";
                  }
                  else {
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[6] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[6] = this.keyWords[6] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[6] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[6] = "NO_MOOD";
                  }
              } else {
                  this.keyWords[4] = data.wound_care_further_actions.charAt(0).toUpperCase() + data.wound_care_further_actions.slice(1).toLowerCase();
                  if (data.notes_and_thoughts) {
                      this.keyWords[5] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
                      if (data.mood_2) {
                          const index2 = _.findIndex(moods, ['id', data.mood_2]);
                          mood2 = moods[index2].name.toLowerCase();
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
                          mood2 = moods[index2].name.toLowerCase();
                          this.keyWords[5] = moods[index2].name.toLowerCase();
                      }
                      if (data.mood_1) {
                          const index1 = _.findIndex(moods, ['id', data.mood_1]);
                          this.keyWords[5] = this.keyWords[5] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[5] : moods[index1].name.toLowerCase();
                      }
                      else this.keyWords[5] = "NO_MOOD";
                  }
              }

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

  _submitForm (reviewerData) {
      const apiData = this.props.navigation.getParam('data');
      this.sentData = true;

      apiData.full_description = reviewerData.message;
      if (this.props.navigation.getParam('offline')) {

          this.props.saveNote(apiData);
          const {navigate} = this.props.navigation;
          navigate('HomeScreen', {
              message: 'Wound care',
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
                                  message: 'Wound care',
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
                  message: 'Wound care',
              });
          }
      }

  }

  render () {
      return (
          <Reviewer
              menuID={1}
              asyncStorage={
                  (this.props.navigation.getParam('data').notes_and_thoughts ? "notes" : "no_notes") +
          (this.props.navigation.getParam('data').wound_care_location != emptyString ? "wound_care_location" : "no_wound_care_location") +
          (this.props.navigation.getParam('data').wound_care_size != emptyString ? "wound_care_size" : "no_wound_care_size") +
          (this.props.navigation.getParam('data').wound_care_provided != emptyString ? "provided" : "no_provided") +
          "Wound Care Review"}
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
