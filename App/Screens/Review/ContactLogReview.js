import React, {Component} from 'react';
import {Alert} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {EventDispatcher} from '../../Actions';
import Reviewer from "../Reviewer";
import {emptyString} from '../../Common/Strings';
class ContactLogReview extends Component {
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
      this.positions = [];
      this.positions[0] = " ";
      this.positions[1] = ". ";
      if (this.props.navigation.getParam('data').type_of_visit === this.props.navigation.getParam('data'))
          this.positions[2] = " was visited and ";
      else
          this.positions[2] = " visited and ";
      this.positions[3] = " with Service User. ";
      this.positions[4] = " ";
      this.positions[5] = ". The mood was ";
      this.positions[6] = ". ";


  }
  _loadKeywords = () => {
      const {moods, navigation} = this.props;
      const data = navigation.getParam('data');
      const keywords = navigation.getParam('keywords');
      this.keyWords = [];
      this.keyWords[0] = keywords.type_of_visit;
      this.keyWords[1] = data.visited_or_called_person.split(' ').map(val => {
          if (val.length > 1) {
              return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
          }
          if (val.length == 1)
              return val.charAt(0).toUpperCase();
          else return emptyString;
      }).join(' ');

      this.keyWords[2] = keywords.visitor.toLowerCase();
      this.keyWords[3] = data.description.trim().charAt(0).toUpperCase() + data.description.trim().slice(1).toLowerCase();
      this.keyWords[4] = data.addition_comments.toLowerCase();
      if (data.mood_2) {
          const index2 = _.findIndex(moods, ['id', data.mood_2]);
          mood2 = moods[index2].name;
          this.keyWords[5] = moods[index2].name.toLowerCase();
      }
      if (data.mood_1) {
          const index1 = _.findIndex(moods, ['id', data.mood_1]);
          this.keyWords[5] = this.keyWords[5] ? moods[index1].name.toLowerCase() + ", " + this.keyWords[5] : moods[index1].name.toLowerCase();
      }
      else this.keyWords[5] = "NO_MOOD";


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
              message: 'Contact',
              updateDate: true
          });
      }
      else {
          apiData.id = reviewerData.id;
          try {
              this.props.updateNote(apiData)
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
                                  message: 'Contact',
                                  updateDate: true
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
                  message: 'Contact',
              });
          }
      }

  }

  render () {
      return (
          <Reviewer
              menuID={6}
              asyncStorage={"ContactLogReviewsPosition" + this.props.navigation.getParam('data').type_of_visit}
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
    updateNote: (dataObj) => dispatch(EventDispatcher.UpdateContactOffline(dataObj)),
    saveNote: (dataObj) => dispatch(EventDispatcher.PostContactLogOffline(dataObj))
});

const stateToProps = (state) => {
    return {
        serviceUsers: state.serviceuser.results,
        serviceUser: state.serviceuser.user,
        user_id: state.login.user_id,
        moods: state.daily.moods,
    };
};

export default connect(stateToProps, dispatchToProps)(ContactLogReview);
