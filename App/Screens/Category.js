import React, { Component } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Data } from '../Config'
import Navbar from '../Components/Navbar';
import styles from './Styles/Category'

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GridColumnsValue: false,
      text: '', 
      PickerValueHolder : '', 
      Categories: Data.categories
    }
    this.arrayholder = [];
    this.searchIcon = require('../Images/Icons/search.png');
  }

  GetGridViewItem(_id){
    const { navigate } = this.props.navigation;
    navigate(Data.navigateCategories[_id]);
  }

  SearchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.flower_name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      GridColumnsValue: false,
      dataSource: newData,
      text: text
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Navbar appName="DAILY NOTES" backMenu="HomeScreen" navigation={this.props.navigation} />
          <View style={[styles.panel, styles.mb0, styles.mt10]}>
            <Text style={styles.appName}>Add new note</Text>
          </View>
          <View style={[styles.panel, styles.mb20]}>
            <View style={styles.MainContainer}>
              <View style={[styles.searchSection, styles.mb20]}>
                <TextInput
                  style={styles.TextInputStyleClass}
                  onChangeText={(text) => this.SearchFilterFunction(text)}
                  value={this.state.text}
                  underlineColorAndroid='transparent'
                  placeholder="CATEGORIES"/>
                <Image style={styles.searchIcon} source={this.searchIcon}/>
              </View>
              <FlatList
                data={ this.state.Categories }
                renderItem={({item}) =>
                  <TouchableOpacity
                    onPress={this.GetGridViewItem.bind(this, item.id)}
                    style={styles.panelCategory}>
                    <View style={[styles.imageContainer, {backgroundColor: item.color}]}>
                      <Image style={styles.image} source={item.icon}/>
                    </View>
                    <Text style={styles.ItemTextStyle}>{item.name}</Text>
                  </TouchableOpacity>
                }
                numColumns = { this.state.GridColumnsValue ? 1 : 2 }
                key = {( this.state.GridColumnsValue ) ? 'ONE COLUMN' : 'TWO COLUMN' }
                keyExtractor={(item, index) => index}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Category
