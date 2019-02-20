import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native';
import Text from "../../Components/CustomText"
import styles from '../Styles/Health'
import TextInput from '../../Components/CustomTextInput'
import { emptyString } from '../../Common/Strings';
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
    data.heightbmi = this.state.heightBMI ? this.state.heightBMI : emptyString
    data.weightbmi = this.state.weightBMI ? this.state.weightBMI : emptyString
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
        ? (
          this.state.inputHeightInActive ?
            <TouchableOpacity style={[styles.topLine, styles.flexRowFullWidth]} onPress={() => { this.setState({ inputHeightInActive: false }) }}>
              <Text style={[styles.notesThoughtText, { flex: 1 }]}> Height</Text>
              <Text>{this.state.heightBMI}</Text>
              <Text>cm</Text>

            </TouchableOpacity>
            :
            <View style={[styles.topLineTextInput, styles.flexRowFullWidth]}>
              <Text style={[styles.notesThoughtText]}> Height</Text>
              <TextInput
                style={{ marginHorizontal: 5, flex: 1 }}
                keyboardType="numeric"
                placeholder="Type height"
                onChangeText={(text) => this.setState({ heightBMI: text })}
                onSubmitEditing={() => { this.setState({ inputHeightInActive: true }) }}
                onEndEditing={() => { this.setState({ inputHeightInActive: true }) }}
              ></TextInput>
              <Text>cm</Text>

            </View>
        )
        :
        <TouchableOpacity style={styles.topLine} onPress={() => this.setState({ showHeightBMI: true,inputHeightInActive: false  })}>
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
        (
          this.state.inputWeightInActive ?
            <TouchableOpacity style={[styles.topLine, styles.flexRowFullWidth]} onPress={() => { this.setState({ inputWeightInActive: false }) }}>
              <Text style={[styles.notesThoughtText, { flex: 1 }]}> Weight</Text>
              <Text>{this.state.weightBMI}</Text>
              <Text>kg</Text>

            </TouchableOpacity>
            :
            <View style={[styles.topLineTextInput, styles.flexRowFullWidth]}>
              <Text style={[styles.notesThoughtText]}> Weight</Text>
              <TextInput
                style={{ marginHorizontal: 5, flex: 1 }}
                keyboardType="numeric"
                placeholder="Type weight"
                onChangeText={(text) => this.setState({ weightBMI: text })}
                onSubmitEditing={() => { this.setState({ inputWeightInActive: true }) }}
                onEndEditing={() => { this.setState({ inputWeightInActive: true }) }}
              ></TextInput>
              <Text>kg</Text>

            </View>
        )
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
        this.state.showWeightBMI && this.state.showHeightBMI && this.state.heightBMI != emptyString && this.state.weightBMI != emptyString &&

        <View style={[styles.flexRowFullWidth, styles.topLine]}>
          <Text style={[styles.notesThoughtText, { flex: 1 }]}> BMI result</Text>

          {this._renderBMI()}

        </View>

      }

    </View>)
  }
}

export default BMI
