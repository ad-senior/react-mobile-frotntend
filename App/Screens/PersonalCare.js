import React, { Component } from 'react'
// import { View, ScrollView, Text, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { View, ScrollView, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import TextInput from '../Components/CustomTextInput'
import Text from '../Components/CustomText'
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import Picker from '../Components/Picker';
import ConsentGain from '../Components/ConsentGain';
import MultiMood from '../Components/MultiMood';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import Checkbox from '../Components/Checkbox';
import images from '../Themes/Images';
import mainStyles from '../Themes/Styles';
import styles from './Styles/PersonalCare'

class PersonalCare extends Component {

  constructor(props) {
    super(props);
    this.state = {
      careProvided: undefined,
      cleaner: undefined,
      bodyPart: undefined,
      tool: undefined,
      hairWash: undefined,
      dry: undefined,
      assistance: undefined,
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
      assistanceEmpty: false,
      moodEmpty: false,
      wearDecision: '',
      comments: '',
      moods: [],
      equipments: [],
      wearDecisionIsEmpty: false,
      commentsIsEmpty: false
    }
  }

  _onPressConsent(consent){
    this.setState({consentGained: consent});
  }

  _onPressMood(moods){
    this.setState({moods: moods, moodEmpty: false });
  }

  _onChangeEquipment(text, index){
    let equipments = this.state.equipments;
    equipments[index] = text;
    this.setState({ equipments });
  }

  _showAlert(){
    Alert.alert(
      'Please complete the required information',
      '',
      [{text: 'Close', onPress: () => this.setState({isValid: true})}]
    )
  }

  _validation(){

    let isValid = this.state.isValid;
    let careProvidedEmpty = this.state.careProvidedEmpty;
    let cleanerEmpty = this.state.cleanerEmpty;
    let bodyPartEmpty = this.state.bodyPartEmpty;
    let toolEmpty = this.state.toolEmpty;
    let hairWashEmpty = this.state.hairWashEmpty;
    let dryEmpty = this.state.dryEmpty;
    let assistanceEmpty = this.state.assistanceEmpty;
    let moodEmpty = this.state.moodEmpty;
    let wearDecisionIsEmpty = this.state.wearDecisionIsEmpty;
    let commentsIsEmpty = this.state.commentsIsEmpty;

    if (!this.state.careProvided){
      isValid=false;
      careProvidedEmpty=true;
    }
    if (!this.state.cleaner){
      isValid=false;
      cleanerEmpty=true;
    }
    if (!this.state.bodyPart){
      isValid=false;
      bodyPartEmpty=true;
    }
    if (!this.state.tool){
      isValid=false;
      toolEmpty=true;
    }
    if (!this.state.dry){
      isValid=false;
      dryEmpty=true;
    }
    if (this.state.moods.length < 1){
      isValid=false;
      moodEmpty=true;
    }
    if(!(this.state.shampoo || this.state.condition) && this.state.hairWash === undefined){
      isValid=false;
      hairWashEmpty=true;
    }
    if(!(this.state.needWash || this.state.needOutShower ||this.state.needDry) && this.state.assistance === undefined){
      isValid=false;
      assistanceEmpty=true;
    }
    if(this.state.wearDecision === ''){
      isValid=false;
      wearDecisionIsEmpty=true;
    }
    // if(this.state.comments === ''){
    //   isValid=false;
    //   commentsIsEmpty=true;
    // }

    this.setState({
      isValid: isValid,
      careProvidedEmpty: careProvidedEmpty,
      cleanerEmpty: cleanerEmpty,
      bodyPartEmpty: bodyPartEmpty,
      toolEmpty: toolEmpty,
      hairWashEmpty: hairWashEmpty,
      dryEmpty: dryEmpty,
      assistanceEmpty: assistanceEmpty,
      moodEmpty: moodEmpty,
      wearDecisionIsEmpty: wearDecisionIsEmpty
      // commentsIsEmpty: commentsIsEmpty
    })

    return isValid;
  }

  _submitForm(){

    if(this._validation()){
      const shampoo = this.state.shampoo ? "SHAM" : null
      const condition = this.state.condition ? "CON" : null
      const wash = this.state.needWash ? "WASH" : null
      const outShower = this.state.needOutShower ? "SHOWER" : null
      const dry = this.state.needDry ? "DRY" : null
      const { serviceUser, user_id } = this.props;

      let hairWashDetail = [];
      let assistanceDetail = [];
      let n = 0;

      if(shampoo){
        hairWashDetail[n++] = shampoo;
      }
      if(condition){
        hairWashDetail[n] = condition;
      }
      n=0;
      if(wash){
        assistanceDetail[n++] = wash;
      }
      if(outShower){
        assistanceDetail[n++] = outShower;
      }
      if(dry){
        assistanceDetail[n] = dry;
      }

      let addToolIntoEquipments = this.state.equipments;
      addToolIntoEquipments.unshift(Data.toolChoices[this.state.tool-1]["label"]);
      this.setState({equipments: addToolIntoEquipments});

      const data = {
        "care_provide": this.state.careProvided,
        "wear_decision": this.state.wearDecision,
        "cleaner_type": this.state.cleaner,
        "body_part": this.state.bodyPart,
        "dry_by": this.state.dry,
        "mood_1": this.state.moods[0].id,
        "rating_1": this.state.moods[0].rating,
        "hair_wash_detail": hairWashDetail, // waiting backend change flow { [shampoo, condition] }
        "assistance_detail": assistanceDetail, // waiting backend change flow { [wash, outShower, dry] }
        "hair_wash": this.state.hairWash !== undefined ? this.state.hairWash : false,
        "assistance": this.state.assistance !== undefined ? this.state.assistance : false,
        "hair_shave": this.state.hairShave,
        // "comments": this.state.comments,
        "moving_equipment": JSON.stringify(this.state.equipments),
        "service_user": serviceUser.id,
        "created_by": user_id
      }
      if(this.state.moods.length > 1){
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }
      this.props.submitPersonal(data)
        .then((response) => {
          let data = response.postSuccess;
          if (data.error){
            Alert.alert(
              data.message,
              null,
              [{text: 'Close'}]
            )
          }else{
            const { navigate } = this.props.navigation;
            navigate('HomeScreen', {
              message: 'Personal care',
            });
          }
        })
    }
  }

  _renderAssistanceNeed(){
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
    )
  }

  _renderHairWashDetail(){
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
    )
  }

  _renderForm(){
    return (
      <View style={[mainStyles.mt20,mainStyles.prl20]}>
        <Picker
          style={this.state.careProvidedEmpty ? mainStyles.pickerRequired : mainStyles.picker }
          placeholder="Select care provided"
          data={Data.careProvideChoices}
          onPress={(val) => this.setState({careProvided: val, careProvidedEmpty: false})}/>
        <View style={[styles.flexRow, styles.flexWrap]}>
          <Text>Type of cleaner for body used was</Text>
          <Picker
            styleText={this.state.cleanerEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="select"
            data={Data.cleanerChoices}
            onPress={(val) => this.setState({cleaner: val, cleanerEmpty: false})}/>
          <Text>and SU washed</Text>
          <Picker
            styleText={this.state.bodyPartEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="what"
            data={Data.bodyPartChoices}
            onPress={(val) => this.setState({bodyPart: val, bodyPartEmpty: false})}/>
          <Text>using</Text>
          <Picker
            styleText={this.state.toolEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="what"
            data={Data.toolChoices}
            onPress={(val) => this.setState({tool: val, toolEmpty: false})}/>
        </View>
        <FlatList
          data={this.state.equipments}
          keyExtractor={(item, index) => `equipments-${index}`}
          renderItem={({item, index}) => <TextInput
            style={[mainStyles.textInputForm, mainStyles.mt10]}
            placeholder="Add moving equipment"
            onChangeText={(text) => this._onChangeEquipment(text, index)}
            underlineColorAndroid='transparent'/>
          }
        />
        <TouchableOpacity
          style={[mainStyles.addIcon,mainStyles.mb20]}
          onPress={() => this.setState({equipments: this.state.equipments.concat('')})}>
          <Image style={mainStyles.imageAddIcon} source={images.addIcon}/>
          <Text>Add moving equipment</Text>
        </TouchableOpacity>
        <Text style={this.state.hairWashEmpty && mainStyles.itemRequired}>Hair washed?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({hairWash: false, hairWashEmpty: false })}
            style={this.state.hairWash === false ? mainStyles.buttonActive : mainStyles.button}>
            <View style={styles.textContainer} >
            <Text style={this.state.hairWash === false ? styles.textActive : styles.textInActive}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({hairWash: true, hairWashEmpty: false })}
            style={this.state.hairWash === true ? mainStyles.buttonActive : mainStyles.button}>
            <View style={styles.textContainer} >
            <Text style={this.state.hairWash === true ? styles.textActive : styles.textInActive}>Yes</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.hairWash && this._renderHairWashDetail()}
        <View style={mainStyles.mt10}>
          <Checkbox
            checked={this.state.hairShave}
            title="Hair where shaved"
            onPress={() => this.setState({hairShave: !this.state.hairShave})} />
        </View>
        <View style={[styles.flexRow, mainStyles.mt10]}>
          <Text>Su dried</Text>
          <Picker
            styleText={this.state.dryEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="how?"
            data={Data.dryChoices}
            onPress={(val) => this.setState({dry: val, dryEmpty: false})}/>
        </View>
        <Text style={this.state.assistanceEmpty ? [mainStyles.mt10, mainStyles.itemRequired] : mainStyles.mt10}>Assistance needed?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({assistance: false, assistanceEmpty: false })}
            style={this.state.assistance === false ? mainStyles.buttonActive : mainStyles.button}>
            <View style={styles.textContainer} >
            <Text style={this.state.assistance === false ? styles.textActive : styles.textInActive}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({assistance: true, assistanceEmpty: false })}
            style={this.state.assistance === true ? mainStyles.buttonActive : mainStyles.button}>
            <View style={styles.textContainer} >
            <Text style={this.state.assistance === true ? styles.textActive : styles.textInActive}>Yes</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.assistance && this._renderAssistanceNeed()}
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10, this.state.wearDecisionIsEmpty && mainStyles.inputRequired]}
          placeholder="What did SU decide to wear afterwards?"
          onChangeText={(text) => this.setState({wearDecision: text, wearDecisionIsEmpty: false})}
          value={this.state.wearDecision}
          underlineColorAndroid='transparent'/>
        {/* <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10, this.state.commentsIsEmpty && mainStyles.inputRequired]}
          placeholder="Additional comments for future activities..."
          onChangeText={(text) => this.setState({comments: text, commentsIsEmpty: false})}
          value={this.state.comments}
          underlineColorAndroid='transparent'/> */}
        <Text style={this.state.moodEmpty ? mainStyles.moodRequired : mainStyles.mood}>SU mood is</Text>
        <MultiMood onPressMood={this._onPressMood.bind(this)} />
        <TouchableOpacity
          style={[mainStyles.buttonSubmit,mainStyles.mb10]}
          onPress={() => this._submitForm()}>
          <Text style={mainStyles.textSubmit}>SAVE NOTE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={[mainStyles.containerForm]}>
        {!this.state.isValid && this._showAlert()}
        <ScrollView>
          <View style={mainStyles.card} >
            <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={2} style={mainStyles.mt10}/>
          </View>
          <ConsentGain style={[mainStyles.mt10,mainStyles.prl20]} onPressConsent={this._onPressConsent.bind(this)} />
          {this.state.consentGained && this._renderForm()}
        </ScrollView>
      </View>
    )
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
}

export default connect(stateToProps, dispatchToProps)(PersonalCare)
