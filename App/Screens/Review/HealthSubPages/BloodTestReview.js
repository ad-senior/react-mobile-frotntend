import React, { Component } from 'react'
import { Alert } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux'
import { EventDispatcher } from '../../../Actions';
import Reviewer from "../../Reviewer"
class BloodTestReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moods: [],
    }
    this._loadKeywords()

    this._loadPositions()

  }


  _loadPositions = () => {
    const { navigation } = this.props;
    const data = navigation.getParam('data');

    this.positions = []
    this.positions[0] = "The ";
    this.positions[1] = " was tested on ";
    this.positions[2] = " at ";
    if (data.blood_test_result == '') {
      this.positions[3] = ". The reason for the test was ";
      if (data.notes_and_thoughts) {
        this.positions[4] = ". "
        this.positions[5] = ". The mood was "
        this.positions[6] = ". "
      }
      else {
        this.positions[4] = ". The mood was "
        this.positions[5] = ". "
      }
    }
    else {
      this.positions[3] = ". The test result was ";
      this.positions[4] = " and the reason for the test was ";
      if (data.notes_and_thoughts) {
        this.positions[5] = ". "
        this.positions[6] = ". The mood was "
        this.positions[7] = ". "
      }
      else {
        this.positions[5] = ". The mood was "
        this.positions[6] = ". "
      }
    }



  }
  _loadKeywords = () => {
    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    this.keyWords = [];
    this.keyWords[0] = "Blood test";
    this.keyWords[1] = data.date
    this.keyWords[2] = data.where
    if (data.blood_test_result == '') {

      this.keyWords[3] = data.blood_test_reason
      if (data.notes_and_thoughts) {
        this.keyWords[4] = data.notes_and_thoughts
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
      }
      else {
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
      }
    }
    else {
      this.keyWords[3] = data.blood_test_result
      this.keyWords[4] = data.blood_test_reason
      if (data.notes_and_thoughts) {
        this.keyWords[5] = data.notes_and_thoughts
        if (data.mood_2) {
          const index2 = _.findIndex(moods, ['id', data.mood_2]);
          this.state.mood_2 = moods[index2].name
          mood2 = moods[index2].name;
          this.keyWords[6] = moods[index2].name
        }
        if (data.mood_1) {
          const index1 = _.findIndex(moods, ['id', data.mood_1]);
          this.state.mood_1 = moods[index1].name
          this.keyWords[6] = this.keyWords[6] ? moods[index1].name + ", " + this.keyWords[6] : moods[index1].name
        }
        else this.keyWords[6] = "NO_MOOD"
      }
      else {
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
      }

    }



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
            message: 'Blood test',
          });
        }
      })



  }

  render() {
    return (
      <Reviewer
        menuID={1}
        asyncStorage={(this.props.navigation.getParam('data').notes_and_thoughts ? "notes" : "no_notes") + (this.props.navigation.getParam('data').blood_test_result !='' ? "result" : "no_result") + "Blood Test ReviewPositions"}
        positions={this.positions}
        keywords={this.keyWords}
        _submitForm={data => this._submitForm(data)}
        navigation={this.props.navigation}
      ></Reviewer>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  updateNote: (dataObj) => EventDispatcher.UpdateHealth(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    moods: state.daily.moods,
  };
}

export default connect(stateToProps, dispatchToProps)(BloodTestReview)
