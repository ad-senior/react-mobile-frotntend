import React, { Component } from 'react'
import { Alert } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux'
import { EventDispatcher } from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer"

class NightChecksReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moods: [],


    }
    this._loadKeywords()

    this._loadPositions()

  }


  _loadPositions = () => {
    const data = this.props.navigation.getParam('data');
    this.positions = []
    if (data.night_check == "GB") {
      this.positions[0] = "Service user went to sleep at ";
      this.positions[1] = ". Service User ";
      this.positions[2] = " wearing a pad and the bedrails ";
      this.positions[3] = " up. The mood was ";
      this.positions[4] = ". Note was submitted on "
      this.positions[5] = ". "

    }
    else {
      if (data.woken_up_during_night) {
        this.positions[0] = "Night check was done. Service User ";
        this.positions[1] = " wake up. The reason that Service User awoke was because ";
        this.positions[2] = ". The mood was "
        this.positions[3] = ". Note was submitted on "
        this.positions[4] = ". "
        
      }
      else {
        this.positions[0] = "Night check was done. Service User ";
        this.positions[1] = " wake up. The mood was ";
        this.positions[2] = ". Note was submitted on "
        this.positions[3] = ". "
      }
    }



  }
  _loadKeywords = () => {

    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    const keywords = navigation.getParam('keywords');
    this.keyWords = [];

    if (data.night_check == "GB") {

      this.keyWords[0] = data.sleep_time.toLowerCase()
      this.keyWords[1] = keywords.wearingPad.toLowerCase()
      this.keyWords[2] = keywords.bedrailsUp.toLowerCase()
      if (data.mood_2) {
        const index2 = _.findIndex(moods, ['id', data.mood_2]);
        this.state.mood_2 = moods[index2].name
        mood2 = moods[index2].name;
        this.keyWords[3] = moods[index2].name.toLowerCase()
      }
      if (data.mood_1) {
        const index1 = _.findIndex(moods, ['id', data.mood_1]);
        this.state.mood_1 = moods[index1].name
        this.keyWords[3] = this.keyWords[3] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[3] : moods[index1].name.toLowerCase()
      }
      else this.keyWords[3] = "NO_MOOD"
      this.keyWords[4] = Moment(data.created_on).format('DD-MM-YYYY')

    }
    else {
      if (data.woken_up_during_night) {
        this.keyWords[0] = keywords.wokenUp.toLowerCase()
        this.keyWords[1] = keywords.note.toLowerCase()
        if (data.mood_2) {
          const index2 = _.findIndex(moods, ['id', data.mood_2]);
          this.state.mood_2 = moods[index2].name
          mood2 = moods[index2].name;
          this.keyWords[2] = moods[index2].name.toLowerCase()
        }
        if (data.mood_1) {
          const index1 = _.findIndex(moods, ['id', data.mood_1]);
          this.state.mood_1 = moods[index1].name
          this.keyWords[2] = this.keyWords[2] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[2] : moods[index1].name.toLowerCase()
        }
        else this.keyWords[2] = "NO_MOOD"
        this.keyWords[3] = Moment(data.created_on).format('DD-MM-YYYY')
      }
      else {
        this.keyWords[0] = keywords.wokenUp.toLowerCase()
        if (data.mood_2) {
          const index2 = _.findIndex(moods, ['id', data.mood_2]);
          this.state.mood_2 = moods[index2].name
          mood2 = moods[index2].name;
          this.keyWords[1] = moods[index2].name.toLowerCase()
        }
        if (data.mood_1) {
          const index1 = _.findIndex(moods, ['id', data.mood_1]);
          this.state.mood_1 = moods[index1].name
          this.keyWords[1] = this.keyWords[1] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[1] : moods[index1].name.toLowerCase()
        }
        else this.keyWords[1] = "NO_MOOD"
        this.keyWords[2] = Moment(data.created_on).format('DD-MM-YYYY')
      }


    }


  }


  _showInValid = () => {
    Alert.alert(
      'Please complete the required information',
      '',
      [{ text: 'Close', onPress: () => this.setState({ isValid: true }) }]
    )
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
            message: 'Night check',
          });
        }
      })



  }

  render() {
    return (
      <Reviewer
        menuID={5}
        asyncStorage={(this.props.navigation.getParam('data').night_check) + (this.props.navigation.getParam('data').woken_up_during_night ? "woken_up_during_the_night" : "not_woken_up_during_the_night") + "NightChecksReviewPositions"}
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
  updateNote: (dataObj) => EventDispatcher.UpdateNightCheck(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    moods: state.daily.moods,
  };
}

export default connect(stateToProps, dispatchToProps)(NightChecksReview)
