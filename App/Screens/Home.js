import React, { Component } from 'react'
import { View, SectionList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Data } from '../Config';
import { connect } from 'react-redux';
import { EventDispatcher } from '../Actions';
import Navbar from '../Components/Navbar';
import Text from '../Components/CustomText'
import AlertMessage from '../Components/AlertMessage';
import Postpone from '../Components/Postpone';
import Record from '../Components/Record';
import UserDropdown from '../Components/UserDropdown';
import styles from './Styles/Home';
import mainStyles from '../Themes/Styles.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceUsers: undefined,
      serviceUser: undefined,
      message: ''
    }

    this.image = require('../Images/normal_1person-(porawee)_mamnul.png');
    this.place = require('../Images/Icons/icon-place.png');
    this.takeNote = require('../Images/Icons/icon-playlist.png');
    this.checkBox = require('../Images/Icons/icon-check-box.png');
    this.clock = require('../Images/Icons/icon-clock-active.png');
    this.profile = require('../Images/Profile/profile.png');
  }

  componentDidMount(){
    const { serviceUsers, serviceUser } = this.props;
    this.setState({ serviceUsers: serviceUsers, serviceUser: serviceUser });
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

  _onPressUser(item) {
    const { updateUser } = this.props;
    this.setState({serviceUser: item});
    updateUser(item);
  }

  _truncated(text) {
    return text.length > 18 ? `${text.substr(0, 18)}...` : text;
  }

  render () {
    if (!this.state.serviceUser){
      return (<View></View>)
    }else{
      const _fullName = this._truncated(`${this.state.serviceUser.first_name} ${this.state.serviceUser.last_name}`);
      const { navigation } = this.props;
      const msg = navigation.getParam('message', '');
      return (
        <View style={styles.container}>
          <AlertMessage message={msg}/>
          <ScrollView>
            <View style={mainStyles.card} elevation={5}>
              <Navbar appName="DAILY NOTES"  style={styles.appName} navigation={this.props.navigation} />
              <View style={styles.profile}>
                <View style={styles.profileDetail}>
                  {
                    this.state.serviceUser.portrait_photo ?
                      <Image style={styles.profileImage} source={{uri: this.state.serviceUser.portrait_photo}}/>
                    :
                      <Image style={styles.profileImage} source={this.profile}/>
                  }
                  <View>
                    <Text style={styles.profileName}>
                      {_fullName}
                    </Text>
                    <View style={styles.profileDetail}>
                      <Image style={styles.placeIcon} source={this.place}/>
                      <Text style={styles.profileAddr}>{this.state.serviceUser.address}</Text>
                    </View>
                  </View>
                </View>
                <UserDropdown
                  data={this.state.serviceUsers}
                  onPress={(item) => this._onPressUser(item)}
                />
              </View>
            </View>
            <View style={styles.takeNote}>
              <TouchableOpacity style={styles.buttonTakeNote} onPress={() => this._userCategory()}>
                <Image style={styles.takeNoteIcon} source={this.takeNote}/>
                <Text style={styles.takeNoteText}>TAKE NOTE</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.schedule}>
              <SectionList
                sections={Data.sections}
                renderItem={({item}) =>
                  <View style={styles.sectionList}>
                    <View style={styles.timeContainer}>
                      {item.active &&
                        <Image style={styles.timeIcon} source={this.clock}/>
                      }
                      <Text style={(item.active) ? styles.timeActive : styles.timeInActive}>{item.time}</Text>
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
}

const dispatchToProps = (dispatch) => ({
  updateUser: (user) => EventDispatcher.UpdateUser(user, dispatch),
});

const stateToProps = (state) => {
  return {
    serviceUsers: state.serviceuser.results,
    serviceUser: state.serviceuser.user
  };
}

export default connect(stateToProps, dispatchToProps)(Home)
