import React, {Component} from 'react';
import {View, TouchableOpacity, Alert, Keyboard, AsyncStorage} from 'react-native';
import Text from '../Components/CustomText';
import TextInput from '../Components/CustomTextInput';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import mainStyles from '../Themes/Styles';
import styles from './Styles/Reviewer';
import {emptyString} from '../Common/Strings';


class Reviewer extends Component {
    constructor (props) {
        super(props);
        this._loadKeywords();
        this._loadPositions();
        this._loadMessage();

        this._saveFullDescription();
        this.state = {key:emptyString, focused:false};


    }
  _saveFullDescription = () => {
      AsyncStorage.getItem("ReviewID").then((value) => {
          this.props._saveFullDescription({id:value, message:this.message});
      });

  }
  _loadPositions = async () => {
      this.positions = this.props.positions;
      if (this.props.asyncStorage)


          AsyncStorage.getItem(this.props.asyncStorage).then(positionsAsyncStorage => {
              if(JSON.parse(positionsAsyncStorage))
              {
                  this.positions = JSON.parse(positionsAsyncStorage);

                  for(let i = 0; i < this.keyWords.length; i++) {

                      this.texts.push(<Text>{this.positions[i]}</Text>);
                      this.texts.push(<Text style={styles.textHighlight}>{this.keyWords[i]}</Text>);

                  }
                  this.texts.push(<Text>{this.positions[this.positions.lenght - 1]}</Text>);



                  this.forceUpdate();
              }
          });
  }

  _loadKeywords = () => {

      this.keyWords = [];
      this.props.keywords.forEach((element => {

          this.keyWords.push( element.replace(new RegExp("_", 'g'), " "));
      }));

  }

  _loadMessage = () => {
      this.message = emptyString;
      for (let index = 0; index < this.positions.length - 1; index++) {
          this.message += this.positions[index] + '<p class="keyword">' + this.keyWords[index] + '</p>';

      }
      this.message += this.positions[this.positions.length - 1];
  }


  _submitForm () {
      this._loadMessage();
      AsyncStorage.getItem("ReviewID").then((value) => {
          this.props._submitForm({id:value, message:this.message});
      });

  }

  savePosition = () => {

      AsyncStorage.setItem("IsReview", "True");
      if (this.props.asyncStorage)
          AsyncStorage.setItem(this.props.asyncStorage, JSON.stringify(this.positions));
  }

  renderBackToScreen = () => {
      this.savePosition();
      this.props.navigation.pop();
  }

  _showAlert = () => {
      Alert.alert(
          emptyString,
          'Sorry you can\'t edit that data here. Please go back to the note capture screen to edit that information',
          [
              {text: 'Continue', onPress: () => this._reRenderTextInput()},
              {text: 'go back to first screen', onPress: () => { this.renderBackToScreen(); }, style: 'cancel'},
          ],
          {cancelable: false}
      );
      Keyboard.dismiss();
  }

  _reRenderTextInput = () => {
      this.setState({
          key: Math.random().toString(),
          focused: true
      });
  }

  render () {
      this.texts = [];
      for (let i = 0; i < this.keyWords.length; i++) {

          this.texts.push(<Text>{this.positions[i]}</Text>);
          this.texts.push(<Text style={styles.textHighlight}>{this.keyWords[i]}</Text>);

      }
      this.texts.push(<Text>{this.positions[this.positions.lenght - 1]}</Text>);


      return (
          <View style={mainStyles.containerForm}>
              <View style={mainStyles.card} >
                  <Navbar menuID={this.props.menuID} appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
                  <TitleForm menuID={this.props.menuID} style={mainStyles.mt10} />
              </View>
              <View style={styles.textInputView}>

                  <TextInput key={this.state.key} multiline={true}
                      autoFocus={this.state.focused}
                      blurOnSubmit={true}
                      returnKeyType="done"
                      onChangeText={(text) => {

                          if (text.indexOf(this.positions[0] + this.keyWords[0]) == -1 || text.indexOf(this.positions[0] + this.keyWords[0]) != 0) {
                              pos = text.indexOf(this.keyWords[0] + this.positions[1]);


                              subText = text.substring(0, pos);
                              if (pos != -1 && subText != emptyString)
                                  this.positions[0] = subText;
                              else
                                  this._reRenderTextInput();
                              return;
                          }
                          else {
                              for (i = 1; i < this.positions.length - 1; i++) {
                                  if (text.indexOf(this.positions[i] + this.keyWords[i]) == -1 || text.indexOf(this.positions[0] + this.keyWords[0]) == this.keyWords[0].start + this.keyWords[0].length) {
                                      pos = text.indexOf(this.keyWords[i] + this.positions[i + 1]);
                                      subText = text.substring(this.lengths[i - 1].start + this.lengths[i - 1].length, pos);
                                      if (pos != -1 && subText != emptyString)
                                          this.positions[i] = subText;
                                      else
                                          this._reRenderTextInput();
                                      return;
                                  }
                                  else if (text.indexOf(this.keyWords[i - 1] + this.positions[i]) == -1 || (this.positions[i] == emptyString && text.indexOf(this.keyWords[i - 1] + this.keyWords[i]) == -1)) {

                                      pos = text.indexOf(this.keyWords[i] + this.positions[i + 1]);
                                      this.positions[i] = text.substring(this.lengths[i - 1].start + this.lengths[i - 1].length, pos);
                                      this._reRenderTextInput();
                                      return;

                                  }
                              }
                          }
                          lastPosition = this.positions.length - 1;
                          if (text.indexOf(this.keyWords[lastPosition - 1] + this.positions[lastPosition]) == -1 || text.substring(text.length - this.positions[lastPosition].length).indexOf(this.positions[lastPosition]) == -1) {
                              this.positions[lastPosition] = text.substring(this.lengths[lastPosition - 1].start + this.lengths[lastPosition - 1].length, text.length);
                          }



                      }
                      }


                      onSelectionChange={({nativeEvent: {selection}}) => {
                          this.lengths = [];

                          this.lengths.push({start: this.positions[0].length, length: this.keyWords[0].length});
                          for (i = 1; i < this.keyWords.length; i++) {
                              this.lengths.push({start: this.lengths[i - 1].start + this.lengths[i - 1].length + this.positions[i].length, length: this.keyWords[i].length});

                          }
                          this.lengths.forEach(element => {

                              if (selection.start > element.start && selection.end <= element.start + element.length) {
                                  this._showAlert();
                                  return;
                              }
                              else if (selection.start < element.start && selection.end > element.start + element.length) {
                                  this._showAlert();
                                  return;
                              }
                          });

                      }}
                  >

                      {this.texts}
                      {this.positions[this.positions.length - 1]}
                  </TextInput>

              </View>
              <TouchableOpacity
                  style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20, mainStyles.mh20]}
                  onPress={() => this._submitForm()}>
                  <Text style={[mainStyles.textSubmit]}>SAVE</Text>
              </TouchableOpacity>
          </View>
      );
  }
}

export default Reviewer;
