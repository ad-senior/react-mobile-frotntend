import React, { Component } from 'react'
// import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import TitleForm from '../Components/TitleForm';
import Navbar from '../Components/Navbar';
import mainStyles from '../Themes/Styles';
import styles from './Styles/NightChecks';

class NightChecks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wearingPad: undefined,
      bedrailsUp: undefined,
      wokenUp: undefined,
      description: '',
      sleepTime: '00:00'
    }
  }

  _submitForm(){
    const { navigate } = this.props.navigation;
    navigate('CategoryScreen');
  }

  _renderForm(){
    return (
      <View style={[mainStyles.mt20,mainStyles.prl20]}>
        <View style={styles.timeContainer}>
          <Text>SU went to sleep at</Text>
          <TextInput
            style={styles.textInputTime}
            onChangeText={(text) => this.setState({sleepTime: text})}
            value={this.state.sleepTime}
            underlineColorAndroid='transparent'/>
        </View>
        <Text style={mainStyles.mt10}>Is SU wearing a pad?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({wearingPad: false})}
            style={this.state.wearingPad === false ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.wearingPad === false ? styles.textActive : styles.textInActive}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({wearingPad: true})}
            style={this.state.wearingPad === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.wearingPad === true ? styles.textActive : styles.textInActive}>Yes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={mainStyles.mt10}>Are bedrails up?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({bedrailsUp: false})}
            style={this.state.bedrailsUp === false ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.bedrailsUp === false ? styles.textActive : styles.textInActive}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({bedrailsUp: true})}
            style={this.state.bedrailsUp === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.bedrailsUp === true ? styles.textActive : styles.textInActive}>Yes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={mainStyles.mt10}>Has SU woken up during the night?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({wokenUp: false})}
            style={this.state.wokenUp === false ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.wokenUp === false ? styles.textActive : styles.textInActive}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({wokenUp: true})}
            style={this.state.wokenUp === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <View style={styles.textContainer} >
              <Text style={this.state.wokenUp === true ? styles.textActive : styles.textInActive}>Yes</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="What did SU wake up for?"
          onChangeText={(text) => this.setState({description: text})}
          value={this.state.description}
          underlineColorAndroid='transparent'/>
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
          <View style={mainStyles.card} >
            <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={5} style={mainStyles.mt10}/>
          </View>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

export default NightChecks
