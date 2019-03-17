import React, {Component} from 'react';
import {Alert} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {EventDispatcher} from '../../Actions';
import Moment from 'moment';
import Reviewer from "../Reviewer";
import {Data} from '../../Config';

class MedicationsReview extends Component {
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
      const {navigation} = this.props;
      const data = navigation.getParam('data');
      this.positions = [];
      this.positions[0] = "Medication given was ";
      this.positions[1] = ". Dosage given was ";
      this.positions[2] = " and the whole dosage ";
      if (data.whole_dosage_taken) {
          this.positions[3] = " taken. The mood was ";
          this.positions[4] = ". Note was submitted on ";
          this.positions[5] = ". ";
      }
      else {
          this.positions[3] = " taken because ";
          this.positions[4] = ". The mood was ";
          this.positions[5] = ". Note was submitted on ";
          this.positions[6] = ". ";
      }


  }
  _loadKeywords = () => {
      const {navigation, moods} = this.props;
      const data = navigation.getParam('data');
      this.keyWords = [];
      this.keyWords[0] = data.medication_name.toLowerCase();
      this.keyWords[1] = data.dosage_given == Data.dosageTaken[0].value ? 'as per mar chart' : 'other';
      this.keyWords[2] = data.whole_dosage_taken ? 'was' : 'was not';
      if (data.whole_dosage_taken) {
          if (data.mood_2) {
              const index2 = _.findIndex(moods, ['id', data.mood_2]);
              mood2 = moods[index2].name;
              this.keyWords[3] = moods[index2].name.toLowerCase();
          }
          if (data.mood_1) {
              const index1 = _.findIndex(moods, ['id', data.mood_1]);
              this.keyWords[3] = this.keyWords[3] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[3] : moods[index1].name.toLowerCase();
          }
          else this.keyWords[3] = "NO_MOOD";

          this.keyWords[4] = Moment(this.props.navigation.getParam('data').created_on).format('DD-MM-YYYY');
      }
      else {
          this.keyWords[3] = data.whole_dosage_taken_reason.toLowerCase();
          if (data.mood_2) {
              const index2 = _.findIndex(moods, ['id', data.mood_2]);
              mood2 = moods[index2].name;
              this.keyWords[4] = moods[index2].name.toLowerCase();
          }
          if (data.mood_1) {
              const index1 = _.findIndex(moods, ['id', data.mood_1]);
              this.keyWords[4] = this.keyWords[4] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[4] : moods[index1].name.toLowerCase();
          }
          else this.keyWords[4] = "NO_MOOD";

          this.keyWords[5] = Moment(this.props.navigation.getParam('data').created_on).format('DD-MM-YYYY');
      }
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
              message: 'Medication',
          });
      }
      else {
          apiData.id = reviewerData.id;
          try {
              this.props.updateMedication(apiData)
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
                                  message: 'Medication',
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
                  message: 'Medication',
              });
          }
      }

  }

  render () {
      return (
          <Reviewer
              menuID={3}
              asyncStorage={(this.props.navigation.getParam("data").whole_dosage_taken ? "whole_dosage_taken" : "whole_dosage_not_taken") + "MedicationsReviewPositions"}
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
    updateMedication: (dataObj) => dispatch(EventDispatcher.UpdateMedicationOffline(dataObj)),
    saveNote: (dataObj) => dispatch(EventDispatcher.PostMedicationOffline(dataObj))
});

const stateToProps = (state) => {
    return {
        serviceUsers: state.serviceuser.results,
        serviceUser: state.serviceuser.user,
        user_id: state.login.user_id,
        moods: state.daily.moods
    };
};

export default connect(stateToProps, dispatchToProps)(MedicationsReview);
