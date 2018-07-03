import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import ConsentGain from '../Components/ConsentGain';
import MultiMood from '../Components/MultiMood';
import Navbar from '../Components/Navbar';
import Checkbox from '../Components/Checkbox';
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from "../Actions";
import styles, { pickerSelectStyles, pickerSelectStylesRequired, pickerSelectBodyStyles } from './Styles/PersonalCare'

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
      equipments: []
    }   
    this.addIcon = require('../Images/Form/ic_cancel_24px.png');
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
    if (this.state.hairWash == undefined){
      isValid=false;
      hairWashEmpty=true;
    }
    if (this.state.assistance == undefined){
      isValid=false;
      assistanceEmpty=true;
    }

    this.setState({
      isValid: isValid,
      careProvidedEmpty: careProvidedEmpty,
      cleanerEmpty: cleanerEmpty,
      bodyPartEmpty: bodyPartEmpty,
      toolEmpty: toolEmpty,
      hairWashEmpty: hairWashEmpty,
      dryEmpty: dryEmpty,
      assistanceEmpty: assistanceEmpty,
      moodEmpty: moodEmpty
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

      const data = {
        "care_provide": this.state.careProvided,
        "wear_decision": this.state.wearDecision,
        "cleaner_type": this.state.cleaner,
        "body_part": this.state.bodyPart,
        "dry_by": this.state.dry,
        "su_mood": this.state.moods[0].id, // waiting backend change flow { this.state.moods }
        "hair_wash_detail": shampoo, // waiting backend change flow { [shampoo, condition] }
        "assistance_detail": wash, // waiting backend change flow { [wash, outShower, dry] }
        "hair_wash": this.state.hairWash,
        "assistance": this.state.assistance,
        "hair_shave": this.state.hairShave,
        "comments": this.state.comments,
        "moving_equipment": `"${this.state.equipments}"`,
        "service_user": 11, // waiting backend update
        "created_by": 328 // waiting backend update
      }

      this.props.submitPersonal(data)
        .then(() => {
          const { navigate } = this.props.navigation;
          navigate('HomeScreen');
        })
    }
  }

  _renderAssistanceNeed(){
    return (
      <View style={[styles.marginTB]}>
        <Checkbox 
          style={[styles.marginTB, styles.marginLeft]}
          checked={this.state.needWash}
          title="Hair where shaved"
          onPress={() => this.setState({needWash: !this.state.needWash})} />
        <Checkbox 
          style={[styles.marginTB, styles.marginLeft]}
          checked={this.state.needOutShower}
          title="To get out of shower"
          onPress={() => this.setState({needOutShower: !this.state.needOutShower})} />
        <Checkbox 
          style={[styles.marginTB, styles.marginLeft]}
          checked={this.state.needDry}
          title="To get out of shower"
          onPress={() => this.setState({needDry: !this.state.needDry})} />
      </View>
    )
  }

  _renderHairWashDetail(){
    return (
      <View style={styles.marginTB}>
        <Checkbox 
          style={[styles.marginTB, styles.marginLeft]}
          checked={this.state.shampoo}
          title="Shampoo"
          onPress={() => this.setState({shampoo: !this.state.shampoo})} />
        <Checkbox 
          style={[styles.marginTB, styles.marginLeft]}
          checked={this.state.condition}
          title="Condition"
          onPress={() => this.setState({condition: !this.state.condition})} />
      </View>
    )
  }

  _renderForm(){
    return (
      <View style={styles.subContainerColumn}>
        <PickerSelect
          placeholder={{label: "Select care provided", value: null,}}
          items={Data.careProvideChoices}
          onValueChange={(val) => this.setState({careProvided: val, careProvidedEmpty: false})}
          value={this.state.careProvided}
          style={
            !this.state.careProvidedEmpty ?
              { ...pickerSelectStyles, placeholderColor:"black" }
            :
              { ...pickerSelectStylesRequired, placeholderColor:"red" }
          }
        />
        <View style={[styles.flexRow, styles.flexWrap]}>
          <Text>Type of cleaner for body used was</Text>
          <PickerSelect
            placeholder={{label: "select", value: null,}}
            items={Data.cleanerChoices}
            onValueChange={(val) => this.setState({cleaner: val, cleanerEmpty: false})}
            value={this.state.cleaner}
            style={
              !this.state.cleanerEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
            }
            hideIcon={true}
          />
          <Text>and SU washed</Text>
          <PickerSelect
            placeholder={{label: "what", value: null,}}
            items={Data.bodyPartChoices}
            onValueChange={(val) => this.setState({bodyPart: val, bodyPartEmpty: false})}
            value={this.state.bodyPart}
            style={
              !this.state.bodyPartEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
            }
            hideIcon={true}
          />
          <Text>using</Text>
          <PickerSelect
            placeholder={{label: "what", value: null,}}
            items={Data.toolChoices}
            onValueChange={(val) => this.setState({tool: val, toolEmpty: false})}
            value={this.state.tool}
            style={
              !this.state.toolEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
            }
            hideIcon={true}
          />
        </View>
        <FlatList
          data={this.state.equipments}
          keyExtractor={(item, index) => `equipments-${index}`}
          renderItem={({item, index}) => <TextInput
            style={styles.textInput}
            placeholder="Add moving equipment"
            onChangeText={(text) => this._onChangeEquipment(text, index)}
            value={item}/>
          }
        />
        <TouchableOpacity
          style={[styles.flexRow, styles.alignItems]}
          onPress={() => this.setState({equipments: this.state.equipments.concat('')})}>
          <Image style={styles.image} source={this.addIcon}/>
          <Text>Add moving equipment</Text>
        </TouchableOpacity>
        <Text style={this.state.hairWashEmpty && styles.itemRequired}>Hair washed?</Text>
        <View style={[styles.flexRow, styles.spaceAround]}>
          <TouchableOpacity
            onPress={() => this.setState({hairWash: false, hairWashEmpty: false })}
            style={this.state.hairWash === false ? styles.buttonActive : styles.button}
          >
            <Text>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({hairWash: true, hairWashEmpty: false })}
            style={this.state.hairWash === true ? styles.buttonActive : styles.button}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
        {this.state.hairWash && this._renderHairWashDetail()}
        <View style={styles.marginTB}>
          <Checkbox 
            checked={this.state.hairShave}
            title="Hair where shaved"
            onPress={() => this.setState({hairShave: !this.state.hairShave})} />
        </View>
        <View style={styles.flexRow}>
          <Text>Su dried</Text>
          <PickerSelect
            placeholder={{label: "how?", value: null,}}
            items={Data.dryChoices}
            onValueChange={(val) => this.setState({dry: val, dryEmpty: false})}
            value={this.state.dry}
            style={
              !this.state.dryEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
            }
            hideIcon={true}
          />
        </View>
        <Text style={this.state.assistanceEmpty && styles.itemRequired}>Assistance needed?</Text>
        <View style={[styles.flexRow, styles.spaceAround]}>
          <TouchableOpacity
            onPress={() => this.setState({assistance: false, assistanceEmpty: false })}
            style={this.state.assistance === false ? styles.buttonActive : styles.button}
          >
            <Text>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({assistance: true, assistanceEmpty: false })}
            style={this.state.assistance === true ? styles.buttonActive : styles.button}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
        {this.state.assistance && this._renderAssistanceNeed()}
        <TextInput
          style={styles.textInput}
          placeholder="What did SU decided to wear afterwards?"
          onChangeText={(text) => this.setState({wearDecision: text})}
          value={this.state.wearDecision}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Additional comments for future activities..."
          onChangeText={(text) => this.setState({comments: text})}
          value={this.state.comments}
        />
        <Text style={this.state.moodEmpty ? [styles.textCenter, styles.marginTB, styles.itemRequired] : [styles.textCenter, styles.marginTB]}>SU mood is</Text>
        <MultiMood onPressMood={this._onPressMood.bind(this)} />
        <TouchableOpacity
          style={styles.buttonSubmit}
          onPress={() => this._submitForm()}>
          <Text style={styles.textSubmit}>SAVE NOTE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {!this.state.isValid && this._showAlert()}
        <ScrollView>
          <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
          <Text style={styles.title}>Personal Care</Text>
          <ConsentGain onPressConsent={this._onPressConsent.bind(this)} />
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
    personalCare: state.daily.results
  };
}

export default connect(stateToProps, dispatchToProps)(PersonalCare)
