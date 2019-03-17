import React, {Component} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import Text from "../../Components/CustomText";
import styles from '../Styles/Health';
import TextInput from '../../Components/CustomTextInput';
import {emptyString} from '../../Common/Strings';
import SliderOptions from '../../Components/SliderOptions';
import Data from '../../Config/MockData';
class BMI extends Component {
    constructor (props) {
        super(props);
        this.state = {
            measurement: Data.healthBMIChoices[0].value
        };
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
      data.heightbmi = this.state.heightBMI ? this.state.heightBMI : emptyString;
      data.weightbmi = this.state.weightBMI ? this.state.weightBMI : emptyString;
      data.measurement_system = this.state.measurement;
      return data;
  }

  _renderBMI = () => {

      const BMI = this.state.measurement === Data.healthBMIChoices[0].value ? (this.state.weight * 705 / (this.state.height * this.state.height)) : (this.state.weight / (this.state.height / 100 * this.state.height / 100));

      if ( BMI < 19)
          return (<View style={[styles.flexRow, {alignItems: "center"}]}>
              <Text style={{color: "#FF5700"}}>{Math.trunc(BMI)}</Text>
              <View style={{backgroundColor: "#FF5700", borderRadius: 12, padding: 5, marginHorizontal: 10}}>
                  <Text style={{color: "white"}}>Underweight</Text>
              </View>
          </View>);
      else if (BMI >= 19 && BMI < 25)
          return (<View style={[styles.flexRow, {alignItems: "center"}]}>
              <Text style={{color: "#0019FF"}}>{Math.trunc(BMI)}</Text>
              <View style={{backgroundColor: "#0019FF", borderRadius: 12, padding: 5, marginHorizontal: 10}}>
                  <Text style={{color: "white"}}>Healthy</Text>
              </View>
          </View>);
      else if (BMI >= 25 && BMI < 30)
          return (<View style={[styles.flexRow, {alignItems: "center"}]}>
              <Text style={{color: "##0019FF"}}>{Math.trunc(BMI)}</Text>
              <View style={{backgroundColor: "#0019FF", borderRadius: 12, padding: 5, marginHorizontal: 10}}>
                  <Text style={{color: "white"}}>Overwheight</Text>
              </View>
          </View>);
      else if (BMI >= 30 && BMI < 40)
          return (<View style={[styles.flexRow, {alignItems: "center"}]}>
              <Text style={{color: "#FF5700"}}>{Math.trunc(BMI)}</Text>
              <View style={{backgroundColor: "#FF5700", borderRadius: 12, padding: 5, marginHorizontal: 10}}>
                  <Text style={{color: "white"}}>Obese</Text>
              </View>
          </View>);
      else if (BMI >= 40)
          return (<View style={[styles.flexRow, {alignItems: "center"}]}>
              <Text style={{color: "#FF5700"}}>{Math.trunc(BMI)}</Text>
              <View style={{backgroundColor: "#FF5700", borderRadius: 12, padding: 5, marginHorizontal: 10}}>
                  <Text style={{color: "white"}}>Extremely obese</Text>
              </View>
          </View>);

  }

  _checkHeightValidity = () => {
      regExp = /^\d+('?(\d+'')?|'')$/;
      regExp.test(this.state.heightBMI)
          ?
          this.setState({
              inputHeightInActive: true,
              height:
          parseInt(this.state.heightBMI.split("'")[0]) * 12 +
          parseInt(this.state.heightBMI.split("'")[1])
          })
          :
          Alert.alert("Please input correct measurement, e.g. 5'6'' ");

  }

  render () {
      return (<View>

          <SliderOptions
              data={Data.healthBMIChoices}
              onPress={item => this.setState({measurement:item.value, heightBMI:emptyString, height:undefined, weightBMI:emptyString, weight:undefined})}

          />
          {this.state.showHeightBMI
              ? (
                  this.state.inputHeightInActive ?
                      <TouchableOpacity style={[styles.topLine, styles.flexRowFullWidth]} onPress={() => { this.setState({inputHeightInActive: false}); }}>
                          <Text style={[styles.notesThoughtText, {flex: 1}]}> Height</Text>
                          <Text>{this.state.heightBMI}</Text>
                          <Text>{this.state.measurement === Data.healthBMIChoices[0].value ? "ft" : "cm"}</Text>

                      </TouchableOpacity>
                      :
                      <View style={[styles.topLineTextInput, styles.flexRowFullWidth]}>
                          <Text style={[styles.notesThoughtText]}> Height</Text>
                          <TextInput
                              style={{marginHorizontal: 5, flex: 1}}
                              keyboardType="numeric"
                              placeholder="Type height"
                              onChangeText={(text) => this.setState({heightBMI: text})}
                              onSubmitEditing={() => { this.state.measurement  === Data.healthBMIChoices[0].value ? this._checkHeightValidity() :  this.setState({inputHeightInActive: true, height: parseInt(this.state.heightBMI)}); }}
                              onEndEditing={() => { this.state.measurement  === Data.healthBMIChoices[0].value ? this._checkHeightValidity() :  this.setState({inputHeightInActive: true, height: parseInt(this.state.heightBMI)}); }}
                          ></TextInput>
                          <Text>{this.state.measurement === Data.healthBMIChoices[0].value ? "ft" : "cm"}</Text>

                      </View>
              )
              :
              <TouchableOpacity style={styles.topLine} onPress={() => this.setState({showHeightBMI: true, inputHeightInActive: false})}>
                  <View style={styles.flexRowFullWidth}>
                      <View style={styles.notesThoughtsView} >
                          <Text style={{color: '#394BF8'}}>+</Text>
                      </View>
                      <Text style={[styles.notesThoughtText]}> Height</Text>

                  </View>
              </TouchableOpacity>

          }
          {this.state.showWeightBMI
              ?
              (
                  this.state.inputWeightInActive ?
                      <TouchableOpacity style={[styles.topLine, styles.flexRowFullWidth]} onPress={() => { this.setState({inputWeightInActive: false}); }}>
                          <Text style={[styles.notesThoughtText, {flex: 1}]}> Weight</Text>
                          <Text>{this.state.weightBMI}</Text>
                          <Text>{this.state.measurement === Data.healthBMIChoices[0].value ? "Lb" : "Kg"}</Text>

                      </TouchableOpacity>
                      :
                      <View style={[styles.topLineTextInput, styles.flexRowFullWidth]}>
                          <Text style={[styles.notesThoughtText]}> Weight</Text>
                          <TextInput
                              style={{marginHorizontal: 5, flex: 1}}
                              keyboardType="numeric"
                              placeholder="Type weight"
                              onChangeText={(text) => this.setState({weightBMI: text})}
                              onSubmitEditing={() => { this.setState({inputWeightInActive: true, weight: parseInt(this.state.weightBMI)}); }}
                              onEndEditing={() => { this.setState({inputWeightInActive: true, weight: parseInt(this.state.weightBMI)}); }}
                          ></TextInput>
                          <Text>{this.state.measurement === Data.healthBMIChoices[0].value ? "Lb" : "Kg"}</Text>

                      </View>
              )
              :
              <TouchableOpacity style={styles.topLine} onPress={() => this.setState({showWeightBMI: true})}>
                  <View style={styles.flexRowFullWidth}>
                      <View style={styles.notesThoughtsView} >
                          <Text style={{color: '#394BF8'}}>+</Text>
                      </View>
                      <Text style={[styles.notesThoughtText]}> Weight</Text>

                  </View>
              </TouchableOpacity>

          }
          {
              this.state.showWeightBMI && this.state.showHeightBMI && this.state.height && this.state.weight &&

        <View style={[styles.flexRowFullWidth, styles.topLine]}>
            <Text style={[styles.notesThoughtText, {flex: 1}]}> BMI result</Text>

            {this._renderBMI()}

        </View>

          }

      </View>);
  }
}

export default BMI;
