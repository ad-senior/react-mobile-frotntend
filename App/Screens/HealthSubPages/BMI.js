import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import Text from "../../Components/CustomText"
import styles from '../Styles/Health'
import TextInput from '../../Components/CustomTextInput'
class BMI extends Component {
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
    data.heightbmi = this.state.heightBMI ? this.state.heightBMI : ''
    data.weightbmi = this.state.weightBMI ? this.state.weightBMI : ''
    return data
  }

  _renderBMI = () => {
    if (this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100) < 19)
      return (<View style={[styles.flexRow, { alignItems: "center" }]}>
        <Text style={{ color: "#FF5700" }}>{Math.trunc(this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100))}</Text>
        <View style={{ backgroundColor: "#FF5700", borderRadius: 12, padding: 5, marginHorizontal: 10 }}>
          <Text style={{ color: "white" }}>Underweight</Text>
        </View>
      </View>)
    else if (this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100) >= 19 && this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100) < 25)
      return (<View style={[styles.flexRow, { alignItems: "center" }]}>
        <Text style={{ color: "#0019FF" }}>{Math.trunc(this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100))}</Text>
        <View style={{ backgroundColor: "#0019FF", borderRadius: 12, padding: 5, marginHorizontal: 10 }}>
          <Text style={{ color: "white" }}>Healthy</Text>
        </View>
      </View>)
    else if (this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100) >= 25 && this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100) < 30)
      return (<View style={[styles.flexRow, { alignItems: "center" }]}>
        <Text style={{ color: "##0019FF" }}>{Math.trunc(this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100))}</Text>
        <View style={{ backgroundColor: "#0019FF", borderRadius: 12, padding: 5, marginHorizontal: 10 }}>
          <Text style={{ color: "white" }}>Overwheight</Text>
        </View>
      </View>)
    else if (this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100) >= 30 && this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100) < 40)
      return (<View style={[styles.flexRow, { alignItems: "center" }]}>
        <Text style={{ color: "#FF5700" }}>{Math.trunc(this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100))}</Text>
        <View style={{ backgroundColor: "#FF5700", borderRadius: 12, padding: 5, marginHorizontal: 10 }}>
          <Text style={{ color: "white" }}>Obese</Text>
        </View>
      </View>)
    else if (this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100) >= 40)
      return (<View style={[styles.flexRow, { alignItems: "center" }]}>
        <Text style={{ color: "#FF5700" }}>{Math.trunc(this.state.weightBMI / (this.state.heightBMI / 100 * this.state.heightBMI / 100))}</Text>
        <View style={{ backgroundColor: "#FF5700", borderRadius: 12, padding: 5, marginHorizontal: 10 }}>
          <Text style={{ color: "white" }}>Extremely obese</Text>
        </View>
      </View>)

  }

  render() {
    return (<View>
      {this.state.showHeightBMI
        ?
        <View style={[styles.topLineTextInput, styles.flexRowFullWidth]}>
          <Text style={[styles.notesThoughtText, { flex: 1 }]}> Height</Text>
          <TextInput
            style={{ marginHorizontal: 5 }}
            keyboardType="numeric"
            placeholder="---"
            onChangeText={(text) => this.setState({ heightBMI: text })}
          ></TextInput>
          <Text>cm</Text>

        </View>
        :
        <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showHeightBMI: true })}>
          <View style={styles.flexRowFullWidth}>
            <View style={styles.notesThoughtsView} >
              <Text style={{ color: '#394BF8' }}>+</Text>
            </View>
            <Text style={[styles.notesThoughtText]}> Height</Text>

          </View>
        </TouchableOpacity>

      }
      {this.state.showWeightBMI
        ?
        <View style={[styles.topLineTextInput, styles.flexRowFullWidth]}>
          <Text style={[styles.notesThoughtText, { flex: 1 }]}> Weight</Text>
          <TextInput
            style={{ marginHorizontal: 5 }}
            keyboardType="numeric"
            placeholder="---"
            onChangeText={(text) => this.setState({ weightBMI: text })}
          ></TextInput>
          <Text>Kg</Text>

        </View>
        :
        <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showWeightBMI: true })}>
          <View style={styles.flexRowFullWidth}>
            <View style={styles.notesThoughtsView} >
              <Text style={{ color: '#394BF8' }}>+</Text>
            </View>
            <Text style={[styles.notesThoughtText]}> Weight</Text>

          </View>
        </TouchableOpacity>

      }
      {
        this.state.showWeightBMI && this.state.showHeightBMI && this.state.heightBMI != '' && this.state.weightBMI != '' &&

        <View style={[styles.flexRowFullWidth, styles.topLine]}>
          <Text style={[styles.notesThoughtText, { flex: 1 }]}> BMI result</Text>

          {this._renderBMI()}

        </View>

      }

    </View>)
  }
}

export default BMI
