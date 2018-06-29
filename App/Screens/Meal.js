import React, { Component } from 'react'
import { View, ScrollView, Text, Button, TextInput, FlatList } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import Mood from '../Components/Mood';
import Navbar from '../Components/Navbar';
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from "../Actions";
import styles, { pickerSelectStyles } from './Styles/Meal'

class Meal extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      meal: undefined,
      mealPrepared: undefined,
      eatingMethod: undefined,
      eatingAmount: undefined,
      suChoice: undefined,
      nutrition: undefined,
      drink: undefined,
      comments: '',
      moods: [],
      arrayMoods: [''],
      thickeners: [],
    }   
  }

  _onPressMood(index, mood){
    let moods = this.state.moods;
    moods[index] = mood;
    this.setState({ moods });
  }

  _onChangeThickener(text, index){
    let thickeners = this.state.thickeners;
    thickeners[index] = text;
    this.setState({ thickeners });
  }

  renderForm(){
    return (
      <View style={styles.subContainerColumn}>
        <PickerSelect
          placeholder={{label: "Select meal", value: null,}}
          items={Data.mealChoices}
          onValueChange={(val) => this.setState({meal: val})}
          value={this.state.meal}
          style={{ ...pickerSelectStyles }}
        />
        <Text>Meal was prepared by</Text>
        <PickerSelect
          placeholder={{label: "select", value: null,}}
          items={Data.mealPreparedChoices}
          onValueChange={(val) => this.setState({mealPrepared: val})}
          value={this.state.mealPrepared}
          style={{ ...pickerSelectStyles }}
        />
        <Text>consisting of</Text>
        <PickerSelect
          placeholder={{label: "food", value: null,}}
          items={Data.foodChoices}
          onValueChange={(val) => this.setState({food: val})}
          value={this.state.food}
          style={{ ...pickerSelectStyles }}
        />
        <Text>SU ate</Text>
        <PickerSelect
          placeholder={{label: "how", value: null,}}
          items={Data.eatingMethodChoices}
          onValueChange={(val) => this.setState({eatingMethod: val})}
          value={this.state.eatingMethod}
          style={{ ...pickerSelectStyles }}
        />
        <Text>and consumed</Text>
        <PickerSelect
          placeholder={{label: "how much", value: null,}}
          items={Data.eatingAmountChoices}
          onValueChange={(val) => this.setState({eatingAmount: val})}
          value={this.state.eatingAmount}
          style={{ ...pickerSelectStyles }}
        />
        <Text>SU choice is</Text>
        <PickerSelect
          placeholder={{label: "select", value: null,}}
          items={Data.suChoices}
          onValueChange={(val) => this.setState({suChoice: val})}
          value={this.state.suChoice}
          style={{ ...pickerSelectStyles }}
        />
        <Text>and nutritional requirements are</Text>
        <PickerSelect
          placeholder={{label: "select", value: null,}}
          items={Data.nutritionChoices}
          onValueChange={(val) => this.setState({nutrition: val})}
          value={this.state.nutrition}
          style={{ ...pickerSelectStyles }}
        />
        <Text>Drink was</Text>
        <PickerSelect
          placeholder={{label: "select", value: null,}}
          items={Data.drinkChoices}
          onValueChange={(val) => this.setState({drink: val})}
          value={this.state.drink}
          style={{ ...pickerSelectStyles }}
        />
        <FlatList
          data={this.state.thickeners}
          keyExtractor={(item, index) => `equipments-${index}`}
          renderItem={({item, index}) => <TextInput
            style={styles.textInput}
            placeholder="Add moving equipment"
            onChangeText={(text) => this._onChangeThickener(text, index)}
            value={item}/>
          }
        />
        <Button
          title="Add thickener"
          color="black"
          onPress={() => this.setState({thickeners: this.state.thickeners.concat('')})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Additional comments for future meals..."
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
          title="Save Note"
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
          <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
          <View style={styles.subContainer}>
            <Text style={styles.appName}>Meal</Text>
          </View>
          {this.renderForm()}
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

export default connect(stateToProps, dispatchToProps)(Meal)
