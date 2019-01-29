import React, { Component } from 'react'
import { View, TouchableOpacity, Image } from 'react-native';
import Text from "../../Components/CustomText"
import styles from '../Styles/Health'

import mainStyles from '../../Themes/Styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import TextInput from '../../Components/CustomTextInput'

const HealthBodyWound1 = require('../../Images/HealthBodyWound1.png')
const HealthBodyWound2 = require('../../Images/HealthBodyWound2.png')
class WoundCare extends Component {
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
    let woundCareFurtherActionsEmpty = this.state.woundCareFurtherActionsEmpty;
    let woundLocationImageEmpty = this.state.woundLocationImageEmpty;
    isValid = true;
    if (!this.state.woundCareFurtherActions) {
      isValid = false;
      woundCareFurtherActionsEmpty = true;
    }
    if (!this.state.woundLocationImage) {
      isValid = false;
      woundLocationImageEmpty = true;
    }

    this.setState({
      woundCareFurtherActionsEmpty: woundCareFurtherActionsEmpty,
      woundLocationImageEmpty: woundLocationImageEmpty
    })
    return isValid;
  }

  _submit = (data) => {
    data.wound_location_image = this.state.woundLocationImage == 1 ? "front" : "back"
    data.wound_care_location = this.state.woundCareLocation ? this.state.woundCareLocation : ''
    data.wound_care_size = this.state.woundCareSize ? this.state.woundCareSize : ''
    data.wound_care_provided = this.state.woundCareProvided ? this.state.woundCareProvided : ''
    data.wound_care_further_actions = this.state.woundCareFurtherActions

    return data
  }


  render() {
    return (<View>
      <View style={styles.topLine}>
        <Text style={this.state.woundLocationImageEmpty && { color: "red" }}>Select location of wound</Text>
        {!this.state.woundLocationImage
          ?
          <View style={[styles.flexRowFullWidth]}>
            <TouchableOpacity style={[styles.flexRowFullWidth, { padding: 5 }, this.state.woundLocationImagePrevious == 1 && { borderColor: "blue", borderWidth: 2, borderRadius: 20 }]} onPress={() => {
              this.setState({ woundLocationImagePrevious: 1, woundLocationImageEmpty: false })
              setTimeout(() => {
                this.setState({ woundLocationImage: 1 })
              }, 1000);
            }}>
              <Image style={{ width: "100%", aspectRatio: 0.5 }} source={HealthBodyWound1}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flexRowFullWidth, { padding: 5 }, this.state.woundLocationImagePrevious == 2 && { borderColor: "blue", borderWidth: 2, borderRadius: 20 }]} onPress={() => {
              this.setState({ woundLocationImagePrevious: 2, woundLocationImageEmpty: false })
              setTimeout(() => {
                this.setState({ woundLocationImage: 2 })
              }, 1000);
            }}>
              <Image style={{ width: "100%", aspectRatio: 0.5 }} source={HealthBodyWound2}></Image>
            </TouchableOpacity>

          </View>
          :
          <View style={[styles.flexRowFullWidth, { justifyContent: "center" }]}>
            <Image style={{ width: "80%", aspectRatio: 0.5 }} source={this.state.woundLocationImage == 1 ? HealthBodyWound1 : HealthBodyWound2}></Image>
          </View>
        }
      </View>
      <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showWoundCareLocation: true })}>
        <View style={styles.flexRowFullWidth}>
          <View style={styles.notesThoughtsView} >
            <Text style={{ color: '#394BF8' }}>+</Text>
          </View>
          <Text style={[styles.notesThoughtText]}> Type location of wound</Text>

        </View>
      </TouchableOpacity>
      {
        this.state.showWoundCareLocation &&
        (<TextInput
          placeholder="Type location of wound"
          onChangeText={(text) => this.setState({ woundCareLocation: text })}
        />)
      }
      <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showWoundCareSize: true })}>
        <View style={styles.flexRowFullWidth}>
          <View style={styles.notesThoughtsView} >
            <Text style={{ color: '#394BF8' }}>+</Text>
          </View>
          <Text style={[styles.notesThoughtText]}> Size of wound</Text>

        </View>
      </TouchableOpacity>
      {
        this.state.showWoundCareSize &&
        (<TextInput
          placeholder="Size of wound"
          onChangeText={(text) => this.setState({ woundCareSize: text })}
        />)
      }
      <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showWoundCareProvided: true })}>
        <View style={styles.flexRowFullWidth}>
          <View style={styles.notesThoughtsView} >
            <Text style={{ color: '#394BF8' }}>+</Text>
          </View>
          <Text style={[styles.notesThoughtText]}> What care has been provided?</Text>

        </View>
      </TouchableOpacity>
      {
        this.state.showWoundCareProvided &&
        (<TextInput
          placeholder="What care has been provided?"
          onChangeText={(text) => this.setState({ woundCareProvided: text })}
        />)
      }
      <View style={[styles.flexRowFullWidth, styles.topLineTextInput]}>
        <Ionicon style={{ paddingRight: 10 }} name="ios-document" color="#A7A7A7" size={20} />

        <TextInput
          style={[{ width: "100%" }]}
          placeholder="Further actions required..."
          placeholderTextColor={this.state.woundCareFurtherActionsEmpty ? "red" : "grey"}
          onChangeText={(text) => this.setState({ woundCareFurtherActions: text, woundCareFurtherActionsEmpty: false })}
          value={this.state.woundCareFurtherActions}

          underlineColorAndroid='transparent' />
      </View>
    </View >)

  }
}

export default WoundCare
