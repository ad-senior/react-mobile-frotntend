import React, {Component} from 'react';
import {View, TouchableOpacity, Modal, Platform, TouchableWithoutFeedback} from 'react-native';
import Text from "../../Components/CustomText";
import styles from '../Styles/Health';

import mainStyles from '../../Themes/Styles';

import {Picker as TimePicker} from 'react-native-wheel-datepicker';
import {emptyValue, platforms} from '../../Common/Strings';
class BloodPressure extends Component {
    constructor (props) {
        super(props);
        this.dataBloodPressure = [];

        for (pressure = 0; pressure < 100; pressure++)
            this.dataBloodPressure.push(pressure < 10 ? "0" + pressure.toString() : pressure.toString());

        this.state = {
            PickerVisible: false,
            DIASTOLIC: emptyValue,
            SYSTOLIC: emptyValue
        };
    }
    componentDidMount () {
        this.props.onRef(this);
    }
    componentWillUnmount () {
        this.props.onRef(undefined);
    }

  _validate = () => {
      let SYSTOLICEmpty = this.state.SYSTOLICEmpty;
      let DIASTOLICEmpty = this.state.DIASTOLICEmpty;
      isValid = true;
      if (this.state.SYSTOLIC == emptyValue) {
          isValid = false;
          SYSTOLICEmpty = true;
      }
      if (this.state.DIASTOLIC == emptyValue) {
          isValid = false;
          DIASTOLICEmpty = true;
      }
      this.setState({
          SYSTOLICEmpty: SYSTOLICEmpty,
          DIASTOLICEmpty: DIASTOLICEmpty
      });
      return isValid;
  }

  _submit = (data) => {
      data.systolic = this.state.SYSTOLIC;
      data.diastolic = this.state.DIASTOLIC;
      return data;
  }


  render () {
      return (
          <TouchableOpacity onPress={() => { this.setState({PickerVisible: true, DIASTOLICTemp: "40", SYSTOLICTemp: "70"}); }} style={[styles.flexRowFullWidth, styles.topLine, {justifyContent: "space-evenly"}]} >
              <View style={[{justifyContent: "space-evenly", alignItems: "center"}]}>
                  <Text style={[styles.textInputTime, this.state.SYSTOLICEmpty && {color: "red"}]}>{this.state.SYSTOLIC}</Text>
                  <Text style={{paddingVertical: 20}}>SYSTOLIC</Text>
              </View>

              <Text style={{fontSize: 40}}>/</Text>

              <View style={[{justifyContent: "space-evenly", alignItems: "center"}]}>
                  <Text style={[styles.textInputTime, this.state.DIASTOLICEmpty && {color: "red"}]}>{this.state.DIASTOLIC}</Text>

                  <Text style={{paddingVertical: 20}}>DIASTOLIC</Text>
              </View>
              <Modal
                  transparent={true}
                  animationType="fade"
                  visible={this.state.PickerVisible}>
                  <TouchableOpacity
                      style={styles.modalContainer}
                      activeOpacity={1}
                      onPressOut={() => { this.setState({PickerVisible: false}); }}>
                      <TouchableWithoutFeedback>
                          <View style={[styles.modal, {width: 200, maxHeight: "80%"}]}>
                              <View >
                                  <View style={[styles.flexRow, {justifyContent: "space-evenly", alignItems: "center", marginVertical: 10}]}>
                                      {
                                          Platform.OS != platforms.ios &&
                      <View style={[styles.timePickerLine, {translateX: -18}]}></View>
                                      }
                                      {
                                          Platform.OS != platforms.ios &&
                      <View style={[styles.timePickerLine, {translateX: 82}]}></View>
                                      }
                                      <TimePicker
                                          itemSpace={80}
                                          textSize={18}
                                          style={styles.timePicker}
                                          selectedValue={this.state.SYSTOLICTemp}
                                          pickerData={["70", "80", "90", "100", "110", "120", "130", "140", "150", "160", "170", "180", "190"]}
                                          onValueChange={(item) => { this.setState({SYSTOLICTemp: item}); }} />
                                      <Text style={{fontSize: 30}}>:</Text>
                                      <TimePicker
                                          itemSpace={80}
                                          textSize={18}
                                          style={styles.timePicker}
                                          selectedValue={this.state.DIASTOLICTemp}
                                          pickerData={["40", "50", "60", "70", "80", "90", "100"]}
                                          onValueChange={(item) => { this.setState({DIASTOLICTemp: item}); }} />
                                  </View>
                                  <View style={[styles.flexRow, {justifyContent: "space-around", alignItems: "center"}]}>
                                      <TouchableOpacity
                                          style={[styles.flexRow]}
                                          onPress={() => { this.setState({PickerVisible: false}); }}>
                                          <Text style={[{color: "#76C5B2", fontSize: 18, fontFamily: "WorkSans-SemiBold"}, mainStyles.prl40]}>CANCEL</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                          style={[styles.flexRow]}
                                          onPress={() => { this.setState({PickerVisible: false, SYSTOLIC: this.state.SYSTOLICTemp, DIASTOLIC: this.state.DIASTOLICTemp}); }}>
                                          <Text style={[{color: "#76C5B2", fontSize: 18, fontFamily: "WorkSans-SemiBold"}, mainStyles.prl40]}>OK</Text>
                                      </TouchableOpacity>
                                  </View>
                              </View>

                          </View>
                      </TouchableWithoutFeedback>

                  </TouchableOpacity>
              </Modal>
          </TouchableOpacity>);

  }
}

export default BloodPressure;
