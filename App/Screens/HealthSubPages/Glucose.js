import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from "../../Components/CustomText";
import styles from '../Styles/Health';
import TextInput from '../../Components/CustomTextInput';
import {emptyString} from '../../Common/Strings';
class Glucose extends Component {
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
      return true;
  }

  _submit = (data) => {
      data.glucose_level = this.state.glucoseLevel ? this.state.glucoseLevel : emptyString;
      return data;
  }


  render () {
      return (<View>
          {this.state.showGlucoseLevel
              ?
              (
                  this.state.inputGlucoseInActive ?
                      <TouchableOpacity style={[styles.topLine, styles.flexRowFullWidth]} onPress={() => { this.setState({inputGlucoseInActive: false}); }}>
                          <Text style={[styles.notesThoughtText, {flex: 1}]}> Glucose</Text>
                          <Text>{this.state.glucoseLevel}</Text>
                          <Text>mmol</Text>

                      </TouchableOpacity>
                      :
                      <View style={[styles.topLineTextInput, styles.flexRowFullWidth]}>
                          <Text style={[styles.notesThoughtText]}> Glucose</Text>
                          <TextInput
                              style={{marginHorizontal: 5, flex: 1}}
                              keyboardType="numeric"
                              placeholder="Type Glucose"
                              onChangeText={(text) => this.setState({glucoseLevel: text})}
                              onSubmitEditing={() => { this.setState({inputGlucoseInActive: true}); }}
                              onEndEditing={() => { this.setState({inputGlucoseInActive: true}); }}
                          ></TextInput>
                          <Text>mmol</Text>

                      </View>
              )

              :
              <TouchableOpacity style={styles.topLine} onPress={() => this.setState({showGlucoseLevel: true})}>
                  <View style={styles.flexRowFullWidth}>
                      <View style={styles.notesThoughtsView} >
                          <Text style={{color: '#394BF8'}}>+</Text>
                      </View>
                      <Text style={[styles.notesThoughtText]}> Glucose level</Text>

                  </View>
              </TouchableOpacity>

          }

      </View>);
  }
}

export default Glucose;
