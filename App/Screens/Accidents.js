import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Data } from '../Config';
import Navbar from '../Components/Navbar';
import TitleForm from '../Components/TitleForm';
import PickerSelect from 'react-native-picker-select';
import Picker from '../Components/Picker';
import Checkbox from '../Components/Checkbox';
import mainStyles from '../Themes/Styles'
import styles from './Styles/Accidents'

class Accidents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginAggressive: undefined,
      reportTo: undefined,
      towardsSU: false,
      towardsStaff: false,
      callPolice: false,
      callParamedics: false,
      callFamily: false,
      reportToEmpty: false,
      happened: '',
      suSay: '',
      resolved: '',
      lastIncident: '00:00'
    }
  }

  _submitForm(){
    const { navigate } = this.props.navigation;
    navigate('CategoryScreen');
  }

  _renderCalled(){
    return (
      <View>
        <Checkbox 
          style={[mainStyles.mt10, mainStyles.ml20]}
          checked={this.state.callPolice}
          title="Police"
          onPress={() => this.setState({callPolice: !this.state.callPolice})} />
        <Checkbox 
          style={[mainStyles.mt10, mainStyles.ml20]}
          checked={this.state.callParamedics}
          title="Paramedics"
          onPress={() => this.setState({callParamedics: !this.state.callParamedics})} />
        <Checkbox 
          style={[mainStyles.mt10, mainStyles.ml20]}
          checked={this.state.callFamily}
          title="Family"
          onPress={() => this.setState({callFamily: !this.state.callFamily})} />
      </View>
    )
  }

  _renderTowards(){
    return (
      <View>
        <Checkbox 
          style={[mainStyles.mt10, mainStyles.ml20]}
          checked={this.state.towardsSU}
          title="Towards other SUs"
          onPress={() => this.setState({towardsSU: !this.state.towardsSU})} />
        <Checkbox 
          style={[mainStyles.mt10, mainStyles.ml20]}
          checked={this.state.towardsStaff}
          title="Towards staff members"
          onPress={() => this.setState({towardsStaff: !this.state.towardsStaff})} />
      </View>
    )
  }

  _renderForm(){
    return (
      <View style={mainStyles.mt20}>
        <TextInput
          style={mainStyles.textInputForm}
          placeholder="What happened?"
          onChangeText={(text) => this.setState({happened: text})}
          value={this.state.happened}
          underlineColorAndroid='transparent'/>
        <View style={[styles.inputTime, mainStyles.mt10]}>
          <Text>Incident lasted</Text>
          <TextInput
            style={styles.textInputTime}
            onChangeText={(text) => this.setState({lastIncident: text})}
            value={this.state.lastIncident}
            underlineColorAndroid='transparent'/>
        </View>
        <Text style={mainStyles.mt10}>Is SU being aggressive?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({beginAggressive: false})}
            style={this.state.beginAggressive === false ? mainStyles.buttonActive : mainStyles.button}
          >
            <Text>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({beginAggressive: true})}
            style={this.state.beginAggressive === true ? mainStyles.buttonActive : mainStyles.button}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
        </View>
        {this._renderTowards()}
        <Text style={mainStyles.mt10}>Who have been called?</Text>
        {this._renderCalled()}
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="What did SU say?"
          onChangeText={(text) => this.setState({suSay: text})}
          value={this.state.suSay}
          underlineColorAndroid='transparent'/>
        <TextInput
          style={[mainStyles.textInputForm, mainStyles.mt10]}
          placeholder="How incident resolved?"
          onChangeText={(text) => this.setState({resolved: text})}
          value={this.state.resolved}
          underlineColorAndroid='transparent'/>
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt10]}>
          <Text>Incident</Text>
          <Picker 
            styleText={this.state.reportToEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="reported to"
            data={Data.optionChoices}
            onPress={(val) => this.setState({reportTo: val, reportToEmpty: false})}/>
        </View>
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
          <TitleForm menuID={0} style={mainStyles.mt10}/>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

export default Accidents
