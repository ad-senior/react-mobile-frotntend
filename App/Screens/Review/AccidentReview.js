import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux'
import { EventDispatcher } from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer"
import { Data } from '../../Config';
class MealReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moods: [],


    }
    this._loadKeywords()

    this._loadPositions()

  }


  _loadPositions = () => {
    const keywords = this.props.navigation.getParam('keywords');
    this.positions = []
    this.positions[0] = " ";
    this.positions[1] = " happened and lasted for ";
    this.positions[2] = ". Service User ";
    this.positions[3] = " being aggressive and ";
    if (keywords.twocalled)
      this.positions[4] = " have been called.\nThe incident was reported to ";
    else
      this.positions[4] = " has been called.\nThe incident was reported to ";
    this.positions[5] = ".\nService User said "
    this.positions[6] = " and the incident was resolved by "
    this.positions[7] = ". \nThe mood was "
    this.positions[8] = ".\nNote was submitted on "
    this.positions[9] = ". "


  }
  _loadKeywords = () => {
    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    const keywords = navigation.getParam('keywords');
    this.keyWords = [];
    this.keyWords[0] = data.incident_description.charAt(0).toUpperCase() + data.incident_description.slice(1).toLowerCase()
    this.keyWords[1] = data.incident_time.toLowerCase()
    this.keyWords[2] = keywords.beginAggressive.toLowerCase()
    this.keyWords[3] = keywords.called.toLowerCase()
    this.keyWords[4] = keywords.reportToText.toLowerCase()
    this.keyWords[5] = data.su_comments.toLowerCase()
    this.keyWords[6] = data.resolved.toLowerCase()
    if (data.mood_2) {
      const index2 = _.findIndex(moods, ['id', data.mood_2]);
      this.state.mood_2 = moods[index2].name
      mood2 = moods[index2].name;
      this.keyWords[7] = moods[index2].name
    }
    if (data.mood_1) {
      const index1 = _.findIndex(moods, ['id', data.mood_1]);
      this.state.mood_1 = moods[index1].name
      this.keyWords[7] = this.keyWords[7] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[7] : moods[index1].name.toLowerCase()
    }
    else this.keyWords[7] = "NO_MOOD"

    this.keyWords[8] = Moment(data.created_on).format('DD-MM-YYYY')

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
            message: 'Accident',
          });
        }
      })



  }

  render() {
    return (
      <Reviewer
        menuID={0}
        asyncStorage={this.props.navigation.getParam('keywords').twocalled.toString()+"AccidentReviewPositions"}
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
  updateNote: (dataObj) => EventDispatcher.UpdateIncident(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    moods: state.daily.moods,
  };
}

export default connect(stateToProps, dispatchToProps)(MealReview)
