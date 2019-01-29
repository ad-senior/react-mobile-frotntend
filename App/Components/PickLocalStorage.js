import React, { Component } from 'react'
// import { View, Text, TextInput, Image, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { View, Image, TouchableOpacity, Modal, ScrollView, FlatList, AsyncStorage } from 'react-native';
import Text from './CustomText'
import TextInput from './CustomTextInput'

import PropTypes from 'prop-types';
import images from '../Themes/Images';
import styles from './Styles/PickerUser';
import Checkbox from './Checkbox';



class Picker extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    storagekey:PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.AsyncStorageKey = this.props.storagekey
    this.state = {
      filter: true,
      value: this.props.placeholder,
      modalVisible: false,
      text: '',
      datas: [],
      hideIcon:this.props.hideIcon
    }
    this.arrayholder = [];
    this.temp_array = [];
    this._retrieveData()
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(this.AsyncStorageKey);
      if (value !== null) {
        this.setState({ datas: JSON.parse(value).reverse().slice(0, 5) });
        this.arrayholder = JSON.parse(value);
        this.temp_array = JSON.parse(value);
      } else {
        this.setState({ datas: [] })
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  _onChangeText(item) {
    const { onPress } = this.props;
    this.setState({
      modalVisible: !this.state.modalVisible,
      value: `${item}`,
    });
    onPress(item);
  }

  _searchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const medicationName = item.toUpperCase()
      const textData = text.toUpperCase()
      if (medicationName.indexOf(textData) > -1) {
        return item
      }
    })
    this.setState({
      datas: newData.reverse().slice(0, 5),
      text: text
    })
  }

  _addNewItem(text) {
    const newData = this.arrayholder.filter(function (item) {
      const medicationName = item.toUpperCase()
      const textData = text.toUpperCase()
      if (medicationName.indexOf(textData) > -1) {
        return item
      }
    })
    if (newData.length == 0) {
      this.arrayholder.push(text)

      this.setState({
        datas: this.arrayholder.reverse().slice(0, 5),
        text: text
      })

      AsyncStorage.setItem(this.AsyncStorageKey, JSON.stringify(this.arrayholder.reverse()))

    } else {

      this.setState({
        datas: newData.reverse().slice(0, 5),
        text: text
      })
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}
        onPress={() => { this.setState({ modalVisible: !this.state.modalVisible }) }}>
        <Text style={this.props.styleText} >{this.state.value}</Text>
        {!this.state.hideIcon && <Image style={styles.image} source={images.searchIcon} />}
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
                    onSubmitEditing={(event) => this._addNewItem(event.nativeEvent.text)}
                    value={this.state.text}
                    underlineColorAndroid='transparent'
                    placeholder="SEARCH" />
                  <Image style={styles.searchIcon} source={images.searchIcon} />
                </View>
              }
              <FlatList
                data={this.state.datas}
                keyExtractor={(item, index) => `picker-${index}`}
                renderItem={({ item, index }) =>
                  <TouchableOpacity
                    style={[styles.items]}
                    onChangeText={() => this._onChangeText(item)}
                    value={this.props.value ? this.props.value : this.state.value}>
                    <Checkbox checked={false} title={`${item}`} onPress={() => this._onChangeText(item)} />
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    )
  }
}

export default Picker
