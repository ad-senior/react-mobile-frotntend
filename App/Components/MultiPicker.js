import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Modal, ScrollView, FlatList,Dimensions } from 'react-native';
import Text from './CustomText';
import TextInput from './CustomTextInput';
import PropTypes from 'prop-types';
import images from '../Themes/Images';
import styles from './Styles/MultiPicker';
import Checkbox from './Checkbox';
import {BoxShadow} from 'react-native-shadow'
class MultiPicker extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      filter: true,
      hasShadow: this.props.hasShadow,
      shadowColor: this.props.shadowColor,
      
      value: this.props.placeholder,
      modalVisible: false,
      text: '',
      datas: this.props.data
    }
    this.arrayholder = this.props.data;
  }

  componentDidMount(){
    let items = []
    this.state.datas.map(function(item, index){
      item.id = index;
      item.checked = false;
      items.push(item)
    });
    this.setState({datas: items});
  }

  _onChangeText(obj){
    let items = []
    this.state.datas.map(function(item){
      if(item.id === obj.id){
        item.checked = !item.checked;
      }
      items.push(item);
    });
    this.setState({datas: items});
  }

  _submit(){
    const { onPress } = this.props;
    let items = [];
    let showData = [];
    this.state.datas.map(function(item){
      if(item.checked){
        items.push(item.value);
        showData.push(item.label);
      }
    });
    onPress(items);
    this.setState({value: showData.join(", "), modalVisible: !this.state.modalVisible})
  }

  _searchFilterFunction(text){
    const newData = this.arrayholder.filter(function(item){
      const inputData = item.label.toUpperCase()
      const textData = text.toUpperCase()
        return inputData.indexOf(textData) > -1
    })
    this.setState({
      datas: newData,
      text: text
    })
  }

  _renderPicker () {
    return (
      <View>
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
                      <Checkbox checked={item.checked} title={item.label} onPress={() => this._onChangeText(item)}/>
                    </TouchableOpacity>
                  }   
                />
              </ScrollView>
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => this._submit()}>
                  <Text>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: !this.state.modalVisible})}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      <TouchableOpacity style={[styles.container, this.props.style]}
        onPress={() => { this.setState({ modalVisible: !this.state.modalVisible }) }}>
        <Text style={[this.props.styleText, this.state.hasShadow && {marginLeft:20,flex:1}]} numberOfLines={1} >{this.state.value}</Text>
        <Image style={styles.image} source={images.searchIcon}/>
        
        </TouchableOpacity>
        </View>
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

export default MultiPicker
