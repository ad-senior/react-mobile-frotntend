import React, { Component } from 'react'
import { View, SectionList, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Data } from '../Config'
import Navbar from '../Components/Navbar';
import AlertMessage from '../Components/AlertMessage';
import Postpone from '../Components/Postpone';
import Record from '../Components/Record';
import styles from './Styles/Home'

class Home extends Component {
  constructor(props) {
    super(props);
    this.image = require('../Images/normal_1person-(porawee)_mamnul.png');
    this.portrait = require('../Images/Icons/icon-portrait.png');
    this.place = require('../Images/Icons/icon-place.png');
    this.takeNote = require('../Images/Icons/icon-playlist.png');
    this.checkBox = require('../Images/Icons/icon-check-box.png');
    this.clock = require('../Images/Icons/icon-clock-active.png');
  }

  _userCategory() {
    const { navigate } = this.props.navigation;
    navigate('CategoryScreen');
  }

  _onPressMenu(item) {
    const { navigate } = this.props.navigation;
    if(item.navigate){
      navigate(item.navigate);
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <AlertMessage />
        <ScrollView>
          <View style={styles.paddingLR}>
            <Navbar appName="DAILY NOTES" navigation={this.props.navigation} />
            <View style={styles.profile}>
              <View style={styles.profileDetail}>
                <Image style={styles.profileImage} source={this.image}/>
                <View>
                  <Text style={styles.profileName}>Porawee Raksasin</Text>
                  <View style={styles.profileDetail}>
                    <Image style={styles.placeIcon} source={this.place}/>
                    <Text style={styles.profileAddr}>42 Tower, BKK</Text>
                  </View>
                </View>
              </View>
              <Image style={styles.portrait} source={this.portrait}/>
            </View>
          </View>
          <View style={styles.takeNote}>
            <TouchableOpacity style={styles.buttonTakeNote} onPress={() => this._userCategory()}>
              <Image style={styles.takeNoteIcon} source={this.takeNote}/>
              <Text style={styles.takeNoteText}>TAKE NOTE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paddingLR}>
            <SectionList
              sections={Data.sections}
              renderItem={({item}) =>
                <View style={styles.sectionList}>
                  <View style={styles.timeContainer}>
                    {item.active &&
                      <Image style={styles.timeIcon} source={this.clock}/>
                    }
                    <Text style={item.active && styles.timeActive}>{item.time}</Text>
                  </View>
                  <View style={styles.menuContainer}>
                    <TouchableOpacity
                      style={item.completed ? [styles.buttonContainer, styles.disable] : styles.buttonContainer}
                      onPress={() => this._onPressMenu(item)}>
                      <View style={[styles.buttonImage, {backgroundColor: item.color}]}>
                        <Image style={styles.image} source={item.image}/>
                      </View>
                      <Text style={item.completed ? [styles.buttonText, styles.disableText] : styles.buttonText}>{item.name}</Text>
                      {item.completed &&
                        <Image style={styles.checkboxImage} source={this.checkBox}/>
                      }
                    </TouchableOpacity>
                    {item.active &&
                      <View style={styles.postponeContainer}>
                        <Postpone menuID={4} />
                        <Record menuID={4} />
                      </View>
                    }
                  </View>
                </View>
              }
              renderSectionHeader = {({section}) => <Text style={styles.textToday}>{section.title}</Text>}
              keyExtractor = {(item, index) => index}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Home
