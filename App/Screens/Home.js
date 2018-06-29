import React, { Component } from 'react'
import { View, SectionList, Text, Image, TouchableOpacity } from 'react-native';
import { Data } from '../Config'
import Navbar from '../Components/Navbar';
import styles from './Styles/Home'

class Home extends Component {
  constructor(props) {
    super(props);
    this.image = require('../Images/normal_1person-(porawee)_mamnul.png');
  }

  _userCategory() {
    const { navigate } = this.props.navigation;
    navigate('CategoryScreen')
  }

  render () {
    return (
      <View style={styles.container}>
        <Navbar appName="DAILY NOTES" backMenu="LoginScreen" navigation={this.props.navigation} />
        <View style={styles.panel}>
          <View style={styles.subPanel}>
            <Image style={styles.image} source={this.image}/>
            <View style={styles.panel}>
              <Text style={styles.profileName}>Porawee Raksasin</Text>
            </View>
            <View style={styles.panel}>
              <Text style={styles.profileAddr}>42 Tower, BKK</Text>
            </View>
            <Text style={styles.forgotten}>&#128100;</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this._userCategory()}>
            <Text style={styles.buttonText}>TAKE NOTE</Text>
          </TouchableOpacity>
        </View>
        <SectionList
          sections={Data.sections}  
          renderItem={({item}) =>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          }
          renderSectionHeader = {({section}) => <Text style={styles.textToday}>{section.title}</Text>}
          keyExtractor = {(item, index) => index}
        />
      </View>
    )
  }
}

export default Home
