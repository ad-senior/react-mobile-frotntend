import React, { Component } from 'react'
import { View, ScrollView, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import ConsentGain from '../Components/ConsentGain';
import Mood from '../Components/Mood';
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from "../Actions";
import styles, { pickerSelectStyles } from './Styles/PersonalCare'

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
      submited: false,
      consentGained: false, 
      shampoo: false,
      condition: false,
      hairShave: false,
      needWash: false,
      needOutShower: false,
      needDry: false,
      wearDecision: '',
      comments: '',
      moods: [],
      arrayMoods: [''],
      equipments: []
    }   
  }

  componentDidUpdate(){
    const { navigate } = this.props.navigation;
    let { personalCare } = this.props;
    if (this.state.submited && personalCare.id) {
      navigate('HomeScreen');
    }
  }

  _userCategory() {
    const { navigate } = this.props.navigation;
    navigate('CategoryScreen')
  }

  _onPressConsent(consent){
    this.setState({consentGained: consent});
  }

  _onPressMood(index, mood){
    let moods = this.state.moods;
    moods[index] = mood;
    this.setState({ moods });
  }

  _onChangeEquipment(text, index){
    let equipments = this.state.equipments;
    equipments[index] = text;
    this.setState({ equipments });
  }

  _submitForm(){

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
      "service_user": 11,
      "created_by": 328
    }

    this.props.submitPersonal(data);
    this.setState({submited: true});
  }

  renderAssistanceNeed(){
    return (
      <View>
        <Button
          title="To wash"
          color={!this.state.needWash ? "black" : "blue"}
          onPress={() => this.setState({needWash: !this.state.needWash})}
        />
        <Button
          title="To get out of shower"
          color={!this.state.needOutShower ? "black" : "blue"}
          onPress={() => this.setState({needOutShower: !this.state.needOutShower})}
        />
        <Button
          title="To dry"
          color={!this.state.needDry ? "black" : "blue"}
          onPress={() => this.setState({needDry: !this.state.needDry})}
        />
      </View>
    )
  }

  renderHairWashDetail(){
    return (
      <View>
        <Button
          title="Shampoo"
          color={!this.state.shampoo ? "black" : "blue"}
          onPress={() => this.setState({shampoo: !this.state.shampoo})}
        />
        <Button
          title="Condition"
          color={!this.state.condition ? "black" : "blue"}
          onPress={() => this.setState({condition: !this.state.condition})}
        />
      </View>
    )
  }

  renderForm(){
    return (
      <View style={styles.subContainerColumn}>
        <PickerSelect
          placeholder={{label: "Select care provided", value: null,}}
          items={Data.careProvideChoices}
          onValueChange={(val) => this.setState({careProvided: val})}
          value={this.state.careProvided}
          style={{ ...pickerSelectStyles }}
        />
        <Text>Type of cleaner for body used was</Text>
        <PickerSelect
          placeholder={{label: "select", value: null,}}
          items={Data.cleanerChoices}
          onValueChange={(val) => this.setState({cleaner: val})}
          value={this.state.cleaner}
          style={{ ...pickerSelectStyles }}
        />
        <Text>and SU washed</Text>
        <PickerSelect
          placeholder={{label: "what", value: null,}}
          items={Data.bodyPartChoices}
          onValueChange={(val) => this.setState({bodyPart: val})}
          value={this.state.bodyPart}
          style={{ ...pickerSelectStyles }}
        />
        <Text>using</Text>
        <PickerSelect
          placeholder={{label: "what", value: null,}}
          items={Data.toolChoices}
          onValueChange={(val) => this.setState({tool: val})}
          value={this.state.tool}
          style={{ ...pickerSelectStyles }}
        />
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
        <Button
          title="Add moving equipment"
          color="black"
          onPress={() => this.setState({equipments: this.state.equipments.concat('')})}
        />
        <Text>Hair washed?</Text>
        <View style={[styles.flexRow, styles.spaceAround]}>
          <TouchableOpacity
            onPress={() => this.setState({ hairWash: false })}
            style={this.state.hairWash === false ? styles.buttonActive : styles.button}
          >
            <Text>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ hairWash: true })}
            style={this.state.hairWash === true ? styles.buttonActive : styles.button}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
        {this.state.hairWash && this.renderHairWashDetail()}
        <Button
          title="Hair where shaved"
          color={!this.state.hairShave ? "black" : "blue"}
          onPress={() => this.setState({hairShave: !this.state.hairShave})}
        />
        <Text>Su dried</Text>
        <PickerSelect
          placeholder={{label: "how?", value: null,}}
          items={Data.dryChoices}
          onValueChange={(val) => this.setState({dry: val})}
          value={this.state.dry}
          style={{ ...pickerSelectStyles }}
        />
        <Text>Assistance needed?</Text>
        <View style={[styles.flexRow, styles.spaceAround]}>
          <TouchableOpacity
            onPress={() => this.setState({ assistance: false })}
            style={this.state.assistance === false ? styles.buttonActive : styles.button}
          >
            <Text>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ assistance: true })}
            style={this.state.assistance === true ? styles.buttonActive : styles.button}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
        {this.state.assistance && this.renderAssistanceNeed()}
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
        <FlatList
          data={this.state.arrayMoods}
          keyExtractor={(item, index) => `moods-${index}`}
          renderItem={({item, index}) => <Mood onPressMood={this._onPressMood.bind(this, index)} />}
        />
        <Button
          title="Add mood"
          color="black"
          onPress={() => this.setState({arrayMoods: this.state.arrayMoods.concat(this.state.arrayMoods.length)})}
        />
        <Button
          title="Save"
          color="blue"
          onPress={() => this._submitForm()}
        />
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.subContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this._userCategory()}>
              <Text style={styles.menuBackArrow}>&#8592;</Text>
            </TouchableOpacity>
            <Text style={styles.appName}>DAILY NOTES</Text>
            <Text style={styles.menuHamburger}>&#9776;</Text>
          </View>
          <View style={styles.subContainer}>
            <Text style={styles.appName}>Personal Care</Text>
          </View>
          <ConsentGain onPressConsent={this._onPressConsent.bind(this)} />
          {this.state.consentGained && this.renderForm()}
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
