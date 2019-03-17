import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Text from "../../Components/CustomText";
import styles from '../Styles/Health';
import Picker from "../../Components/Picker";
import TextInput from '../../Components/CustomTextInput';
import Data from "../../Config/MockData";
import {emptyString} from '../../Common/Strings';
class Seizure extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.icon = require('../../Images/Icons/icon-arrow-dropdown.png');
    }
    componentDidMount () {
        this.props.onRef(this);
    }
    componentWillUnmount () {
        this.props.onRef(undefined);
    }

  _validate = () => {
      let seizureAssistanceSoughtEmpty = this.state.seizureAssistanceSoughtEmpty;
      isValid = true;
      if (!this.state.seizureAssistanceSought) {
          isValid = false;
          seizureAssistanceSoughtEmpty = true;
      }
      this.setState({
          seizureAssistanceSoughtEmpty: seizureAssistanceSoughtEmpty
      });
      return isValid;
  }

  _submit = (data) => {
      data.type_seizure = this.state.typeSeizure ? this.state.typeSeizure : emptyString;
      data.duration_seizure = this.state.durationOfSeizure ? this.state.durationOfSeizure : emptyString;
      data.seizure_assistance_sought = this.state.seizureAssistanceSought;

      return data;
  }


  render () {
      return (<View>
          <View style={[styles.topLine, styles.flexRowFullWidth]}>
              {!this.state.typeSeizure && <View style={styles.notesThoughtsView} >
                  <Text style={{color: '#394BF8'}}>+</Text>
              </View>}
              <View style={{flex: 1, marginHorizontal: 5}}>
                  <Picker
                      styleText={[styles.notesThoughtText, styles.notesThoughtText]}
                      style={{borderBottomWidth: 0, flexGrow: 0}}
                      placeholder="Type of seizure"
                      data={Data.seizureTypes}
                      hideIcon={true}
                      onPress={(val) => this.setState({typeSeizure: val})} />
              </View>
              <Image style={[styles.image, {marginHorizontal: 5}]} source={this.icon} ></Image>
          </View>



          <TouchableOpacity style={styles.topLine} onPress={() => this.setState({showDurationOfSeizure: true})}>
              <View style={styles.flexRowFullWidth}>
                  <View style={styles.notesThoughtsView} >
                      <Text style={{color: '#394BF8'}}>+</Text>
                  </View>
                  <Text style={[styles.notesThoughtText]}> Duration of seizure</Text>

              </View>
          </TouchableOpacity>
          {this.state.showDurationOfSeizure &&
        (<TextInput
            placeholder="Duration of seizure"
            onChangeText={(text) => this.setState({durationOfSeizure: text})}
        />)}
          <TouchableOpacity style={styles.topLine} onPress={() => this.setState({showTypeSeizure: true})}>
              <View style={styles.flexRowFullWidth}>
                  <Text style={[styles.notesThoughtText, this.state.seizureAssistanceSoughtEmpty && {color: "red"}]}>Medical assistance sought?</Text>
                  <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                      <TouchableOpacity style={[{elevation: 1, borderRadius: 20, height: 40, width: 40, marginHorizontal: 10, justifyContent: "center", alignItems: "center"}, this.state.seizureAssistanceSought && {borderColor: "blue", borderWidth: 1}]} onPress={() => this.setState({seizureAssistanceSought: Data.seizureAssistanceSought[0].value, seizureAssistanceSoughtEmpty: false})}><Text style={this.state.seizureAssistanceSought && {color: "blue"}}>{Data.seizureAssistanceSought[0].label}</Text></TouchableOpacity>
                      <TouchableOpacity style={[{elevation: 1, borderRadius: 20, height: 40, width: 40, justifyContent: "center", alignItems: "center"}, !this.state.seizureAssistanceSought && this.state.seizureAssistanceSought != undefined && {borderColor: "blue", borderWidth: 1}]} onPress={() => this.setState({seizureAssistanceSought: Data.seizureAssistanceSought[1].value, seizureAssistanceSoughtEmpty: false})}><Text style={!this.state.seizureAssistanceSought && this.state.seizureAssistanceSought != undefined && {color: "blue"}}>{Data.seizureAssistanceSought[1].label}</Text></TouchableOpacity>
                  </View>
              </View>
          </TouchableOpacity>

      </View>);
  }
}

export default Seizure;
