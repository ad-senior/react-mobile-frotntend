import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types'
import styles from './Styles/Picker'
import Checkbox from './Checkbox'

class Picker extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    style: PropTypes.style,
    styleText: PropTypes.style
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.placeholder,
      modalVisible: false,
    }
    this.icon = require('../Images/Icons/icon-arrow-dropdown.png');
  }

  _onChangeText(item){
    const { onPress } = this.props;
    this.setState({
      modalVisible: !this.state.modalVisible,
      value:item.label,
    });
    onPress(item.value);
  }

  render () {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]}
        onPress={() => {this.setState({modalVisible: !this.state.modalVisible})}}>
        <Text style={this.props.styleText}>{this.state.value}</Text>
        <Image style={styles.image} source={this.icon}/>
        <Modal
          anumationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <ScrollView>
                <FlatList
                  data={this.props.data}
                  keyExtractor={(item, index) => `picker-${index}`}
                  renderItem={({item, index}) =>
                    <TouchableOpacity
                      style={styles.items}
                      onChangeText={() => this._onChangeText(item)}
                      value={this.props.value ? this.props.value : this.state.value}>
                      <Checkbox checked={false} title={item.label} onPress={() => this._onChangeText(item)}/>
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
