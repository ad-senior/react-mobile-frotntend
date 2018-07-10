import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Data } from '../Config'
import MultiMood from '../Components/MultiMood';
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import images from '../Themes/Images';
import mainStyles from '../Themes/Styles';
import styles from './Styles/ContactLog';

class ContactLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitor: undefined,
      text: '',
      description: '',
      comments: '',
      Categories: Data.categories,
      moods: []
    }
    this.arrayholder = Data.categories;
  }

  _onPressMood(moods){
    this.setState({moods: moods, moodEmpty: false });
  }

  _searchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })  
    this.setState({
      Categories: newData,
      text: text
    })  
  }

  _submitForm(){
    const { navigate } = this.props.navigation;
    navigate('CategoryScreen');
  }

  _renderForm(){
    return (
      <View style={mainStyles.mt20}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.TextInputStyleClass}
            onChangeText={(text) => this._searchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid='transparent'
            placeholder="Who visited/called?"/>
          <Image style={styles.searchIcon} source={images.searchIcon}/>
        </View>
        <Text style={mainStyles.mt10}>Did visitor interact with SU?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({visitor: false})}
            style={this.state.visitor === false ? mainStyles.buttonActive : mainStyles.button}
          >
            <Text>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({visitor: true})}
            style={this.state.visitor === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="Give a short description of the visit/call"
          onChangeText={(text) => this.setState({description: text})}
          value={this.state.description}
          underlineColorAndroid='transparent'/>
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="Additional comments for future contacts..."
          onChangeText={(text) => this.setState({comments: text})}
          value={this.state.comments}
          underlineColorAndroid='transparent'/>
        <Text style={mainStyles.mood}>SU mood is</Text>
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
      <View style={mainStyles.containerForm}>
        <ScrollView>
          <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
          <TitleForm menuID={6} style={mainStyles.mt10}/>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

export default ContactLog
