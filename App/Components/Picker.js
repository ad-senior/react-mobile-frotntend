import React, { Component } from 'react'
// import { View, Text, TextInput, Image, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { View, Image, TouchableOpacity, Modal, ScrollView, FlatList,Dimensions } from 'react-native';
import Text from './CustomText'
import TextInput from './CustomTextInput'

import PropTypes from 'prop-types';
import images from '../Themes/Images';
import styles from './Styles/Picker';
import Checkbox from './Checkbox';
import {BoxShadow} from 'react-native-shadow'
class Picker extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      filter: this.props.filter ? this.props.filter : false,
      hasShadow: this.props.hasShadow,
      shadowColor: this.props.shadowColor,
      value: this.props.placeholder,
      modalVisible: false,
      text: '',
      datas: this.props.data,
      hideIcon:this.props.hideIcon
    }
    this.arrayholder = this.props.data;
    this.icon = require('../Images/Icons/icon-arrow-dropdown.png');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return (nextProps.data != prevState.datas ? { datas: nextProps.data, value: nextProps.placeholder } : null)
  }

  _onChangeText(item) {
    const { onPress } = this.props;
    this.setState({
      modalVisible: !this.state.modalVisible,
      value: item.label,
    });
    if (this.props.pickerBinder) this.props.onSelectLabel(item.label);
    onPress(item.value);
  }

  _searchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.label.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      datas: newData,
      text: text
    })
  }


  _renderPicker = () => {
    return (
      <TouchableOpacity style={[styles.container, this.state.hasShadow ? styles.sizeShadow : {marginLeft: 5,
        borderBottomColor:"#0066FF",
        borderBottomWidth: 1}, this.props.style]}
        onPress={() => { this.setState({ modalVisible: !this.state.modalVisible }) }}>
        <Text style={[this.props.styleText, this.state.hasShadow && {marginLeft:20}]} numberOfLines={1}>{this.state.value}</Text>
        {!this.state.hideIcon && <Image style={styles.image} source={this.icon} />}
        <Modal
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              {this.state.filter &&
                <View style={styles.searchSection}>
                  <TextInput
                    style={styles.TextInputStyleClass}
                    onChangeText={(text) => this._searchFilterFunction(text)}
                    value={this.state.text}
                    underlineColorAndroid='transparent'
                    placeholder="SEARCH" />
                  <Image style={styles.searchIcon} source={images.searchIcon} />
                </View>
              }
              <ScrollView>
                <FlatList
                  data={this.state.datas}
                  keyExtractor={(item, index) => `picker-${index}`}
                  renderItem={({ item, index }) =>
                    <TouchableOpacity
                      style={styles.items}
                      onChangeText={() => this._onChangeText(item)}
                      value={this.props.value ? this.props.value : this.state.value}>
                      <Checkbox checked={false} title={item.label} onPress={() => this._onChangeText(item)} />
                    </TouchableOpacity>
                  }
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }

  render() {

    if (this.state.hasShadow) {

      const { width, height } = Dimensions.get('window');
      const shadowOpt = {
        width: width * .9,
        height: 50,
        color: this.state.shadowColor,
        border: 10,
        radius: 5,
        opacity: 0.1,
        x: 0,
        y: 0,
        style: { marginVertical: 15 },
      }
      return (
        <BoxShadow setting={shadowOpt}>
          <View >
            {this._renderPicker()}
            </View>
        </BoxShadow>
      )
    }
    else {
      return (<View>
        {this._renderPicker()}
      </View>
      )
    }
  }
}

export default Picker
