import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import MultiMood from '../Components/MultiMood';
import Picker from '../Components/Picker';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import images from '../Themes/Images';
import mainStyles from '../Themes/Styles';
import styles from './Styles/Meal'

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
        "mood_1": this.state.moods[0].id,
        "rating_1": this.state.moods[0].rating,
        "comments": this.state.comments,
        "menu": this.state.menu,
        "service_user": 11, // waiting backend update
        "created_by": 328 // waiting backend update
      }

      if(this.state.moods.length > 1){
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }

      this.props.submitMeal(data)
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
            navigate('HomeScreen');
          }
        })
    }
  }

  _renderForm(){
    return (
      <View style={[styles.subContainerColumn]}>
        <Picker 
          style={this.state.mealEmpty ? mainStyles.pickerRequired : mainStyles.picker }
          placeholder="Select meal"
          data={Data.mealChoices}
          onPress={(val) => this.setState({meal: val, mealEmpty: false})}/>
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
          <Text>Meal was prepared by</Text>
          <Picker 
            styleText={this.state.mealPreparedEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="select"
            data={Data.mealPreparedChoices}
            onPress={(val) => this.setState({mealPrepared: val, mealPreparedEmpty: false})}/>
          <Text>consisting of</Text>
          <Picker 
            styleText={this.state.menuEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="food"
            data={Data.foodChoices}
            filter={true}
            onPress={(val) => this.setState({menu: val, menuEmpty: false})}/>
        </View>
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
          <Text>SU ate</Text>
          <Picker 
            styleText={this.state.eatingMethodEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="how"
            data={Data.eatingMethodChoices}
            onPress={(val) => this.setState({eatingMethod: val, eatingMethodEmpty: false})}/>
          <Text>and consumed</Text>
          <Picker 
            styleText={this.state.eatingAmountEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="how much"
            data={Data.eatingAmountChoices}
            onPress={(val) => this.setState({eatingAmount: val, eatingAmountEmpty: false})}/>
          <Text>SU choice is</Text>
          <Picker 
            styleText={this.state.suChoiceEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="select"
            data={Data.suChoices}
            onPress={(val) => this.setState({suChoice: val, suChoiceEmpty: false})}/>
          <Text>and nutritional requirements are</Text>
          <Picker 
            styleText={this.state.nutritionEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="select"
            data={Data.nutritionChoices}
            onPress={(val) => this.setState({nutrition: val, nutritionEmpty: false})}/>
        </View>
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
          <Text>Drink was</Text>
          <Picker 
            styleText={this.state.drinkEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="select"
            data={Data.drinkChoices}
            onPress={(val) => this.setState({drink: val, drinkEmpty: false})}/>
        </View>
        <FlatList
          data={this.state.thickeners}
          keyExtractor={(item, index) => `equipments-${index}`}
          renderItem={({item, index}) => <TextInput
            style={[mainStyles.textInputForm, mainStyles.mt10]}
            placeholder="Add thickener"
            onChangeText={(text) => this._onChangeThickener(text, index)}
            underlineColorAndroid='transparent'
            value={item}/>
          }
        />
        <TouchableOpacity
          style={mainStyles.addIcon}
          onPress={() => this.setState({thickeners: this.state.thickeners.concat('')})}>
          <Image style={mainStyles.imageAddIcon} source={images.addIcon}/>
          <Text>Add thickener</Text>
        </TouchableOpacity>
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="Additional comments for future meals..."
          onChangeText={(text) => this.setState({comments: text})}
          value={this.state.comments}
          underlineColorAndroid="transparent"
        />
        <Text style={this.state.moodEmpty ? mainStyles.moodRequired : mainStyles.mood}>SU mood is</Text>
        <MultiMood onPressMood={this._onPressMood.bind(this)} />
        <TouchableOpacity
          style={mainStyles.buttonSubmit}
          onPress={() => this._submitForm()}>
          <Text style={mainStyles.textSubmit}>SAVE NOTE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {!this.state.isValid && this._showAlert()}
          <View style={mainStyles.card} >
            <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={4} style={mainStyles.mt10}/>
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

export default connect(null, dispatchToProps)(Meal)
