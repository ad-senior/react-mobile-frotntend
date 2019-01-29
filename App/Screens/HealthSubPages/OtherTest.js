import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import Text from "../../Components/CustomText"
import styles from '../Styles/Health'

import mainStyles from '../../Themes/Styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import TextInput from '../../Components/CustomTextInput'
class OtherTest extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  _validate = () => {
    let otherTestReasonEmpty = this.state.otherTestReasonEmpty;
    isValid = true;
    if (!this.state.otherTestReason) {
      isValid = false;
      otherTestReasonEmpty = true;
    }
    this.setState({
      otherTestReasonEmpty: otherTestReasonEmpty
    })
    return isValid;
  }

  _submit = (data) => {
    data.other_test_taken = this.state.otherTestTaken ? this.state.otherTestTaken : ''
    data.other_test_result = this.state.otherTestResult ? this.state.otherTestResult : ''
    data.other_test_reason = this.state.otherTestReason

    return data
  }


  render() {
    return (<View>
      <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showOtherTestTaken: true })}>
        <View style={styles.flexRowFullWidth}>
          <View style={styles.notesThoughtsView} >
            <Text style={{ color: '#394BF8' }}>+</Text>
          </View>
          <Text style={[styles.notesThoughtText]}> Test undertaken</Text>

        </View>
      </TouchableOpacity>
      {this.state.showOtherTestTaken &&
        (<TextInput
          placeholder="Test undertaken"
          onChangeText={(text) => this.setState({ otherTestTaken: text })}
        />)}
      <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showOtherTestResult: true })}>
        <View style={styles.flexRowFullWidth}>
          <View style={styles.notesThoughtsView} >
            <Text style={{ color: '#394BF8' }}>+</Text>
          </View>
          <Text style={[styles.notesThoughtText]}> Add test result</Text>

        </View>
      </TouchableOpacity>
      {this.state.showOtherTestResult &&
        (<TextInput
          placeholder="Test result"
          onChangeText={(text) => this.setState({ otherTestResult: text })}
        />)}
      <View style={[styles.flexRowFullWidth, styles.topLineTextInput]}>
        <Ionicon style={{ paddingRight: 10 }} name="ios-document" color="#A7A7A7" size={20} />

        <TextInput
          style={[{ width: "100%" }]}
          placeholder="Reason for test"
          placeholderTextColor={this.state.otherTestReasonEmpty ? "red" : "grey"}
          onChangeText={(text) => this.setState({ otherTestReason: text, otherTestReasonEmpty: false })}
          value={this.state.otherTestReason}

          underlineColorAndroid='transparent' />
      </View>
    </View>)
  }
}

export default OtherTest
