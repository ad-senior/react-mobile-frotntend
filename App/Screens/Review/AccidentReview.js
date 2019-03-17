import React, {Component} from 'react';
import {Alert} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {EventDispatcher} from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer";
class MealReview extends Component {
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
      const keywords = this.props.navigation.getParam('keywords');
      this.positions = [];
      this.positions[0] = " ";
      this.positions[1] = " happened and lasted for ";
      this.positions[2] = ". Incident happened at ";
      this.positions[3] = ". ";
      this.positions[4] = " was present. Service User ";
      this.positions[5] = " being aggressive and ";
      if (keywords.twocalled)
          this.positions[6] = " have been called.\nThe incident was reported to ";
      else
          this.positions[6] = " has been called.\nThe incident was reported to ";
      this.positions[7] = ".\nService User said ";
      this.positions[8] = " and the incident was resolved by ";
      this.positions[9] = ". \nThe mood was ";
      this.positions[10] = ".\nNote was submitted on ";
      this.positions[11] = ". ";


  }
  _loadKeywords = () => {
      const {navigation, moods} = this.props;
      const data = navigation.getParam('data');
      const keywords = navigation.getParam('keywords');
      this.keyWords = [];
      this.keyWords[0] = data.incident_description.charAt(0).toUpperCase() + data.incident_description.slice(1).toLowerCase();
      this.keyWords[1] = keywords.incident_duration;
      this.keyWords[2] = data.incident_time;
      this.keyWords[3] = data.who_was_present.charAt(0).toUpperCase() + data.who_was_present.slice(1).toLowerCase();
      this.keyWords[4] = keywords.beginAggressive.toLowerCase();
      this.keyWords[5] = keywords.called.toLowerCase();
      this.keyWords[6] = keywords.reportToText.toLowerCase();
      this.keyWords[7] = data.su_comments.toLowerCase();
      this.keyWords[8] = data.resolved.toLowerCase();
      if (data.mood_2) {
          const index2 = _.findIndex(moods, ['id', data.mood_2]);
          mood2 = moods[index2].name;
          this.keyWords[9] = moods[index2].name;
      }
      if (data.mood_1) {
          const index1 = _.findIndex(moods, ['id', data.mood_1]);
          this.keyWords[9] = this.keyWords[9] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[9] : moods[index1].name.toLowerCase();
      }
      else this.keyWords[9] = "NO_MOOD";

      this.keyWords[10] = Moment(data.created_on).format('DD-MM-YYYY');

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
              message: 'Accident',
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
                                  message: 'Accident',
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
                  message: 'Accident',
              });
          }
      }

  }

  render () {
      return (
          <Reviewer
              menuID={0}
              asyncStorage={this.props.navigation.getParam('keywords').twocalled.toString() + "AccidentReviewPositions"}
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
    updateNote: (dataObj) => dispatch(EventDispatcher.UpdateIncidentOffline(dataObj)),
    saveNote: (dataObj) => dispatch(EventDispatcher.PostAccidentOffline(dataObj))
});

const stateToProps = (state) => {
    return {
        serviceUsers: state.serviceuser.results,
        serviceUser: state.serviceuser.user,
        user_id: state.login.user_id,
        moods: state.daily.moods,
    };
};

export default connect(stateToProps, dispatchToProps)(MealReview);
