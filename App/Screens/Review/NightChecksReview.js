import React, { Component } from 'react'
import { Alert} from 'react-native';
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
    if (data.woken_up_during_night) {
      this.positions = []
      this.positions[0] = "Service user went to sleep at ";
      this.positions[1] = ". Service User ";
      this.positions[2] = " wearing a pad and the bedrails ";
      this.positions[3] = " up. Service User ";
      this.positions[4] = " wake up during the night. The reason that Service User awoke was because ";
      this.positions[5] = ". The mood was "
      this.positions[6] = ". Note was submitted on "
      this.positions[7] = ". "
    }
    else {
      this.positions = []
      this.positions[0] = "Service user went to sleep at ";
      this.positions[1] = ". Service User ";
      this.positions[2] = " wearing a pad and the bedrails ";
      this.positions[3] = " up. Service User ";
      this.positions[4] = " wake up during the night. The mood was ";
      this.positions[5] = ". Note was submitted on "
      this.positions[6] = ". "
    }

  }
  _loadKeywords = () => {
    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    const keywords = navigation.getParam('keywords');
    this.keyWords = [];
    if (data.woken_up_during_night) {
      this.keyWords[0] = data.sleep_time
      this.keyWords[1] = keywords.wearingPad
      this.keyWords[2] = keywords.bedrailsUp
      this.keyWords[3] = keywords.wokenUp
      this.keyWords[4] = keywords.note
      if (data.mood_2) {
        const index2 = _.findIndex(moods, ['id', data.mood_2]);
        this.state.mood_2 = moods[index2].name
        mood2 = moods[index2].name;
        this.keyWords[5] = moods[index2].name
      }
      if (data.mood_1) {
        const index1 = _.findIndex(moods, ['id', data.mood_1]);
        this.state.mood_1 = moods[index1].name
        this.keyWords[5] = this.keyWords[5] ? moods[index1].name + ", " + this.keyWords[5] : moods[index1].name
      }
      else this.keyWords[5] = "NO_MOOD"
      this.keyWords[6] = Moment(data.created_on).format('DD-MM-YYYY')

    }
    else {
      this.keyWords[0] = data.sleep_time
      this.keyWords[1] = keywords.wearingPad
      this.keyWords[2] = keywords.bedrailsUp
      this.keyWords[3] = keywords.wokenUp
      if (data.mood_2) {
        const index2 = _.findIndex(moods, ['id', data.mood_2]);
        this.state.mood_2 = moods[index2].name
        mood2 = moods[index2].name;
        this.keyWords[4] = moods[index2].name
      }
      if (data.mood_1) {
        const index1 = _.findIndex(moods, ['id', data.mood_1]);
        this.state.mood_1 = moods[index1].name
        this.keyWords[4] = this.keyWords[4] ? moods[index1].name + ", " + this.keyWords[4] : moods[index1].name
      }
      else this.keyWords[4] = "NO_MOOD"
      this.keyWords[5] = Moment(data.created_on).format('DD-MM-YYYY')


    }


  }


  _showInValid = () => {
    Alert.alert(
      'Please complete the required information',
      '',
      [{ text: 'Close', onPress: () => this.setState({ isValid: true }) }]
    )
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
        asyncStorage={(this.props.navigation.getParam('data').woken_up_during_night ? "1" : "2")+"NightChecksReviewPositions"}
        positions={this.positions}
        keywords={this.keyWords}
        _submitForm={data => this._submitForm(data)}
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
