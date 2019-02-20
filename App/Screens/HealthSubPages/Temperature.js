import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import Text from "../../Components/CustomText"
import styles from '../Styles/Health'
import TextInput from '../../Components/CustomTextInput'
import { emptyString } from '../../Common/Strings';
class Temperature extends Component {
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
    return true;
  }

  _submit = (data) => {
    data.temperature = this.state.temperature ? this.state.temperature : emptyString
    return data
  }


  render() {
    return (<View>
      <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showTemperature: true })}>
        <View style={styles.flexRowFullWidth}>
          <View style={styles.notesThoughtsView} >
            <Text style={{ color: '#394BF8' }}>+</Text>
          </View>
          <Text style={[styles.notesThoughtText]}> Temperature</Text>

        </View>
      </TouchableOpacity>
      {this.state.showTemperature &&
        (<TextInput
          placeholder="Temperature"
          onChangeText={(text) => this.setState({ temperature: text })}
        />)}
    </View>)
  }
}

export default Temperature
