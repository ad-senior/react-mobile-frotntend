import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux'
import { EventDispatcher } from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer"
import { Data } from '../../Config';
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
    const subpage = this.props.navigation.getParam('data').care_provide;
    switch (subpage) {
      case "OC":
        this.positions[0] = "The ";
        this.positions[1] = " has been given. The Service User ";
        this.positions[2] = " brush their teeth/denture. Service User needs ";
        this.positions[3] = " and the mouth wash was ";
        this.positions[4] = ". The mood was ";
        this.positions[5] = ". "
        break;

      case "WS":
        this.positions[0] = "The ";
        this.positions[1] = " has been given. The ";
        this.positions[2] = " was carried out and ";
        this.positions[3] = " was used to wash the Service User. Service User's hair ";
        this.positions[4] = " washed and hair ";
        this.positions[5] = " shaved. Service User needs "
        this.positions[6] = " and ";
        this.positions[7] = " was used as an equipment. There was ";
        this.positions[8] = " needed to dry service user. The mood was "
        this.positions[9] = ". "
        break;
      case "DR":
        this.positions[0] = " ";
        this.positions[1] = " chose the clothing. There was ";
        this.positions[2] = " needed for choosing the clothing. ";
        break;
      case "TL":
        this.positions[0] = "There was ";
        this.positions[1] = " needed for toileting. The equipment used was ";
        this.positions[2] = ". The mood was ";
        this.positions[3] = ". ";

        break;
    }


  }
  _loadKeywords = () => {
    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    const keywords = navigation.getParam('keywords');
    const subpage = this.props.navigation.getParam('data').care_provide;
    this.keyWords = [];
    switch (subpage) {
      case "OC":
        this.keyWords[0] = "oral care";
        this.keyWords[1] = data.brush_teeth ? "did" : "did not"
        this.keyWords[2] = keywords.assistance
        this.keyWords[3] = data.mouth_wash_used ? "used" : "not used";
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

        break;

      case "WS":
        this.keyWords[0] = "washing";
        this.keyWords[1] = keywords.personalCareCarriedText
        this.keyWords[2] = keywords.washUsedText
        this.keyWords[3] = data.hair_wash ? "was" : "was not";
        this.keyWords[4] = data.hair_shave ? "was" : "was not";
        this.keyWords[5] = keywords.assistance
        this.keyWords[6] = keywords.equipmentUsedText
        this.keyWords[7] = keywords.assistanceDryText
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
        break;
      case "DR":
        this.keyWords[0] = keywords.suClothigText;
        this.keyWords[1] = keywords.assistance

        break;
      case "TL":
        this.keyWords[0] = keywords.assistance
        this.keyWords[1] = keywords.equipmentUsedText
        if (data.mood_2) {
          const index2 = _.findIndex(moods, ['id', data.mood_2]);
          this.state.mood_2 = moods[index2].name
          mood2 = moods[index2].name;
          this.keyWords[2] = moods[index2].name
        }
        if (data.mood_1) {
          const index1 = _.findIndex(moods, ['id', data.mood_1]);
          this.state.mood_1 = moods[index1].name
          this.keyWords[2] = this.keyWords[2] ? moods[index1].name + ", " + this.keyWords[2] : moods[index1].name
        }
        else this.keyWords[2] = "NO_MOOD"
        break;
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
            JSON.stringify(data),
            null,
            [{ text: 'Close' }]
          )
        } else {
          const { navigate } = this.props.navigation;
          navigate('HomeScreen', {
            message: 'PersonalCare',
          });
        }
      })



  }

  render() {
    return (
      <Reviewer
        menuID={2}
        asyncStorage={this.props.navigation.getParam('data').care_provide + "ReviewPosition"}
        positions={this.positions}
        keywords={this.keyWords}
        _submitForm={data => this._submitForm(data)}
        navigation={this.props.navigation}
      ></Reviewer>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  updateNote: (dataObj) => EventDispatcher.UpdatePersonalCare(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    moods: state.daily.moods,
  };
}

export default connect(stateToProps, dispatchToProps)(PersonalCareReview)
