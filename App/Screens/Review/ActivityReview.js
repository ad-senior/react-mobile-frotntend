import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux'
import { EventDispatcher } from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer"
class ActivityReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
       moods: [],
      

    }
    this._loadKeywords()

    this._loadPositions()

  }


  _loadPositions = () => {
    this.positions = []
    this.positions[0] = "Service User took ";
    this.positions[1] = " and the activity was ";
    this.positions[2] = ". Location of the activity was ";
    this.positions[3] = " and used ";
    this.positions[4] = " to engage the activity. The activity lasted ";
    this.positions[5] = " and requested "
    this.positions[6] = ". Service User "
    this.positions[7] = " to take part in this activity again in the future. The mood was "
    this.positions[8] = ". Note was submitted on "
    this.positions[9] = ". The mood was "
    this.positions[10] = ". "


  }
  _loadKeywords = () => {
    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    const keywords = navigation.getParam('keywords');
    this.keyWords = [];
    this.keyWords[0] = keywords.activityTypeText;
    this.keyWords[1] = data.activity_place_description
    this.keyWords[2] = data.activity_description
    this.keyWords[3] = keywords.indoor
    this.keyWords[4] = keywords.engagedText
    this.keyWords[5] = data.activity_duration
    this.keyWords[6] = data.activity_future_request
    this.keyWords[7] = keywords.requested
    if (data.mood_2) {
      const index2 = _.findIndex(moods, ['id', data.mood_2]);
      this.state.mood_2 = moods[index2].name
      mood2 = moods[index2].name;
      this.keyWords[8] = moods[index2].name
    }
    if (data.mood_1) {
      const index1 = _.findIndex(moods, ['id', data.mood_1]);
      this.state.mood_1 = moods[index1].name
      this.keyWords[8] = this.keyWords[8] ? moods[index1].name + ", " + this.keyWords[8] : moods[index1].name
    }
    else this.keyWords[8] = "NO_MOOD"

    this.keyWords[9] = Moment(data.created_on).format('DD-MM-YYYY')

  }

  _saveFullDescription = (reviewerData) => { 
    const apiData = this.props.navigation.getParam('data');

    apiData.id = reviewerData.id;
    apiData.full_description = reviewerData.message
    this.props.updateNote(apiData)
  }

  _submitForm(reviewerData) {
    const apiData = this.props.navigation.getParam('data');

    apiData.id = reviewerData.id;
    apiData.full_description = reviewerData.message
    this.props.updateNote(apiData)
      .then((response) => {
        let data = response.postSuccess;
        if (data.error) {
          Alert.alert(
            JSON.stringify(data.message),
            null,
            [{ text: 'Close' }]
          )
        } else {
          const { navigate } = this.props.navigation;
          navigate('HomeScreen', {
            message: 'Activity',
          });
        }
      })



  }

  render() {
    return (
      <Reviewer
        menuID={7}
        asyncStorage="ActivityReviewPositions"
        positions={this.positions}
        keywords={this.keyWords}
        _submitForm={data => this._submitForm(data)}
        _saveFullDescription={data => this._saveFullDescription(data)}
        navigation={this.props.navigation}
      ></Reviewer>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  updateNote: (dataObj) => EventDispatcher.UpdateActivity(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    moods: state.daily.moods,
  };
}

export default connect(stateToProps, dispatchToProps)(ActivityReview)
