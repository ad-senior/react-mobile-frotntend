import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import Text from './CustomText'
import TextInput from './CustomTextInput'

import PropTypes from 'prop-types';
import images from '../Themes/Images';
import styles from './Styles/PickerUser';
import Checkbox from './Checkbox';

class Picker extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      filter: true,
      value: this.props.placeholder,
      modalVisible: false,
      text: '',
      datas: this.props.data
    }
    this.arrayholder = this.props.data;
  }

  _onChangeText(item){
    const { onPress } = this.props;
    this.setState({
      modalVisible: !this.state.modalVisible,
      value: `${item.first_name} ${item.last_name}`,
    });
    onPress(item);
  }

  _searchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const firstName = item.first_name.toUpperCase()
      const lastName = item.last_name.toUpperCase()
      const textData = text.toUpperCase()
      if (firstName.indexOf(textData) > -1){
        return item
      }else{
        return lastName.indexOf(textData) > -1
      }   
    })
    this.setState({
      datas: newData,
      text: text
    })
  }

  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}
        onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}>
        <Text style={this.props.styleText}>{this.state.value}</Text>
        <Image style={styles.image} source={images.searchIcon}/>
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
                    placeholder="SEARCH"/>
                  <Image style={styles.searchIcon} source={images.searchIcon}/>
                </View>
              }
              <ScrollView>
                <FlatList
                  data={this.state.datas}
                  keyExtractor={(item, index) => `picker-${index}`}
                  renderItem={({item, index}) =>
                    <TouchableOpacity
                      style={styles.items}
                      onChangeText={() => this._onChangeText(item)}
                      value={this.props.value ? this.props.value : this.state.value}>
                      <Checkbox checked={false} title={`${item.first_name} ${item.last_name}`} onPress={() => this._onChangeText(item)}/>
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
}

export default Picker
