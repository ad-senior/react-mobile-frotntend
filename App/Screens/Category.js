import React, { Component } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
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
    this.image = require('../Images/default/notepad-2.png');
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
        <Navbar appName="DAILY NOTES" backMenu="HomeScreen" navigation={this.props.navigation} />
        <View style={[styles.panel, styles.mb0, styles.mt10]}>
          <Text style={styles.appName}>Add new note</Text>
        </View>
        <View style={[styles.panel, styles.mb20]}>
          <View style={styles.MainContainer}>
            <TextInput
              style={styles.TextInputStyleClass}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              value={this.state.text}
              underlineColorAndroid='transparent'
              placeholder="Search Categories"
            />
            <FlatList
              data={ this.state.Categories }
              renderItem={({item}) =>
                <View style={styles.panelCategory}>
                  <Image style={styles.imageContainer} source={this.image} />
                    <Text onPress={this.GetGridViewItem.bind(this, item.id)} style={styles.ItemTextStyle} numberOfLines={1} >{item.name}</Text>
                </View>
              }
              numColumns = { this.state.GridColumnsValue ? 1 : 2 }
              key = {( this.state.GridColumnsValue ) ? 'ONE COLUMN' : 'TWO COLUMN' }
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Category
