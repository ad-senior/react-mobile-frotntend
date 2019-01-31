import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, AsyncStorage, Alert ,Image} from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import Geolocation from '../Components/Geolocation';
import MultiMood from '../Components/MultiMood';
import Picker from '../Components/Picker';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import images from '../Themes/Images';
import mainStyles from '../Themes/Styles';
import styles from './Styles/Meal'
import MultipleOptionIcon from '../Components/MultiOptionIcon';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PickerFood from "../Components/PickLocalStorage"
class Meal extends Component {
  constructor(props) {
    super(props);
    this.eatingAmountChoices = [
      {
        label: "Quarter of portion",
        value: "1",
        image: {
          uri: images.portionFood1
        }
      },
      {
        label: "Half of portion",
        value: "2",
        image: {
          uri:images.portionFood2
        }
      },
      {
        label: "Third portion",
        value: "3",
        image: {
          uri:images.portionFood3
        }
      },
      {
        label: "Full portion",
        value: "4",
        image: {
          uri: images.portionFood4
        }
      }
    ]

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
      moods: [],
      thickeners: false,
      menus: [],
      pickerSelected: '',
      pickerBinder: false,
      location: [null, null],
      notesThoughts: ''
    }
    this.icon = require('../Images/Icons/icon-arrow-dropdown.png');
  }
  componentDidMount(){
    const { menus } = this.props;

    if(menus.length > 0){
      let mealMenus = [];

      menus.map(function(item, index){
        let menu = {};
        menu.label = item.name;
        menu.value = item.id;
        mealMenus.push(menu);
      });

      this.setState({menus: mealMenus});
    }
    AsyncStorage.setItem("IsReview","False")
  }

  _onChangeThickener(text, index){
    this.setState({ thickener:text });
  }

  _showAlert(){
    Alert.alert(
      'Please complete the required information',
      '',
      [{text: 'Close', onPress: () => this.setState({isValid: true})}]
    )
  }

  _getLocation = (loc) => {
    this.setState({location: loc});
  }

  _currentMealLabel = (text) => {
    this.setState({pickerSelected: text});
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

      const { serviceUser, user_id } = this.props;
      const data = {
        "meal": this.state.meal,
        "prepared": this.state.mealPrepared,
        "eating_amount": this.state.eatingAmount,
        "eating_method": this.state.eatingMethod,
        "eating_type": this.state.suChoice,
        "su_drink": this.state.drink,
        "thickener": (this.state.thickeners) ? this.state.thickener : '',
        "nutritional_requirements": this.state.nutrition,
        "mood_1": this.state.moods[0].id,
        "rating_1": this.state.moods[0].rating,
        "food_item": this.state.menu,
        "service_user": serviceUser.id,
        "created_by": user_id,
        "location": this.state.location,
        'notes_and_thoughts': this.state.notesThoughts
      }

      const keywords = {
        meal: this.state.mealText,
        prepared: this.state.mealPreparedText,
        "eating_method": this.state.eatingMethodText,
        "eating_type": this.state.suChoiceText,
        "su_drink": this.state.drinkText,
        thickener : this.state.thickeners ? this.state.thickener : 'No thickener',
        nutrition:this.state.nutritionText
        
      }
      if(this.state.moods.length > 1){
        data["mood_2"] = this.state.moods[1].id;
        data["rating_2"] = this.state.moods[1].rating;
      }

      const { navigate } = this.props.navigation;
        AsyncStorage.getItem("IsReview").then((value) => {
          if (value == "True") {
            navigate('MealReview', {message: 'Meal', data, keywords});
          }else{
            this.props.submitMeal(data)
              .then((response) => {
                let data = response.postSuccess;
                if (data.error){
                  Alert.alert(
                    JSON.stringify(data.message),
                    null,
                    [{text: 'Close'}]
                  )
                } else {
                  navigate('MealReview', {message: 'Meal', data, keywords});
                  AsyncStorage.setItem("ReviewID", data.id.toString());
                }
              })
          }
        }).done()
      
        
    }
  }

  _renderForm(){
    if(this.state.menus.length < 1){
      return (<View></View>)
    }else{
      return (
        <View style={[styles.subContainerColumn]}>
          <Geolocation onLocation={this._getLocation} />
          <View style={[mainStyles.mt10]}>
            <Picker
              style={this.state.mealEmpty ? [mainStyles.pickerRequired] : [mainStyles.picker]}
              onSelectLabel={this._currentMealLabel.bind(this)} pickerBinder={true}
              hasShadow={true}
              shadowColor="#0066FF"
              placeholder="Select meal  "
              data={Data.mealChoices}
              pickerBinder={true}
              onSelectLabel={(val) => { this.setState({ mealText: val }) }}
              onPress={(val) => this.setState({meal: val, mealEmpty: false})}/>
          </View>
          <View style={[styles.flexRow, styles.flexWrap,mainStyles.mt20]}>
            <Text style={[mainStyles.textQuestion]}>Meal was prepared by</Text>
            <Picker
              styleText={this.state.mealPreparedEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
              placeholder="select  "
              data={Data.mealPreparedChoices}
              pickerBinder={true}
              onSelectLabel={(val) => { this.setState({ mealPreparedText: val }) }}
              
              onPress={(val) => this.setState({mealPrepared: val, mealPreparedEmpty: false})}/>
            </View>
          <View style={[styles.flexRow, styles.flexWrap,mainStyles.mt20]}>
          
            <Text style={[mainStyles.textQuestion]}>consisting of </Text>
            <View style={[styles.flexRow, {borderBottomWidth:1,borderBottomColor:"#0066FF"}]}>
          <PickerFood
              storagekey="mealFood"
              styleText={this.state.menuEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody}
              placeholder="select food  "
              filter={true}
              hideIcon={true}
              onPress={(val) => { this.setState({ menu: val, menuEmpty: false }) }} />
            <Image style={styles.image} source={this.icon} />
            </View>
          </View>
          <View style={[styles.flexRow,styles.flexWrap, mainStyles.mt20]}>
            <Text style={[mainStyles.textQuestion, this.state.eatingAmountEmpty && mainStyles.itemRequired]}>How much food was eaten?</Text>
            <MultipleOptionIcon
              data={this.eatingAmountChoices}
              onPress={item => { this.setState({ eatingAmount: item.value, eatingAmountEmpty: false }) }}
            >
            </MultipleOptionIcon>
          </View>
          <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt20]}>
            <Text style={[mainStyles.textQuestion]}>SU ate</Text>
            <Picker
              styleText={this.state.eatingMethodEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
              placeholder="how  "
              pickerBinder={true}
              onSelectLabel={(val) => { this.setState({ eatingMethodText: val }) }}
              data={Data.eatingMethodChoices}
              onPress={(val) => this.setState({ eatingMethod: val, eatingMethodEmpty: false })} />
          </View>
          <View style={[styles.flexRow, styles.flexWrap,mainStyles.mt20]}>
            <Text style={[mainStyles.textQuestion]}>SU choice is</Text>
            <Picker
              styleText={this.state.suChoiceEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
              placeholder="select  "
              data={Data.suChoices}
              pickerBinder={true}
              onSelectLabel={(val) => { this.setState({ suChoiceText: val }) }}
              onPress={(val) => this.setState({ suChoice: val, suChoiceEmpty: false })} />
            <Text style={[mainStyles.textQuestion]}>and nutritional requirements are</Text>
            <Picker
              styleText={this.state.nutritionEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
              placeholder="select  "
              data={Data.nutritionChoices}
              pickerBinder={true}
              onSelectLabel={(val) => { this.setState({ nutritionText: val }) }}
              onPress={(val) => this.setState({nutrition: val, nutritionEmpty: false})}/>
          </View>
          <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt20]}>
            <Text style={[mainStyles.textQuestion]}>Drink was</Text>
            <Picker
              styleText={this.state.drinkEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
              placeholder="select  "
              data={Data.drinkChoices}
              pickerBinder={true}
              onSelectLabel={(val) => { this.setState({drinkText: val }) }}
              onPress={(val) => this.setState({drink: val, drinkEmpty: false})}/>
          </View>
          {this.state.thickeners && 
            <TextInput
                style={[mainStyles.textInputForm, mainStyles.mt10]}
                multiline={true}
                numberOfLines={2}
                placeholder="Thickener"
                onChangeText={(text) => this._onChangeThickener(text)}
                underlineColorAndroid='transparent'/>
              }
          <View style={mainStyles.mt20}>
            <TouchableOpacity
              style={mainStyles.addIcon}
              onPress={() => this.setState({thickeners: true})}>
              <Icon name="add-circle-outline" color="#0066FF" size={20}/>
              <Text style={[{color:'#B2B2B2'}]}>Add thickener</Text>
            </TouchableOpacity>
          </View>
          

          <TouchableOpacity onPress={() => this.setState({ show_notes: true })}>
          <View style={styles.notesThoughts}>
            <View style={styles.notesThoughtsView} >
              <Text style={{color:'#0066FF'}}>+</Text>
            </View>
            <Text style={styles.notesThoughtText}> ADD NOTES AND THOUGHTS</Text>
          </View>
          </TouchableOpacity>
          { this.state.show_notes &&
          (<View style={[mainStyles.mt20,mainStyles.mb20]}>
            <TextInput
              style={[mainStyles.textInputForm, mainStyles.mt20]}
              placeholder="Notes and thoughts"
              underlineColorAndroid='transparent'
              onChangeText={(text) =>  this.setState({notesThoughts:text})}
            />
          </View>) }
          <View style={[mainStyles.mt20]}>
            <Text style={this.state.moodEmpty ? mainStyles.moodRequired : mainStyles.mood}>SU mood is</Text>
            <MultiMood onPressMood={(moods) => this.setState({moods: moods, moodEmpty: false})} />
            <TouchableOpacity
              style={[mainStyles.buttonSubmit,mainStyles.mb20,mainStyles.mt20]}
              onPress={() => this._submitForm()}>
              <Text style={mainStyles.textSubmit}>Preview and save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {!this.state.isValid && this._showAlert()}
          <View style={mainStyles.card} >
            <Navbar menuID={4} appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
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

const stateToProps = (state) => {
  return {
    serviceUser: state.serviceuser.user,
    user_id: state.login.user_id,
    menus: state.daily.menus
  };
}

export default connect(stateToProps, dispatchToProps)(Meal)
