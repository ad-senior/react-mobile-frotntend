import React, { Component } from 'react'
import { View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Text from '../Components/CustomText'
import { Data } from '../Config'
import Navbar from '../Components/Navbar';
import styles from './Styles/Category'
import mainStyles from '../Themes/Styles'

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GridColumnsValue: false,
      text: '',
      PickerValueHolder : '',
      Categories: Data.categories
    }
    this.arrayholder = Data.categories;
    this.searchIcon = require('../Images/Icons/search.png');
  }

  _getGridViewItem(_id){
    const { navigate } = this.props.navigation;
    navigate(Data.navigateCategories[_id]);
  }

  _searchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      GridColumnsValue: false,
      Categories: newData,
      text: text
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={mainStyles.card} >
            <Navbar appName="NEW NOTE" backMenu="HomeScreen" navigation={this.props.navigation} />
            <View style={[styles.panel, styles.mb0, styles.mt10]}>
              <Text style={styles.appName}>Add new note</Text>
            </View>
          </View>
          <View style={[styles.panel, styles.mb20]}>
            <View style={styles.MainContainer}>
              <FlatList
                data={ this.state.Categories }
                renderItem={({item}) =>
                  <TouchableOpacity
                    onPress={this._getGridViewItem.bind(this, item.id)}
                    style={[styles.panelCategory,mainStyles.square]}>
                    <View style={[styles.imageContainer, {backgroundColor: item.color}]}>
                      <Image style={styles.image} source={item.icon}/>
                    </View>
                    <Text style={styles.ItemTextStyle}>{item.label}</Text>
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
