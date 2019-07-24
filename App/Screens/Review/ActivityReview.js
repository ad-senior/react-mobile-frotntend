import React, {Component} from 'react';
import {Alert} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {EventDispatcher} from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer";
class ActivityReview extends Component {
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
      this.positions = [];
      this.positions[0] = "Service User took ";
      this.positions[1] = " and the activity was ";
      this.positions[2] = ". Location of the activity was ";
      this.positions[3] = " and used ";
      this.positions[4] = " to engage the activity. The activity lasted ";
      this.positions[5] = " and requested ";
      this.positions[6] = ". Service User ";
      this.positions[7] = " to take part in this activity again in the future. The mood was ";
      this.positions[8] = ".\nNote was submitted on ";
      this.positions[9] = ". ";


  }
  _loadKeywords = () => {
      const {navigation, moods} = this.props;
      const data = navigation.getParam('data');
      const keywords = navigation.getParam('keywords');
      this.keyWords = [];
      this.keyWords[0] = keywords.activityTypeText.toLowerCase();
      this.keyWords[1] = data.activity_description.toLowerCase();
      this.keyWords[2] = keywords.indoor.toLowerCase();
      this.keyWords[3] = keywords.engagedText.toLowerCase();
      this.keyWords[4] = data.activity_duration.toLowerCase();
      this.keyWords[5] = data.activity_future_request.toLowerCase();
      this.keyWords[6] = keywords.requested.toLowerCase();
      if (data.mood_2) {
          const index2 = _.findIndex(moods, ['id', data.mood_2]);
          mood2 = moods[index2].name;
          this.keyWords[7] = moods[index2].name.toLowerCase();
      }
      if (data.mood_1) {
          const index1 = _.findIndex(moods, ['id', data.mood_1]);
          this.keyWords[7] = this.keyWords[7] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[7] : moods[index1].name.toLowerCase();
      }
      else this.keyWords[7] = "NO_MOOD";

      this.keyWords[8] = Moment(data.created_on).format('DD-MM-YYYY');

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
              message: 'Activity',
              updateDate: true
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
                                  message: 'Activity',
                                  updateDate: true
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
                  message: 'Activity',
              });
          }
      }

  }

  render () {
      return (
          <Reviewer
              menuID={7}
              asyncStorage="ActivityReviewPosition"
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
    updateNote: (dataObj) => dispatch(EventDispatcher.UpdateActivityOffline(dataObj)),
    saveNote: (dataObj) => dispatch(EventDispatcher.PostActivityOffline(dataObj))
});

const stateToProps = (state) => {
    return {
        serviceUsers: state.serviceuser.results,
        serviceUser: state.serviceuser.user,
        user_id: state.login.user_id,
        moods: state.daily.moods,
    };
};

export default connect(stateToProps, dispatchToProps)(ActivityReview);
