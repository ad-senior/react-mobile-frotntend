import React, {Component} from 'react';
import {View, SectionList, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {Data} from '../Config';
import {connect} from 'react-redux';
import {EventDispatcher} from '../Actions';
import Navbar from '../Components/Navbar';
import Text from '../Components/CustomText';
import AlertMessage from '../Components/AlertMessage';
import Postpone from '../Components/Postpone';
import Record from '../Components/Record';
import UserDropdown from '../Components/UserDropdown';
import styles from './Styles/Home';
import mainStyles from '../Themes/Styles.js';
import Fonts from '../Themes/Fonts';
import colors from '../Themes/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {emptyString} from '../Common/Strings';

const fontSmall = Fonts.sizeConfig.tiny;

const FirstRoute = ({_onLongPress, _onPressMenu, active}) => (
    <SectionList
        sections={Data.sections}
        renderItem={({item}) =>
            <View elevation={1}>
                {!item.completed &&
        <View style={[style.sectionList]}>
            <View style={style.timeContainer}>
                <Text style={(item.active) ? style.timeActive : style.timeInActive}>{item.time}</Text>
            </View>
            <View style={[style.menuContainer, {marginLeft: 1}]}>
                <TouchableOpacity
                    style={style.buttonContainer}
                    onLongPress={() => _onLongPress(item.name)}
                    onPress={() => _onPressMenu(item)}>
                    <View style={[style.buttonImage, {backgroundColor: item.color}]}>
                        <Image style={style.image} source={item.image}/>
                    </View>
                    <Text
                        style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
                {active === item.name &&
              <View style={styles.postponeContainer}>
                  <Postpone menuID={4} />
                  <Record menuID={4} />
              </View>
                }
            </View>
        </View>
                }
            </View>
        }
        keyExtractor = {(item, index) => index}
    />
);
const SecondRoute = () => (
    <View>
        <Text style={style.dateText}>26 June</Text>
        <SectionList
            sections={Data.sections}
            renderItem={({item}) =>
                <View elevation={1}>
                    {item.completed &&
          <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', marginBottom: 1}}>
                  <View style={style.completedTimeContainer}>
                      <Text style={(item.active) ? style.timeActive : style.timeInActive}>{item.time}</Text>
                  </View>
                  <View style={style.menuContainer}>
                      <View
                          style={style.completedButtonContainer}
                          onPress={() => this._onPressMenu(item)}>
                          <View style={[style.buttonSection2Image, {backgroundColor: item.color}]}>
                              <Image style={style.image} source={item.image}/>
                          </View>
                          <Text style={styles.buttonText}>{item.name}</Text>

                      </View>
                  </View>
              </View>
              <View style={{backgroundColor: '#fff', marginBottom: 15, padding: 15, elevation: 1}}>
                  <Text style={[styles.buttonText, {fontSize: 14}]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
              </View>
          </View>
                    }
                </View>
            }
            keyExtractor = {(item, index) => index}
        />
    </View>
);

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'first', title: 'To-do'},
                {key: 'second', title: 'Past notes'},
            ],
            serviceUsers: undefined,
            serviceUser: undefined,
            message: emptyString,
            active: emptyString
        };

        this.image = require('../Images/normal_1person-(porawee)_mamnul.png');
        this.place = require('../Images/Icons/icon-place.png');
        this.takeNote = require('../Images/Icons/icon-playlist.png');
        this.checkBox = require('../Images/Icons/icon-check-box.png');
        this.clock = require('../Images/Icons/icon-clock-active.png');
        this.profile = require('../Images/Profile/profile.png');
    }

    componentDidMount () {
        const {serviceUsers, serviceUser} = this.props;
        this.setState({serviceUsers: serviceUsers, serviceUser: serviceUser});
    }

    _userCategory () {
        const {navigate} = this.props.navigation;
        navigate('CategoryScreen');
    }

  _onPressMenu = (item) => {
      const {navigate} = this.props.navigation;
      if(item.navigate) {
          navigate(item.navigate, item.infoScreen);
      }
  }

  handlerLongClick = (name) => {
      this.setState({active: name});
  };

  _onPressUser (item) {
      const {updateUser} = this.props;
      this.setState({serviceUser: item});
      updateUser(item);
  }

  _truncated (text) {
      return text.length > 18 ? `${text.substr(0, 18)}...` : text;
  }

  render () {
      if (!this.state.serviceUser) {
          return (<View></View>);
      }else{
          const _fullName = this._truncated(`${this.state.serviceUser.first_name} ${this.state.serviceUser.last_name}`);
          const {navigation} = this.props;
          const msg = navigation.getParam('message', emptyString);
          return (
              <View style={styles.container}>
                  <AlertMessage message={msg}/>
                  
                  <View style={mainStyles.card} elevation={5}>
                      <Navbar appName="DAILY NOTES"  style={styles.appName} navigation={this.props.navigation} />
                      {
                        !this.props.is_SU && 
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
                      }
                  </View>
                  
                  <View style={[styles.takeNote, {backgroundColor: '#56dccd'}]}>
                      <TouchableOpacity style={style.buttonTakeNote} onPress={() => this._userCategory()}>
                          <Icon name="add-circle-outline" color="white" size={30}/>
                          <Text style={styles.takeNoteText}>TAKE NOTE</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={style.schedule}>
                  {
                      !this.props.is_SU 
                      ?
                      <TabView
                          navigationState={this.state}
                          renderScene={({route}) => {
                              switch (route.key) {
                              case 'first' :
                                  return <FirstRoute _onLongPress={this.handlerLongClick} _onPressMenu={this._onPressMenu} active={this.state.active} />;
                              case 'second' :
                                  return <SecondRoute checkBox={this.checkBox} />;
                              case 'default' :
                                  return null;
                              }
                          }}
                          getLabelText={() => { return "sdf"; }}

                          onIndexChange={index => this.setState({index})}
                          initialLayout={{width: Dimensions.get('window').width}}
                          renderTabBar={props =>
                              <TabBar
                                  {...props}
                                  getLabelText={({route}) => { return route.title; }}

                                  indicatorStyle = {{backgroundColor: '#446ffe'}}
                                  labelStyle = {{fontSize: 16, fontFamily: 'WorkSans-Bold',
                                      justifyContent: 'center', alignItems: 'center', color: '#000'}}
                                  style={{backgroundColor: colors.primary, padding: 5, marginBottom: 10}}
                                  tabStyle={{backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center'}}
                              />
                          }
                      />
                      :
                      <View>
                          <Text style={{fontSize: 16, fontFamily: 'WorkSans-Bold',
                                      textAlign: 'center', color: '#000', paddingVertical:20}}>To-do</Text>
                          <FirstRoute _onLongPress={this.handlerLongClick} _onPressMenu={this._onPressMenu} active={this.state.active} />;
                      </View>
                  }
                  </View>
              </View>
          );
      }
  }
}

const dispatchToProps = (dispatch) => ({
    updateUser: (user) => EventDispatcher.UpdateUser(user, dispatch),
});

const stateToProps = (state) => {
    return {
        serviceUsers: state.serviceuser.results,
        serviceUser: state.serviceuser.user,
        is_SU: state.login.is_SU
    };
};

export default connect(stateToProps, dispatchToProps)(Home);

const style = StyleSheet.create({
    schedule: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
    },
    sectionList: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    menuContainer: {
        flex: 1,
    },
    completedButtonContainer: {
        backgroundColor: '#FFF',
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    buttonContainer: {
        backgroundColor: '#FFF',
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
    },
    timeContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5
    },
    completedTimeContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    timeActive: {
        color: 'red',
        fontSize: fontSmall,
        fontFamily:"WorkSans-SemiBold"
    },
    timeInActive: {
        fontSize: fontSmall,
        color: 'grey',
        fontFamily:"WorkSans-SemiBold"
    },
    disable: {
        backgroundColor: '#e4e4e4'
    },
    buttonImage: {
        height: 35,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:10
    },
    buttonSection2Image: {
        height: 25,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        marginLeft: 10,
        textAlign: 'left',
        color: '#000',
        fontSize: 18
    },
    checkboxImage: {
        marginLeft: 'auto',
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        height:15,
        width:15
    },
    buttonTakeNote: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 45,
        paddingRight: 45,
        borderWidth: 1,
        borderColor: '#56dccd',
        borderRadius: 35,
        elevation: 15,
        backgroundColor:'#56dccd',
        shadowOffset:{x:0, y:1},
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius:5,
        padding:0,
    },
    dateText:{
        fontSize: 16,
        color:'grey',
        marginBottom: 5,
        fontFamily:"WorkSans-Regular"
    }
});
