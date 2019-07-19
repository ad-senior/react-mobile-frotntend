import React, {Component} from 'react';
import {Alert} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {EventDispatcher} from '../../Actions';
import Reviewer from "../Reviewer";
import {Data} from '../../Config';
class PersonalCareReview extends Component {
  eatingAmountChoices = [
      {
          label: "Quarter of portion",

      },
      {
          label: "Half of portion",

      },
      {
          label: "Third portion",

      },
      {
          label: "Full portion",

      }
  ]
  constructor (props) {
      super(props);
      this.sentData = false;
      this._loadKeywords();

      this._loadPositions();
  }


  _loadPositions = () => {
      this.positions = [];
      const subpage = this.props.navigation.getParam('data').care_provide;
      const data = this.props.navigation.getParam('data');
      switch (subpage) {
      case Data.careProvideChoices[0].value:
          this.positions[0] = "The ";
          this.positions[1] = " has been given. The Service User ";
          this.positions[2] = " brush their teeth/denture. Service User needs ";
          this.positions[3] = " and the mouth wash was ";
          if (data.notes_and_thoughts) {
            this.positions[4] = ". ";
            this.positions[5] = ". The mood was ";
            this.positions[6] = ". ";
          } else {
            this.positions[4] = ". The mood was ";
            this.positions[5] = ". ";
          }
          break;

      case Data.careProvideChoices[1].value:
          this.positions[0] = "The ";
          this.positions[1] = " has been given. The ";
          this.positions[2] = " was carried out and ";
          this.positions[3] = " was used to wash the Service User. Service User's hair ";
          this.positions[4] = " washed and hair ";
          this.positions[5] = " shaved. Service User needs ";
          this.positions[6] = " and ";
          this.positions[7] = " was used as an equipment. There was ";         
          if (data.notes_and_thoughts) {
            this.positions[8] = " needed to dry service user. ";
            this.positions[9] = ". The mood was ";
            this.positions[10] = ". ";
          } else {
            this.positions[8] = " needed to dry service user. The mood was ";
            this.positions[9] = ".  ";
          }
          break;
      case Data.careProvideChoices[2].value:
          this.positions[0] = " ";
          this.positions[1] = " chose the clothing. There was ";
          if (data.notes_and_thoughts) {
            this.positions[2] = " needed for choosing the clothing. ";
            this.positions[3] = ". The mood was ";
            this.positions[4] = ".  ";
          } else {
            this.positions[2] = " needed for choosing the clothing. The mood was ";
            this.positions[4] = ".  ";
          }
          break;
      case Data.careProvideChoices[3].value:
          this.positions[0] = "There was ";
          this.positions[1] = " needed for toileting. The equipment used was ";
          if (data.notes_and_thoughts) {
            this.positions[2] = ". ";
            this.positions[3] = ". The mood was ";
            this.positions[4] = ". ";
          } else {
            this.positions[2] = ". The mood was ";
            this.positions[3] = ". ";
          }
          break;
      }


  }
  _loadKeywords = () => {
      const {navigation, moods} = this.props;
      const data = navigation.getParam('data');
      const keywords = navigation.getParam('keywords');
      const subpage = this.props.navigation.getParam('data').care_provide;
      this.keyWords = [];
      switch (subpage) {
      case Data.careProvideChoices[0].value:
          this.keyWords[0] = "oral care";
          this.keyWords[1] = data.brush_teeth ? "did" : "did not";
          this.keyWords[2] = keywords.assistance.toLowerCase();
          this.keyWords[3] = data.mouth_wash_used ? "used" : "not used";
          if (data.notes_and_thoughts) {
            this.keyWords[4] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
            if (data.mood_2) {
                const index2 = _.findIndex(moods, ['id', data.mood_2]);
                mood2 = moods[index2].name;
                this.keyWords[5] = moods[index2].name.toLowerCase();
            }
            if (data.mood_1) {
                const index1 = _.findIndex(moods, ['id', data.mood_1]);
                this.keyWords[5] = this.keyWords[5] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[5] : moods[index1].name.toLowerCase();
            }
            else this.keyWords[5] = "NO_MOOD";
          } else {
            if (data.mood_2) {
                const index2 = _.findIndex(moods, ['id', data.mood_2]);
                mood2 = moods[index2].name;
                this.keyWords[4] = moods[index2].name.toLowerCase();
            }
            if (data.mood_1) {
                const index1 = _.findIndex(moods, ['id', data.mood_1]);
                this.keyWords[4] = this.keyWords[4] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[4] : moods[index1].name.toLowerCase();
            }
            else this.keyWords[4] = "NO_MOOD";
          }    

          break;

      case Data.careProvideChoices[1].value:
          this.keyWords[0] = "washing";
          this.keyWords[1] = keywords.personalCareCarriedText.toLowerCase();
          this.keyWords[2] = keywords.washUsedText.toLowerCase();
          this.keyWords[3] = data.hair_wash ? "was" : "was not";
          this.keyWords[4] = data.hair_shave ? "was" : "was not";
          this.keyWords[5] = keywords.assistance.toLowerCase();
          this.keyWords[6] = keywords.equipmentUsedText.toLowerCase();
          this.keyWords[7] = keywords.assistanceDryText.toLowerCase();
          if (data.notes_and_thoughts) {
            this.keyWords[8] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
            if (data.mood_2) {
                const index2 = _.findIndex(moods, ['id', data.mood_2]);
                mood2 = moods[index2].name;
                this.keyWords[9] = moods[index2].name.toLowerCase();
            }
            if (data.mood_1) {
                const index1 = _.findIndex(moods, ['id', data.mood_1]);
                this.keyWords[9] = this.keyWords[9] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[9] : moods[index1].name.toLowerCase();
            }
            else this.keyWords[9] = "NO_MOOD";
          } else {
            if (data.mood_2) {
                const index2 = _.findIndex(moods, ['id', data.mood_2]);
                mood2 = moods[index2].name;
                this.keyWords[8] = moods[index2].name.toLowerCase();
            }
            if (data.mood_1) {
                const index1 = _.findIndex(moods, ['id', data.mood_1]);
                this.keyWords[8] = this.keyWords[8] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[8] : moods[index1].name.toLowerCase();
            }
            else this.keyWords[8] = "NO_MOOD";
          } 
          break;
      case Data.careProvideChoices[2].value:
          this.keyWords[0] = keywords.suClothigText.charAt(0).toUpperCase() + keywords.suClothigText.slice(1).toLowerCase();
          this.keyWords[1] = keywords.assistance.toLowerCase();
          if (data.notes_and_thoughts) {
            this.keyWords[2] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
            if (data.mood_2) {
                const index2 = _.findIndex(moods, ['id', data.mood_2]);
                mood2 = moods[index2].name;
                this.keyWords[3] = moods[index2].name.toLowerCase();
            }
            if (data.mood_1) {
                const index1 = _.findIndex(moods, ['id', data.mood_1]);
                this.keyWords[3] = this.keyWords[3] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[3] : moods[index1].name.toLowerCase();
            }
            else this.keyWords[3] = "NO_MOOD";
          } else {
            if (data.mood_2) {
                const index2 = _.findIndex(moods, ['id', data.mood_2]);
                mood2 = moods[index2].name;
                this.keyWords[2] = moods[index2].name.toLowerCase();
            }
            if (data.mood_1) {
                const index1 = _.findIndex(moods, ['id', data.mood_1]);
                this.keyWords[2] = this.keyWords[2] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[2] : moods[index1].name.toLowerCase();
            }
            else this.keyWords[2] = "NO_MOOD";
          }
          break;
      case Data.careProvideChoices[3].value:
          this.keyWords[0] = keywords.assistance.toLowerCase();
          this.keyWords[1] = keywords.equipmentUsedText.toLowerCase();
          if (data.notes_and_thoughts) {
            this.keyWords[2] = data.notes_and_thoughts.charAt(0).toUpperCase() + data.notes_and_thoughts.slice(1).toLowerCase();
            if (data.mood_2) {
                const index2 = _.findIndex(moods, ['id', data.mood_2]);
                mood2 = moods[index2].name;
                this.keyWords[3] = moods[index2].name.toLowerCase();
            }
            if (data.mood_1) {
                const index1 = _.findIndex(moods, ['id', data.mood_1]);
                this.keyWords[3] = this.keyWords[3] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[3] : moods[index1].name.toLowerCase();
            }
            else this.keyWords[3] = "NO_MOOD";
          } else {
            if (data.mood_2) {
                const index2 = _.findIndex(moods, ['id', data.mood_2]);
                mood2 = moods[index2].name;
                this.keyWords[2] = moods[index2].name.toLowerCase();
            }
            if (data.mood_1) {
                const index1 = _.findIndex(moods, ['id', data.mood_1]);
                this.keyWords[2] = this.keyWords[2] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[2] : moods[index1].name.toLowerCase();
            }
            else this.keyWords[2] = "NO_MOOD";
          }
          break;
      }



  }

  componentWillUnmount = () => {
      if (!this.sentData && this.props.navigation.getParam('offline')) {
          const apiData = this.props.navigation.getParam('data');
          this.props.saveNote(apiData);

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
              message: 'PersonalCare',
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
                                  JSON.stringify(data),
                                  null,
                                  [{text: 'Close'}]
                              );
                          } else {
                              const {navigate} = this.props.navigation;
                              navigate('HomeScreen', {
                                  message: 'PersonalCare',
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
                  message: 'PersonalCare',
              });
          }
      }
  }

  render () {
      return (
          <Reviewer
              menuID={2}
              asyncStorage={this.props.navigation.getParam('data').care_provide + "ReviewPosition"}
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
    updateNote: (dataObj) => dispatch(EventDispatcher.UpdatePersonalCareOffline(dataObj)),
    saveNote: (dataObj) => dispatch(EventDispatcher.PostPersonalCareOffline(dataObj))
});

const stateToProps = (state) => {
    return {
        serviceUsers: state.serviceuser.results,
        serviceUser: state.serviceuser.user,
        user_id: state.login.user_id,
        moods: state.daily.moods,
    };
};

export default connect(stateToProps, dispatchToProps)(PersonalCareReview);
