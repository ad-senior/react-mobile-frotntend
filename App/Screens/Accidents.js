import React, { Component } from 'react'
// import { Modal, View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Modal, View, ScrollView, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import Text from '../Components/CustomText'
import TextInput from '../Components/CustomTextInput'
import { Data } from '../Config';
import { connect } from 'react-redux'
import { EventDispatcher } from '../Actions';
import Navbar from '../Components/Navbar';
import TitleForm from '../Components/TitleForm';
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
      isValid: true,
      happenedEmpty: false,
      reportToEmpty: false,
      lastIncidentEmpty: false,
      beginAggressiveEmpty: false,
      suSayEmpty: false,
      resolvedEmpty: false,
      happened: '',
      suSay: '',
      resolved: '',
      lastIncident: '00:00'
    }
  }

  _showAlert(){
    Alert.alert(
      'Please complete the required information',
      '',
      [{text: 'Close', onPress: () => this.setState({isValid: true})}]
    )
  }

  _validation(){

    let isValid = this.state.isValid;
    let happenedEmpty = this.state.happenedEmpty;
    let lastIncidentEmpty = this.state.lastIncidentEmpty;
    let beginAggressiveEmpty = this.state.beginAggressiveEmpty;
    let suSayEmpty = this.state.suSayEmpty;
    let resolvedEmpty = this.state.resolvedEmpty;

    if(this.state.happened === ''){
      isValid=false;
      happenedEmpty=true;
    }
    if(this.state.lastIncident === '' || this.state.lastIncident === '00:00'){
      isValid=false;
      lastIncidentEmpty=true;
    }
    if(this.state.beginAggressive === undefined){
      isValid=false;
      beginAggressiveEmpty=true;
    }
    if(this.state.suSay === ''){
      isValid=false;
      suSayEmpty=true;
    }
    if(this.state.resolved === ''){
      isValid=false;
      resolvedEmpty=true;
    }

    this.setState({
      isValid: isValid,
      happenedEmpty: happenedEmpty,
      lastIncidentEmpty: lastIncidentEmpty,
      beginAggressiveEmpty: beginAggressiveEmpty,
      suSayEmpty: suSayEmpty,
      resolvedEmpty: resolvedEmpty
    })

    return isValid;
  }

  _submitForm(){  

    if(this._validation()){
      const data = {
        'incident_description' : this.state.happened,
        'incident_time': this.state.lastIncident,
        'aggressive': this.state.beginAggressive,
        'toward_su': this.state.towardsSU,
        'toward_staff': this.state.towardsStaff,
        'call_police': this.state.callPolice,
        'call_paramedics': this.state.callParamedics,
        'call_family': this.state.callFamily,
        //'reported_to': this.state.reportTo,
        'su_comments': this.state.suSay,
        'resolved': this.state.resolved,
        'service_user': 11,
        'created_by': 328
      }

      this.props.submitAccident(data)
              .then((response) => {
                let data = response.postSuccess;
                if (data.error){
                  Alert.alert(
                    data.message,
                    null,
                    [{text: 'Close'}]
                  )
                }else{
                  const { navigate } = this.props.navigation;
                  navigate('HomeScreen');
                }
      })

      // Alert.alert(
      //   'Submit form',
      //   `What happened? `+this.state.happened+`\n`+
      //   `Incident lasted `+this.state.lastIncident+`\n`+
      //   `What did SU say? `+this.state.suSay+`\n`+
      //   `How was incident resolved? `+this.state.resolved+`\n`,
      //   [
      //     {
      //       text: 'Submit', onPress: () => 
      //         this.props.submitAccident(data)
      //         .then((response) => {
      //           let data = response.postSuccess;
      //           if (data.error){
      //             Alert.alert(
      //               data.message,
      //               null,
      //               [{text: 'Close'}]
      //             )
      //           }else{
      //             const { navigate } = this.props.navigation;
      //             navigate('HomeScreen');
      //           }
      //         })
      //     },
      //     {
      //       text: 'Cancel', onPress: () => this.setState({isValid: true})
      //     }
      //   ]
      // )

      
    }

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
      <View style={[mainStyles.mt20,mainStyles.prl20,mainStyles.centerVertical]}>
        <TextInput
          style={this.state.happenedEmpty ? [mainStyles.textInputForm, mainStyles.inputRequired] : mainStyles.textInputForm}
          placeholder="What happened?"
          onChangeText={(text) => this.setState({happened: text, happenedEmpty: false})}
          value={this.state.happened}
          underlineColorAndroid='transparent'/>
        <View style={[styles.inputTime, mainStyles.mt10]}>
          <Text>Incident lasted</Text>
          <TextInput
            style={this.state.lastIncidentEmpty ? [styles.textInputTime, mainStyles.itemRequired] : styles.textInputTime}
            onChangeText={(text) => this.setState({lastIncident: text, lastIncidentEmpty: false})}
            value={this.state.lastIncident}
            underlineColorAndroid='transparent'/>
        </View>
        <Text style={this.state.beginAggressiveEmpty ? [mainStyles.itemRequired, mainStyles.mt10] : mainStyles.mt10}>Is SU being aggressive?</Text>
        <View style={[styles.flexRow, styles.spaceAround, mainStyles.mt10]}>
          <TouchableOpacity
            onPress={() => this.setState({beginAggressive: false, beginAggressiveEmpty: false})}
            style={this.state.beginAggressive === false ? mainStyles.buttonActive : mainStyles.button}>
            <View style={styles.textContainer}>
              <Text style={this.state.beginAggressive === false ? styles.textActive : styles.textInActive}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({beginAggressive: true, beginAggressiveEmpty: false})}
            style={this.state.beginAggressive === true ? mainStyles.buttonActive : mainStyles.button}>
            <View style={styles.textContainer} >
              <Text style={this.state.beginAggressive === true ? styles.textActive : styles.textInActive}>Yes</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this._renderTowards()}
        <Text style={mainStyles.mt10}>Who have been called?</Text>
        {this._renderCalled()}
        <TextInput
          style={this.state.suSayEmpty ? [mainStyles.textInputForm, mainStyles.mt20, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt20]}
          placeholder="What did SU say?"
          onChangeText={(text) => this.setState({suSay: text, suSayEmpty: false})}
          value={this.state.suSay}
          underlineColorAndroid='transparent'/>
        <TextInput
          style={this.state.resolvedEmpty ? [mainStyles.textInputForm, mainStyles.mt20, mainStyles.inputRequired] : [mainStyles.textInputForm, mainStyles.mt20]}
          placeholder="How was incident resolved?"
          onChangeText={(text) => this.setState({resolved: text, resolvedEmpty: false})}
          value={this.state.resolved}
          underlineColorAndroid='transparent'/>
        <View style={[styles.flexRow, styles.flexWrap, mainStyles.mt20]}>
          <Text>Incident</Text>
          <Picker 
            styleText={this.state.reportToEmpty ? mainStyles.pickerBodyRequired : mainStyles.pickerBody }
            placeholder="reported to"
            data={Data.optionChoices}
            onPress={(val) => this.setState({reportTo: val, reportToEmpty: false})}/>
        </View>
        <TouchableOpacity
          style={[mainStyles.buttonSubmit,mainStyles.mb20,mainStyles.mt20]}
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
          {!this.state.isValid && this._showAlert()}
          <View style={mainStyles.card} >
            <Navbar appName="DAILY NOTES" backMenu="CategoryScreen" navigation={this.props.navigation} />
            <TitleForm menuID={0} style={mainStyles.mt10}/>
          </View>
          {this._renderForm()}
        </ScrollView>
      </View>
    )
  }
}

const dispatchToProps = (dispatch) => ({
  submitAccident: (dataObj) => EventDispatcher.PostAccident(dataObj, dispatch),
});

export default connect(null, dispatchToProps)(Accidents)
