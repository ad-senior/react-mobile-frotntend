import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux'
import { EventDispatcher } from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer"
import { Data } from '../../Config';
class MealReview extends Component {
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
    this.positions[1] = " meal was prepared by ";
    this.positions[2] = " consisting of ";
    this.positions[3] = ". Service User ate ";
    this.positions[4] = " and the food was consumed ";
    this.positions[5] = ". Service User's choice was "
    this.positions[6] = " and nutrition requirements are "
    this.positions[7] = ". Service User drank "
    this.positions[8] = ". "
    this.positions[9] = ". The mood was "
    this.positions[10] = ". Note was submitted on "
    this.positions[11] = ". "


  }
  _loadKeywords = () => {
    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    const keywords = navigation.getParam('keywords');
    this.keyWords = [];
    this.keyWords[0] = keywords.meal;
    this.keyWords[1] = keywords.prepared
    this.keyWords[2] = data.food_item
    this.keyWords[3] = keywords.eating_method
    this.keyWords[4] = this.eatingAmountChoices[parseInt(data.eating_amount)-1].label
    this.keyWords[5] = keywords.eating_type
    this.keyWords[6] = keywords.nutrition
    this.keyWords[7] = keywords.su_drink
    this.keyWords[8] = keywords.thickener
    if (data.mood_2) {
      const index2 = _.findIndex(moods, ['id', data.mood_2]);
      this.state.mood_2 = moods[index2].name
      mood2 = moods[index2].name;
      this.keyWords[9] = moods[index2].name
    }
    if (data.mood_1) {
      const index1 = _.findIndex(moods, ['id', data.mood_1]);
      this.state.mood_1 = moods[index1].name
      this.keyWords[9] = this.keyWords[9] ? moods[index1].name + ", " + this.keyWords[9] : moods[index1].name
    }
    else this.keyWords[9] = "NO_MOOD"

    this.keyWords[10] = Moment(data.created_on).format('DD-MM-YYYY')

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
            message: 'Meal',
          });
        }
      })



  }

  render() {
    return (
      <Reviewer
        menuID={4}
        asyncStorage="MealsReviewPositions"
        positions={this.positions}
        keywords={this.keyWords}
        _submitForm={data => this._submitForm(data)}
        navigation={this.props.navigation}
      ></Reviewer>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  updateNote: (dataObj) => EventDispatcher.UpdateMeal(dataObj, dispatch),
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
