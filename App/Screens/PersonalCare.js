import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import TextInput from '../Components/CustomTextInput';
import Text from '../Components/CustomText';
import {Data} from '../Config';
import {connect} from 'react-redux';
import {EventDispatcher} from '../Actions';
import Geolocation from '../Components/Geolocation';
import Picker from '../Components/Picker';
import ConsentGain from '../Components/ConsentGain';
import MultiMood from '../Components/MultiMood';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import Checkbox from '../Components/Checkbox';
import mainStyles from '../Themes/Styles';
import styles from './Styles/PersonalCare';
import MultipleCheckbox from '../Components/MultipleCheckBox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {emptyString} from '../Common/Strings';
import UrgencyFlag from '../Components/UrgencyFlag';
class PersonalCare extends Component {

    constructor (props) {
        super(props);
        this.state = {
            careProvided: undefined,
            brushTeeth: undefined,
            brushTeethEmpty: false,
            mouthwash: false,
            mouthwashEmpty: false,
            notes: undefined,
            notesAndThoughtsEmpty: false,

            personalCareCarried: undefined,
            personalCareCarriedEmpty: false,
            washUsed: undefined,
            washUsedEmpty: false,
            hairWashed: undefined,
            hairWashedEmpty: false,
            hairShaved: undefined,
            hairShavedEmpty: false,
            equipmentUsed: undefined,
            equipmentUsedEmpty: false,
            assistanceDry: undefined,
            assistanceDryEmpty: false,

            suClothig: undefined,
            suClothigEmpty: false,


            cleaner: undefined,
            bodyPart: undefined,
            tool: undefined,
            hairWash: undefined,
            dry: undefined,
            isValid: true,
            consentGained: false,
            shampoo: false,
            condition: false,
            hairShave: false,
            needWash: false,
            needOutShower: false,
            needDry: false,
            secondMood: false,
            careProvidedEmpty: false,
            cleanerEmpty: false,
            bodyPartEmpty: false,
            toolEmpty: false,
            hairWashEmpty: false,
            dryEmpty: false,
            moodEmpty: false,
            wearDecision: emptyString,
            comments: emptyString,
            moods: [],
            equipments: [],
            wearDecisionIsEmpty: false,
            assistance: undefined,
            assistanceEmpty: false,
            location: [null, null],
            urgencyFlag: Data.urgencyFlags[0].value
        };
    }
  componentDidMount = () => {
      AsyncStorage.setItem("IsReview", "False");
  }

  _resetDefaults () {
      this.setState({
          brushTeeth: undefined,
          brushTeethEmpty: false,
          mouthwash: false,
          mouthwashEmpty: false,
          notes: undefined,
          notesAndThoughtsEmpty: false,
          assistanceRequired: undefined,
          personalCareCarried: undefined,
          personalCareCarriedEmpty: false,
          washUsed: undefined,
          washUsedEmpty: false,
          hairWashed: undefined,
          hairWashedEmpty: false,
          hairShaved: undefined,
          hairShavedEmpty: false,
          assistanceDry: undefined,
          assistanceDryEmpty: false,

          suClothig: undefined,
          suClothigEmpty: false,

          assistance: undefined,
          assistanceEmpty: false,
          equipmentUsed: undefined,
          equipmentUsedEmpty: false,
          moodEmpty: false,
          moods: []
      });
  }

  _onPressConsent (consent) {
      this.setState({consentGained: consent});
  }

  _onPressCare (care) {
      this._resetDefaults();
      this.setState({careProvided: care, careProvidedEmpty: false});
  }

  _onPressMood (moods) {
      this.setState({moods: moods, moodEmpty: false});
  }

  _onChangeEquipment (text, index) {
      let equipments = this.state.equipments;
      equipments[index] = text;
      this.setState({equipments});
  }

  _showAlert () {
      Alert.alert(
          'Please complete the required information',
          emptyString,
          [{text: 'Close', onPress: () => this.setState({isValid: true})}]
      );
  }

  _getLocation = (loc) => {
      this.setState({location: loc});
  }

  _validation () {

      let isValid = this.state.isValid;
      let careProvidedEmpty = this.state.careProvidedEmpty;

      // oc validations
      let brushTeethEmpty = this.state.brushTeethEmpty;
      let mouthwashEmpty = this.state.mouthwashEmpty;
      let notesAndThoughtsEmpty = this.state.notesAndThoughtsEmpty;

      //ws validations

      let personalCareCarriedEmpty = this.state.personalCareCarriedEmpty;
      let washUsedEmpty = this.state.washUsedEmpty;
      let hairWashedEmpty = this.state.hairWashedEmpty;
      let hairShavedEmpty = this.state.hairShavedEmpty;
      let equipmentUsedEmpty = this.state.equipmentUsedEmpty;
      let assistanceDryEmpty = this.state.assistanceDryEmpty;

      // dr validations

      let suClothigEmpty = this.state.suClothigEmpty;

      let cleanerEmpty = this.state.cleanerEmpty;
      let bodyPartEmpty = this.state.bodyPartEmpty;
      let toolEmpty = this.state.toolEmpty;
      let hairWashEmpty = this.state.hairWashEmpty;
      let dryEmpty = this.state.dryEmpty;
      let moodEmpty = this.state.moodEmpty;
      let wearDecisionIsEmpty = this.state.wearDecisionIsEmpty;

      // common validations
      let assistanceEmpty = this.state.assistanceEmpty;

      if (this.state.careProvided == Data.careProvideChoices[0].value) {
          if (this.state.brushTeeth == undefined) {
              isValid = false;
              brushTeethEmpty = true;
          }
          if (this.state.assistance == undefined) {
              isValid = false;
              assistanceEmpty = true;
          }
          if (this.state.mouthwash == undefined) {
              isValid = false;
              mouthwashEmpty = true;
          }
          if (this.state.notesAndThoughts && (this.state.notes == undefined || this.state.notes == emptyString)) {
              isValid = false;
              notesAndThoughtsEmpty = true;
          }
      } else if (this.state.careProvided == Data.careProvideChoices[1].value) {
          if (this.state.personalCareCarried == undefined) {
              isValid = false;
              personalCareCarriedEmpty = true;
          }
          if (this.state.washUsed == undefined) {
              isValid = false;
              washUsedEmpty = true;
          }
          if (this.state.hairWashed == undefined) {
              isValid = false;
              hairWashedEmpty = true;
          }
          if (this.state.hairShaved == undefined) {
              isValid = false;
              hairShavedEmpty = true;
          }
          if (this.state.assistance == undefined) {
              isValid = false;
              assistanceEmpty = true;
          }
          if (this.state.equipmentUsed == undefined) {
              isValid = false;
              equipmentUsedEmpty = true;
          }
          if (this.state.assistanceDry == undefined) {
              isValid = false;
              assistanceDryEmpty = true;
          }
      } else if (this.state.careProvided == Data.careProvideChoices[2].value) {
          if (this.state.suClothig == undefined) {
              isValid = false;
              suClothigEmpty = true;
          }
          if (this.state.assistance == undefined) {
              isValid = false;
              assistanceEmpty = true;
          }
      } else {
          if (this.state.assistance == undefined) {
              isValid = false;
              assistanceEmpty = true;
          }
          if (this.state.equipmentUsed == undefined) {
              isValid = false;
              equipmentUsedEmpty = true;
          }
      }

      if (this.state.moods.length < 1) {
          isValid = false;
          moodEmpty = true;
      }

      this.setState({
          isValid: isValid,
          brushTeethEmpty: brushTeethEmpty,
          mouthwashEmpty: mouthwashEmpty,
          notesAndThoughtsEmpty: notesAndThoughtsEmpty,
          personalCareCarriedEmpty: personalCareCarriedEmpty,
          washUsedEmpty: washUsedEmpty,
          hairWashedEmpty: hairWashedEmpty,
          hairShavedEmpty: hairShavedEmpty,
          equipmentUsedEmpty: equipmentUsedEmpty,
          assistanceDryEmpty: assistanceDryEmpty,
          suClothigEmpty: suClothigEmpty,

          careProvidedEmpty: careProvidedEmpty,
          cleanerEmpty: cleanerEmpty,
          bodyPartEmpty: bodyPartEmpty,
          toolEmpty: toolEmpty,
          hairWashEmpty: hairWashEmpty,
          dryEmpty: dryEmpty,
          moodEmpty: moodEmpty,
          wearDecisionIsEmpty: wearDecisionIsEmpty,
          assistanceEmpty: assistanceEmpty,
      });

      return isValid;
  }

  _submitForm () {

      if (this._validation()) {
          const shampoo = this.state.shampoo ? "SHAM" : null;
          const condition = this.state.condition ? "CON" : null;
          const wash = this.state.needWash ? "WASH" : null;
          const outShower = this.state.needOutShower ? "SHOWER" : null;
          const dry = this.state.needDry ? "DRY" : null;
          const {serviceUser, user_id} = this.props;

          let hairWashDetail = [];
          let assistanceDetail = [];
          let n = 0;

          if (shampoo) {
              hairWashDetail[n++] = shampoo;
          }
          if (condition) {
              hairWashDetail[n] = condition;
          }
          n = 0;
          if (wash) {
              assistanceDetail[n++] = wash;
          }
          if (outShower) {
              assistanceDetail[n++] = outShower;
          }
          if (dry) {
              assistanceDetail[n] = dry;
          }

          const data = {
              'urgency_flag': this.state.urgencyFlag,
              "care_provide": this.state.careProvided,
              "brush_teeth": this.state.brushTeeth,
              "mouth_wash_used": this.state.mouthwash,
              "personal_care_carried": this.state.personalCareCarried,
              "wash_type": this.state.washUsed,
              "equipment_used": this.state.equipmentUsed,
              "dry_assistance": this.state.assistanceDry,
              "su_clothing": this.state.suClothig,
              "hair_wash": this.state.hairWashed,
              "hair_shave": this.state.hairShaved,

              "assistance_detail": [this.state.assistance], // waiting backend change flow { [wash, outShower, dry] }
              "assistance": this.state.assistance !== undefined ? true : false,

              "mood_1": this.state.moods[0].id,
              "rating_1": this.state.moods[0].rating,
              "service_user": serviceUser.id,
              "created_by": user_id,
              "location": this.state.location
          };
          if (this.state.notesAndThoughts)
              data["notes_and_thoughts"] = this.state.notes;
          if (this.state.moods.length > 1) {
              data["mood_2"] = this.state.moods[1].id;
              data["rating_2"] = this.state.moods[1].rating;
          }

          keywords = {};

          keywords.assistance = this.state.assistanceRequired ? this.state.assistanceText : "no support";
          keywords.personalCareCarriedText = this.state.personalCareCarriedText;
          keywords.washUsedText = this.state.washUsedText;
          keywords.equipmentUsedText = this.state.equipmentUsedText;
          keywords.assistanceDryText = this.state.assistanceDryText;
          keywords.suClothigText = this.state.suClothigText;
          const {navigate} = this.props.navigation;
          let todoName = null;
          if (this.props.navigation.getParam('todoName')) {
            todoName = this.props.navigation.state.params.todoName;
          }
          data.name = todoName;
          AsyncStorage.getItem("IsReview").then((value) => {
              if (value == "True") {
                  navigate('PersonalCareReview', {message: 'PersonalCare', data, keywords});
              } else {
                  this.props.submitPersonal(data)
                      .then(async (response) => {
                          if (response.type === "POST_SUCCESS") {
                              let data = response.postSuccess;
                              console.log(await AsyncStorage.getItem("response"));
                              console.log(JSON.stringify(response));
                              if (data.error) {
                                  Alert.alert(
                                      JSON.stringify(data.message),
                                      null,
                                      [{text: 'Close'}]
                                  );
                              } else {
                                  navigate('PersonalCareReview', {message: 'PersonalCare', data, keywords});
                                  AsyncStorage.setItem("ReviewID", data.id.toString());
                              }
                          } else {
                              navigate('PersonalCareReview', {message: 'PersonalCare', data, keywords, offline: true});
                          }
                      });
              }
          }).done();


      }
  }

  _renderAssistanceNeed () {
      return (
          <View>
              <Checkbox
                  style={[mainStyles.mt10, mainStyles.ml20]}
                  checked={this.state.needWash}
                  title="To wash"
                  onPress={() => this.setState({needWash: !this.state.needWash})} />
              <Checkbox
                  style={[mainStyles.mt10, mainStyles.ml20]}
                  checked={this.state.needOutShower}
                  title="To get out of shower"
                  onPress={() => this.setState({needOutShower: !this.state.needOutShower})} />
              <Checkbox
                  style={[mainStyles.mt10, mainStyles.ml20]}
                  checked={this.state.needDry}
                  title="To dry"
                  onPress={() => this.setState({needDry: !this.state.needDry})} />
          </View>
      );
  }

  _renderHairWashDetail () {
      return (
          <View>
              <Checkbox
                  style={[mainStyles.mt10, mainStyles.ml20]}
                  checked={this.state.shampoo}
                  title="Shampoo"
                  onPress={() => this.setState({shampoo: !this.state.shampoo})} />
              <Checkbox
                  style={[mainStyles.mt10, mainStyles.ml20]}
                  checked={this.state.condition}
                  title="Conditioner"
                  onPress={() => this.setState({condition: !this.state.condition})} />
          </View>
      );
  }

  _renderQuestionnairForm () {
      //console.log(this.state, 'state')
      if (this.state.careProvided == Data.careProvideChoices[0].value) {
          return (
              <View style={[mainStyles.mt20, mainStyles.prl20]}>
                  <Text style={this.state.brushTeethEmpty ? [mainStyles.textQuestion, mainStyles.itemRequired] : [mainStyles.textQuestion]}>
            SU brushed teeth/denture?
                  </Text>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({brushTeeth: false, brushTeethEmpty: false})}
                          style={this.state.brushTeeth === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.brushTeeth === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({brushTeeth: true, brushTeethEmpty: false})}
                          style={this.state.brushTeeth === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.brushTeeth === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <View>
                      <Checkbox style={[mainStyles.mt30]} title="Mouthwash was used" checked={this.state.mouthwash} onPress={() => this.setState({mouthwash: !this.state.mouthwash, mouthwashEmpty: false})} />
                  </View>
                  <Text style={this.state.assistanceEmpty ? [mainStyles.textQuestion, mainStyles.itemRequired, mainStyles.mt40] : [mainStyles.mt40, mainStyles.textQuestion]}>Assistance needed?</Text>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({assistanceRequired: false, assistance: "NO_SUPPORT", assistanceEmpty: false})}
                          style={this.state.assistanceRequired === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.assistanceRequired === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({assistanceRequired: true, assistance: undefined, assistanceEmpty: true})}
                          style={this.state.assistanceRequired === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.assistanceRequired === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  {
                      this.state.assistanceRequired && <MultipleCheckbox data={Data.assistanceOralCareChoices} onPress={element => this.setState({assistance: element.value, assistanceText: element.label, assistanceEmpty: false})} />

                  }
                  <TouchableOpacity style={mainStyles.notesThoughts} onPress={() => this.setState({notesAndThoughts: !this.state.notesAndThoughts})}>
                      <Icon name="add-circle-outline" color="#0066FF" size={20} />
                      <Text style={mainStyles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
                  </TouchableOpacity>
                  {this.state.notesAndThoughts &&
            (<View style={[mainStyles.mt20, mainStyles.mb20]}>
                <TextInput
                    style={[mainStyles.textInputForm, mainStyles.mt20]}
                    placeholder="Notes and thoughts"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({notes: text, notesAndThoughtsEmpty: false})}
                    value={this.state.notes}

                />
            </View>)
                  }
                  <View style={[mainStyles.mt20, mainStyles.mb20]}>
                      <Text style={this.state.moodEmpty ? mainStyles.moodRequired : mainStyles.mood}>SU mood is</Text>
                      <MultiMood onPressMood={this._onPressMood.bind(this)} />
                      <UrgencyFlag onChoose={(item) => this.setState({urgencyFlag: item})}></UrgencyFlag>
                      <TouchableOpacity
                          style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20]}
                          onPress={() => this._submitForm()}>
                          <Text style={mainStyles.textSubmit}>Preview and save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );

      } else if (this.state.careProvided == Data.careProvideChoices[1].value) {
          return (
              <View style={[mainStyles.prl20]}>
                  <Text style={[mainStyles.mt20, mainStyles.mb10, mainStyles.textQuestion]}>What personal care was carried out?</Text>
                  <Picker
                      styleText={this.state.personalCareCarriedEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
                      placeholder="select"
                      data={Data.bodyCareChoices}
                      pickerBinder={true}
                      onSelectLabel={(val) => { this.setState({personalCareCarriedText: val}); }}
                      onPress={(val) => this.setState({personalCareCarried: val, personalCareCarriedEmpty: false})} />
                  <Text style={[mainStyles.mt20, mainStyles.mb10, mainStyles.textQuestion]}>What was used to wash?</Text>
                  <Picker
                      styleText={this.state.washUsedEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
                      placeholder="select"
                      pickerBinder={true}
                      onSelectLabel={(val) => { this.setState({washUsedText: val}); }}
                      data={Data.cleanerChoices}
                      onPress={(val) => this.setState({washUsed: val, washUsedEmpty: false})} />

                  <Text style={this.state.hairWashedEmpty ? [mainStyles.mt20, mainStyles.textQuestion, mainStyles.itemRequired] : mainStyles.mt20}>
            Was the SU hair washed?
                  </Text>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({hairWashed: false, hairWashedEmpty: false})}
                          style={this.state.hairWashed === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.hairWashed === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({hairWashed: true, hairWashedEmpty: false})}
                          style={this.state.hairWashed === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.hairWashed === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <Text style={this.state.hairShavedEmpty ? [mainStyles.textQuestion, mainStyles.itemRequired] : mainStyles.mt20}>Was any hair shaved?</Text>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({hairShaved: false, hairShavedEmpty: false})}
                          style={this.state.hairShaved === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.hairShaved === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({hairShaved: true, hairShavedEmpty: false})}
                          style={this.state.hairShaved === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.hairShaved === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  <Text style={this.state.assistanceEmpty ? [mainStyles.textQuestion, mainStyles.itemRequired, mainStyles.mt20] : [mainStyles.mt20]}>Assistance needed?</Text>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({assistanceRequired: false, assistance: "NO_SUPPORT", assistanceEmpty: false})}
                          style={this.state.assistanceRequired === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.assistanceRequired === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({assistanceRequired: true, assistance: undefined, assistanceEmpty: true})}
                          style={this.state.assistanceRequired === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.assistanceRequired === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  {
                      this.state.assistanceRequired && <MultipleCheckbox data={Data.assistanceChoices} onPress={element => this.setState({assistance: element.value, assistanceText: element.label, assistanceEmpty: false})} />

                  }
                  <Text style={[mainStyles.mt20, mainStyles.mb10, mainStyles.textQuestion]}>What equipment was used?</Text>
                  <Picker
                      styleText={this.state.equipmentUsedEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
                      placeholder="select"
                      data={Data.washEquipmentChoices}
                      pickerBinder={true}
                      onSelectLabel={(val) => { this.setState({equipmentUsedText: val}); }}

                      onPress={(val) => this.setState({equipmentUsed: val, equipmentUsedEmpty: false})} />
                  <Text style={[mainStyles.mt20, mainStyles.mb10, mainStyles.textQuestion]}>Was any assistance required to dry?</Text>
                  <Picker
                      styleText={this.state.assistanceDryEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
                      placeholder="select"
                      data={Data.assistanceChoices}
                      pickerBinder={true}
                      onSelectLabel={(val) => { this.setState({assistanceDryText: val}); }}

                      onPress={(val) => this.setState({assistanceDry: val, assistanceDryEmpty: false})} />
                  <TouchableOpacity style={mainStyles.notesThoughts} onPress={() => this.setState({notesAndThoughts: !this.state.notesAndThoughts})}>
                      <Icon name="add-circle-outline" color="#0066FF" size={20} />
                      <Text style={mainStyles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
                  </TouchableOpacity>
                  {this.state.notesAndThoughts &&
            (<View style={[mainStyles.mt20, mainStyles.mb20]}>
                <TextInput
                    style={[mainStyles.textInputForm, mainStyles.mt20]}
                    placeholder="Notes and thoughts"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({notes: text, notesAndThoughtsEmpty: false})}
                    value={this.state.notes}

                />
            </View>)
                  }
                  <View style={mainStyles.mt20}>
                      <Text style={this.state.moodEmpty ? mainStyles.moodRequired : mainStyles.mood}>SU mood is</Text>
                      <MultiMood onPressMood={this._onPressMood.bind(this)} />
                      <UrgencyFlag onChoose={(item) => this.setState({urgencyFlag: item})}></UrgencyFlag>
                      <TouchableOpacity
                          style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20]}
                          onPress={() => this._submitForm()}>
                          <Text style={mainStyles.textSubmit}>Preview and save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );

      } else if (this.state.careProvided == Data.careProvideChoices[2].value) {
          return (
              <View style={[mainStyles.mt20, mainStyles.prl20]}>
                  <Text style={[mainStyles.textQuestion]}>Who chose the SU clothing?</Text>
                  <Picker
                      styleText={this.state.suClothigEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
                      placeholder="select"
                      data={Data.suClothingChoices}
                      pickerBinder={true}
                      onSelectLabel={(val) => { this.setState({suClothigText: val}); }}

                      onPress={(val) => this.setState({suClothig: val, suClothigEmpty: false})} />
                  <Text style={this.state.assistanceEmpty ? [mainStyles.textQuestion, mainStyles.itemRequired, mainStyles.mt40] : [mainStyles.mt40]}>Assistance needed?</Text>
                  <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
                      <TouchableOpacity
                          onPress={() => this.setState({assistanceRequired: false, assistance: "NO_SUPPORT", assistanceEmpty: false})}
                          style={this.state.assistanceRequired === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.assistanceRequired === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({assistanceRequired: true, assistance: undefined, assistanceEmpty: true})}
                          style={this.state.assistanceRequired === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.assistanceRequired === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  {
                      this.state.assistanceRequired && <MultipleCheckbox data={Data.assistanceDressingChoices} onPress={element => this.setState({assistance: element.value, assistanceText: element.label, assistanceEmpty: false})} />

                  }
                  <TouchableOpacity style={mainStyles.notesThoughts} onPress={() => this.setState({notesAndThoughts: !this.state.notesAndThoughts})}>
                      <Icon name="add-circle-outline" color="#0066FF" size={20} />
                      <Text style={mainStyles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
                  </TouchableOpacity>
                  {this.state.notesAndThoughts &&
            (<View style={[mainStyles.mt20, mainStyles.mb20]}>
                <TextInput
                    style={[mainStyles.textInputForm, mainStyles.mt20]}
                    placeholder="Notes and thoughts"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({notes: text, notesAndThoughtsEmpty: false})}
                    value={this.state.notes}

                />
            </View>)
                  }
                  <View style={mainStyles.mt20}>
                      <Text style={this.state.moodEmpty ? mainStyles.moodRequired : mainStyles.mood}>SU mood is</Text>
                      <MultiMood onPressMood={this._onPressMood.bind(this)} />
                      <UrgencyFlag onChoose={(item) => this.setState({urgencyFlag: item})}></UrgencyFlag>
                      <TouchableOpacity
                          style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20]}
                          onPress={() => this._submitForm()}>
                          <Text style={mainStyles.textSubmit}>Preview and save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );

      } else {
          return (
              <View style={[mainStyles.prl20]}>
                  <Text style={this.state.assistanceEmpty ? [mainStyles.textQuestion, mainStyles.itemRequired, mainStyles.mt40] : [mainStyles.mt40]}>Assistance needed?</Text>
                  <View style={[styles.flexRow, styles.spaceAround]}>
                      <TouchableOpacity
                          onPress={() => this.setState({assistanceRequired: false, assistance: "NO_SUPPORT", assistanceEmpty: false})}
                          style={this.state.assistanceRequired === false ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.assistanceRequired === false ? styles.textActive : styles.textInActive}>No</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => this.setState({assistanceRequired: true, assistance: undefined, assistanceEmpty: true})}
                          style={this.state.assistanceRequired === true ? mainStyles.buttonActive : mainStyles.buttonInActive}>
                          <View style={styles.textContainer} >
                              <Text style={this.state.assistanceRequired === true ? styles.textActive : styles.textInActive}>Yes</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
                  {
                      this.state.assistanceRequired && <MultipleCheckbox data={Data.assistanceChoices} onPress={element => this.setState({assistance: element.value, assistanceText: element.label, assistanceEmpty: false})} />

                  }
                  <Text style={[mainStyles.textQuestion]}>What equipment was used?</Text>
                  <Picker
                      styleText={this.state.equipmentUsedEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
                      placeholder="select"
                      data={Data.toiletEquipmentChoices}
                      pickerBinder={true}
                      onSelectLabel={(val) => { this.setState({equipmentUsedText: val}); }}

                      onPress={(val) => this.setState({equipmentUsed: val, equipmentUsedEmpty: false})} />
                  <TouchableOpacity style={mainStyles.notesThoughts} onPress={() => this.setState({notesAndThoughts: !this.state.notesAndThoughts})}>
                      <Icon name="add-circle-outline" color="#0066FF" size={20} />
                      <Text style={mainStyles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
                  </TouchableOpacity>
                  {this.state.notesAndThoughts &&
            (<View style={[mainStyles.mt20, mainStyles.mb20]}>
                <TextInput
                    style={[mainStyles.textInputForm, mainStyles.mt20]}
                    placeholder="Notes and thoughts"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({notes: text, notesAndThoughtsEmpty: false})}
                    value={this.state.notes}

                />
            </View>)
                  }
                  <View style={mainStyles.mt20}>
                      <Text style={this.state.moodEmpty ? mainStyles.moodRequired : mainStyles.mood}>SU mood is</Text>
                      <MultiMood onPressMood={this._onPressMood.bind(this)} />
                      <UrgencyFlag onChoose={(item) => this.setState({urgencyFlag: item})}></UrgencyFlag>
                      <TouchableOpacity
                          style={[mainStyles.buttonSubmit, mainStyles.mb20, mainStyles.mt20]}
                          onPress={() => this._submitForm()}>
                          <Text style={mainStyles.textSubmit}>Preview and save</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          );
      }
  }

  _renderForm () {
      return (
          <View style={[mainStyles.mt20]}>

              <View style={mainStyles.prl20}>
                  <Picker
                      style={[this.state.careProvidedEmpty ? mainStyles.pickerRequired : mainStyles.picker, {height: 50}]}
                      placeholder="Select care provided"
                      hasShadow={true}
                      shadowColor="#0066FF"
                      data={Data.careProvideChoices}
                      onPress={this._onPressCare.bind(this)} />
              </View>
              {(this.state.careProvided != undefined) && this._renderQuestionnairForm()}

          </View>
      );
  }

  render () {
      return (
          <View style={[mainStyles.containerForm]}>
              {!this.state.isValid && this._showAlert()}
              <Geolocation onLocation={this._getLocation} />
              <ScrollView>
                  <View style={mainStyles.card} >
                      <Navbar menuID={2} appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
                      <TitleForm menuID={2} style={mainStyles.mt10} />
                  </View>
                  {!this.state.consentGained && <ConsentGain style={[mainStyles.mt10, mainStyles.prl20]} onPressConsent={this._onPressConsent.bind(this)} />}
                  {this.state.consentGained && this._renderForm()}
              </ScrollView>
          </View>
      );
  }
}

const dispatchToProps = (dispatch) => ({
    submitPersonal: (dataObj) => EventDispatcher.PostPersonalCare(dataObj, dispatch)
});

const stateToProps = (state) => {
    return {
        serviceUser: state.serviceuser.user,
        user_id: state.login.user_id
    };
};

export default connect(stateToProps, dispatchToProps)(PersonalCare);
