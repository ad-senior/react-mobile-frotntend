import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Modal, Alert, FlatList, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import Text from './CustomText'
import TextInput from './CustomTextInput'

import PropTypes from 'prop-types';
import images from '../Themes/Images';
import styles from './Styles/PickerUser';
import Checkbox from './Checkbox';
import mainStyles from "../Themes/Styles"
import { emptyString } from '../Common/Strings';


class Picker extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    storagekey: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.AsyncStorageKey = this.props.storagekey
    this.state = {
      filter: true,
      value: this.props.placeholder,
      modalVisible: false,
      text: emptyString,
      datas: [],
      hideIcon: this.props.hideIcon
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
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => { this.setState({ modalVisible: false }) }}>
            <TouchableWithoutFeedback>


              {
                this.state.datas.length > 0
                  ? <View style={[styles.modal, { paddingLeft: 0, height: "60%" }]}>
                    {this.state.filter &&
                      <View style={{ flexDirection: "row", borderBottomColor: "#0066FF", paddingHorizontal: 10, borderBottomWidth: 1, width: "100%", alignItems: "center" }}>
                        <TextInput
                          style={[styles.TextInputStyleClass, { flex: 1 }]}
                          onChangeText={(text) => this._searchFilterFunction(text)}

                          value={this.state.text}
                          underlineColorAndroid='transparent'
                          placeholder="SEARCH" />
                        <Image style={styles.searchIcon} source={images.searchIcon} />
                      </View>
                    }
                    <View style={{ paddingLeft: 20 }}>
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



                  :
                  <View style={[styles.modal, { alignItems: "center", paddingLeft: 0, height: "60%" }]}>
                    {this.state.filter &&
                      <View style={{ flexDirection: "row", borderBottomColor: "#0066FF", paddingHorizontal: 10, borderBottomWidth: 1, width: "100%", alignItems: "center" }}>
                        <TextInput
                          style={[styles.TextInputStyleClass, { flex: 1 }]}
                          onChangeText={(text) => this._searchFilterFunction(text)}
                          value={this.state.text}
                          underlineColorAndroid='transparent'
                          placeholder="SEARCH" />
                        <TouchableOpacity onPress={() => this._addNewItem(this.state.text)}>
                          <Text style={{ color: "#0066FF", paddingRight: 10 }}>Add</Text>
                        </TouchableOpacity>
                      </View>
                    }
                    <Text style={mainStyles.mt40}>No results</Text>
                  </View>
              }


            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    )
  }
}

export default Picker
