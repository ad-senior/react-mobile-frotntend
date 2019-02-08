import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux'
import { EventDispatcher } from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer"

class MedicationsReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dosageTaken: this.props.navigation.getParam('data').whole_dosage_taken,
      dosageGiven: this.props.navigation.getParam('data').dosage_given == 'AS_PER_MAR_CHART' ? 'AS_PER_MAR_CHART' : 'OTHER',
      serviceUser: this.props.navigation.getParam('data').medication_name,
      date: '',
      mood_1: '',
      mood_2: '',
      reportTo: undefined,
      serviceUsers: undefined,
      comments: '',
      isValid: true,
      serviceUserEmpty: false,
      dosageGivenEmpty: false,
      dosageTakenEmpty: false,
      mood_1Empty: false,
      descriptionEmpty: false,
      moods: [],
      dosage: [{ label: 'AS_PER_MAR_CHART', value: 'AS_PER_MAR_CHART' }, { label: 'OTH', value: 'OTH' }],
      whole_dosage_taken: [{ label: 'was', value: true }, { label: 'was not', value: false }],


    }
    this._loadKeywords()

    this._loadPositions()

  }


  _loadPositions = () => {
    this.positions = []
    this.positions[0] = "Medication given was ";
    this.positions[1] = ". Dosage given was ";
    this.positions[2] = " and the whole dosage ";
    this.positions[3] = " taken. The mood was ";
    this.positions[4] = ". Note was submitted on ";
    this.positions[5] = ". "


  }
  _loadKeywords = () => {
    this.keyWords = [];
    this.keyWords[0] = this.props.navigation.getParam('data').medication_name;
    this.keyWords[1] = this.props.navigation.getParam('data').dosage_given == 'AS_PER_MAR_CHART' ? 'AS_PER_MAR_CHART' : 'OTHER'
    this.keyWords[2] = this.props.navigation.getParam('data').whole_dosage_taken ? 'was' : 'was not'
    const { navigation, moods } = this.props;
    const data = navigation.getParam('data');
    if (data.mood_2) {
      const index2 = _.findIndex(moods, ['id', data.mood_2]);
      this.state.mood_2 = moods[index2].name
      mood2 = moods[index2].name;
      this.keyWords[3] = moods[index2].name
    }
    if (data.mood_1) {
      const index1 = _.findIndex(moods, ['id', data.mood_1]);
      this.state.mood_1 = moods[index1].name
      this.keyWords[3] = this.keyWords[3] ? moods[index1].name + ", " + this.keyWords[3] : moods[index1].name
    }
    else this.keyWords[3] = "NO_MOOD"

    this.keyWords[4] = Moment(this.props.navigation.getParam('data').created_on).format('DD-MM-YYYY')
  }


  _validation() {
    let {
      serviceUserEmpty,
      dosageGivenEmpty,
      dosageTakenEmpty,
      mood_1Empty,
      description,
      dosageGiven,
      dosageTaken,
      serviceUser,
      mood_1,
      isValid
    } = this.state;
    if (!serviceUser) {
      isValid = false;
      serviceUserEmpty = true;
    }
    if (!dosageGiven) {
      isValid = false;
      dosageGivenEmpty = true;
    }
    if (!mood_1) {
      isValid = false;
      mood_1Empty = true;
    }
    if (dosageTaken === undefined) {
      isValid = false;
      dosageTakenEmpty = true;
    } else if (this.state.dosageTaken === false) {
      if (!description) {
        isValid = false;
        dosageTakenEmpty = true;
      }
    } else if (this.state.dosageTaken === true) {
      dosageTakenEmpty = false;
    }

    this.setState({
      isValid: isValid,
      serviceUserEmpty: serviceUserEmpty,
      dosageGivenEmpty: dosageGivenEmpty,
      dosageTakenEmpty: dosageTakenEmpty,
      mood_1Empty: mood_1Empty,
    });
    return isValid
  }
  _saveFullDescription = (reviewerData) => { 
    const apiData = this.props.navigation.getParam('data');

    apiData.id = reviewerData.id;
    apiData.full_description = reviewerData.message
    this.props.updateNote(apiData)
  }

  _submitForm(reviewerData) {
    const apiData = this.props.navigation.getParam('data');

    if (this._validation()) {
      apiData.id = reviewerData.id;
      apiData.full_description = reviewerData.message

      this.props.updateMedication(apiData)
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
              message: 'Medication',
            });
          }
        })
    }


  }

  render() {
    return (
      <Reviewer
        menuID={3}
        asyncStorage="MedicationsReviewPositions"
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
  updateMedication: (dataObj) => EventDispatcher.UpdateMedication(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    moods: state.daily.moods
  };
}

export default connect(stateToProps, dispatchToProps)(MedicationsReview)
