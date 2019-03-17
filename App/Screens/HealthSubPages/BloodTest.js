import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from "../../Components/CustomText";
import styles from '../Styles/Health';
import Ionicon from 'react-native-vector-icons/Ionicons';
import TextInput from '../../Components/CustomTextInput';
import {emptyString} from '../../Common/Strings';
class BloodTest extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {
        this.props.onRef(this);
    }
    componentWillUnmount () {
        this.props.onRef(undefined);
    }

  _validate = () => {
      let bloodTestReasonEmpty = this.state.bloodTestReasonEmpty;
      isValid = true;
      if (!this.state.bloodTestReason) {
          isValid = false;
          bloodTestReasonEmpty = true;
      }
      this.setState({
          bloodTestReasonEmpty: bloodTestReasonEmpty
      });
      return isValid;
  }

  _submit = (data) => {
      data.blood_test_result = this.state.bloodTestResult ? this.state.bloodTestResult : emptyString;
      data.blood_test_reason = this.state.bloodTestReason;
      return data;
  }


  render () {
      return (<View>
          <TouchableOpacity style={styles.topLine} onPress={() => this.setState({showBloodTestResult: true})}>
              <View style={styles.flexRowFullWidth}>
                  <View style={styles.notesThoughtsView} >
                      <Text style={{color: '#394BF8'}}>+</Text>
                  </View>
                  <Text style={[styles.notesThoughtText, {color: '#0019FF'}]}> ADD TEST RESULT</Text>

              </View>
          </TouchableOpacity>
          {this.state.showBloodTestResult &&
        (<TextInput
            placeholder="Test result"
            onChangeText={(text) => this.setState({bloodTestResult: text})}
        />)}
          <View style={[styles.flexRowFullWidth, styles.topLineTextInput]}>
              <Ionicon style={{paddingRight: 10}} name="ios-document" color="#A7A7A7" size={20} />

              <TextInput
                  style={[{width: "100%"}]}
                  placeholderTextColor={this.state.bloodTestReasonEmpty ? "red" : "grey"}
                  placeholder="What is the reason for test?"
                  onChangeText={(text) => this.setState({bloodTestReason: text, bloodTestReasonEmpty: false})}
                  value={this.state.bloodTestReason}

                  underlineColorAndroid='transparent' />
          </View>

      </View>);
  }
}

export default BloodTest;
