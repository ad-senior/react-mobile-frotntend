import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import MultiMood from '../Components/MultiMood';
import Navbar from '../Components/Navbar';
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from "../Actions";
import styles, { pickerSelectStyles, pickerSelectBodyStyles, pickerSelectStylesRequired } from './Styles/Meal'

class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      meal: undefined,
      mealPrepared: undefined,
      menu: undefined,
      eatingMethod: undefined,
      eatingAmount: undefined,
      suChoice: undefined,
      nutrition: undefined,
      drink: undefined,
      isValid: true,
      mealEmpty: false,
      mealPreparedEmpty: false,
      menuEmpty: false,
      eatingMethodEmpty: false,
      eatingAmountEmpty: false,
      suChoiceEmpty: false,
      nutritionEmpty: false,
      drinkEmpty: false,
      moodEmpty: false,
      comments: '',
      moods: [],
      thickeners: [],
    }
    this.addIcon = require('../Images/Form/ic_cancel_24px.png');
  }

  _onPressMood(moods){
    this.setState({moods: moods, moodEmpty: false });
  }

  _onChangeThickener(text, index){
    let thickeners = this.state.thickeners;
    thickeners[index] = text;
    this.setState({ thickeners });
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
    let mealEmpty = this.state.mealEmpty;
    let mealPreparedEmpty = this.state.mealPreparedEmpty;
    let menuEmpty = this.state.menuEmpty;
    let eatingMethodEmpty = this.state.eatingMethodEmpty;
    let eatingAmountEmpty = this.state.eatingAmountEmpty;
    let suChoiceEmpty = this.state.suChoiceEmpty;
    let nutritionEmpty = this.state.nutritionEmpty;
    let drinkEmpty = this.state.drinkEmpty;
    let moodEmpty = this.state.moodEmpty;

    if(!this.state.meal){
      isValid=false;
      mealEmpty=true;
    }
    if(!this.state.mealPrepared){
      isValid=false;
      mealPreparedEmpty=true;
    }
    if(!this.state.menu){
      isValid=false;
      menuEmpty=true;
    }
    if(!this.state.eatingMethod){
      isValid=false;
      eatingMethodEmpty=true;
    }
    if(!this.state.eatingAmount){
      isValid=false;
      eatingAmountEmpty=true;
    }
    if(!this.state.suChoice){
      isValid=false;
      suChoiceEmpty=true;
    }
    if(!this.state.nutrition){
      isValid=false;
      nutritionEmpty=true;
    }
    if(!this.state.drink){
      isValid=false;
      drinkEmpty=true;
    }
    if(this.state.moods.length < 1){
      isValid=false;
      moodEmpty=true;
    }

    this.setState({
      isValid: isValid,
      mealEmpty: mealEmpty,
      mealPreparedEmpty: mealPreparedEmpty,
      menuEmpty: menuEmpty,
      eatingMethodEmpty: eatingMethodEmpty,
      eatingAmountEmpty: eatingAmountEmpty,
      suChoiceEmpty: suChoiceEmpty,
      nutritionEmpty: nutritionEmpty,
      drinkEmpty: drinkEmpty,
      moodEmpty: moodEmpty
    })

    return isValid
  }

  _submitForm(){

    if(this._validation()){

      const data = {
        "meal": this.state.meal,
        "prepared": this.state.mealPrepared,
        "eating_amount": this.state.eatingAmount,
        "eating_method": this.state.eatingMethod,
        "su_mood": this.state.moods[0].id, // waiting backend change flow { this.state.moods
        "comments": this.state.comments,
        "menu": this.state.menu,
        "service_user": 11, // waiting backend update
        "created_by": 328 // waiting backend update
      }

      this.props.submitMeal(data)
        .then(() => {
          const { navigate } = this.props.navigation;
          navigate('HomeScreen');
        })
    }
  }

  _renderForm(){
    return (
      <View style={styles.subContainerColumn}>
        <PickerSelect
          placeholder={{label: "Select meal", value: null,}}
          items={Data.mealChoices}
          onValueChange={(val) => this.setState({meal: val, mealEmpty: false})}
          value={this.state.meal}
          style={
            this.state.mealEmpty ?
              { ...pickerSelectStylesRequired, placeholderColor: 'red' }
            :
              { ...pickerSelectStyles }
          }
        />
        <View style={[styles.flexRow, styles.flexWrap, styles.marginTop]}>
          <Text>Meal was prepared by</Text>
          <PickerSelect
            placeholder={{label: "select", value: null,}}
            items={Data.mealPreparedChoices}
            onValueChange={(val) => this.setState({mealPrepared: val, mealPreparedEmpty: false})}
            value={this.state.mealPrepared}
            style={
              this.state.mealPreparedEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
            }
            hideIcon={true}
          />
          <Text>consisting of</Text>
          <PickerSelect
            placeholder={{label: "food", value: null,}}
            items={Data.foodChoices}
            onValueChange={(val) => this.setState({menu: val, menuEmpty: false})}
            value={this.state.menu}
            style={
              this.state.menuEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
            }
            hideIcon={true}
          />
        </View>
        <View style={[styles.flexRow, styles.flexWrap, styles.marginTop]}>
          <Text>SU ate</Text>
          <PickerSelect
            placeholder={{label: "how", value: null,}}
            items={Data.eatingMethodChoices}
            onValueChange={(val) => this.setState({eatingMethod: val, eatingMethodEmpty: false})}
            value={this.state.eatingMethod}
            style={
              this.state.eatingMethodEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
            }
            hideIcon={true}
          />
          <Text>and consumed</Text>
          <PickerSelect
            placeholder={{label: "how much", value: null,}}
            items={Data.eatingAmountChoices}
            onValueChange={(val) => this.setState({eatingAmount: val, eatingAmountEmpty: false})}
            value={this.state.eatingAmount}
            style={
              this.state.eatingAmountEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
            }
            hideIcon={true}
          />
          <Text>SU choice is</Text>
          <PickerSelect
            placeholder={{label: "select", value: null,}}
            items={Data.suChoices}
            onValueChange={(val) => this.setState({suChoice: val, suChoiceEmpty: false})}
            value={this.state.suChoice}
            style={
              this.state.suChoiceEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
            }
            hideIcon={true}
          />
          <Text>and nutritional requirements are</Text>
          <PickerSelect
            placeholder={{label: "select", value: null,}}
            items={Data.nutritionChoices}
            onValueChange={(val) => this.setState({nutrition: val, nutritionEmpty: false})}
            value={this.state.nutrition}
            style={
              this.state.nutritionEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
            }
            hideIcon={true}
          />
        </View>
        <View style={[styles.flexRow, styles.flexWrap, styles.marginTop]}>
          <Text>Drink was</Text>
          <PickerSelect
            placeholder={{label: "select", value: null,}}
            items={Data.drinkChoices}
            onValueChange={(val) => this.setState({drink: val, drinkEmpty: false})}
            value={this.state.drink}
            style={
              this.state.drinkEmpty ?
                { ...pickerSelectBodyStyles, placeholderColor:"red" }
              :
                { ...pickerSelectBodyStyles, placeholderColor:"blue" }
            }
            hideIcon={true}
          />
        </View>
        <FlatList
          data={this.state.thickeners}
          keyExtractor={(item, index) => `equipments-${index}`}
          renderItem={({item, index}) => <TextInput
            style={styles.textInput}
            placeholder="Add thickener"
            onChangeText={(text) => this._onChangeThickener(text, index)}
            value={item}/>
          }
        />
        <TouchableOpacity
          style={[styles.flexRow, styles.alignItems]}
          onPress={() => this.setState({thickeners: this.state.thickeners.concat('')})}>
          <Image style={styles.image} source={this.addIcon}/>
          <Text>Add thickener</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Additional comments for future meals..."
          onChangeText={(text) => this.setState({comments: text})}
          value={this.state.comments}
        />
        <Text style={this.state.moodEmpty ? [styles.textCenter, styles.marginTB, styles.itemRequired] : [styles.textCenter, styles.marginTB]}>
          SU mood is
        </Text>
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
        <ScrollView>
          {!this.state.isValid && this._showAlert()}
          <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
          <View style={styles.subContainer}>
            <Text style={styles.appName}>Meal</Text>
          </View>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  submitMeal: (dataObj) => EventDispatcher.PostMeal(dataObj, dispatch),
});

const stateToProps = (state) => {
  return {
    meal: state.daily.results
  };
}

export default connect(stateToProps, dispatchToProps)(Meal)
