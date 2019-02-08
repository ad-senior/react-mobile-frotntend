import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux'
import { EventDispatcher } from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer"
class ContactLogReview extends Component {
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
    this.positions[0] = " ";
    this.positions[1] = ".The visitor ";
    this.positions[2] = " interact with Service User.";
    this.positions[3] = " ";
    this.positions[4] = ".The mood was ";
    this.positions[5] = ". "


  }
  _loadKeywords = () => {
    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    const keywords = navigation.getParam('keywords');
    this.keyWords = [];
    this.keyWords[0] = data.visited_or_called_person;
    this.keyWords[1] = keywords.visitor
    this.keyWords[2] = data.description
    this.keyWords[3] = data.addition_comments
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
            message: 'Contact',
          });
        }
      })



  }

  render() {
    return (
      <Reviewer
        menuID={6}
        asyncStorage="ContactLogReviewPositions"
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
  updateNote: (dataObj) => EventDispatcher.UpdateConatct(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    moods: state.daily.moods,
  };
}

export default connect(stateToProps, dispatchToProps)(ContactLogReview)
