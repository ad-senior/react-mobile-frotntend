import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types'
import mainStyles from '../Themes/Styles';
import images from '../Themes/Images';
import styles from './Styles/MultiOptionIcon';
import Image from 'react-native-remote-svg'
class MultipleOptionIcon extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    let items = [];
    let count = this.props.data.length;
    this.props.data.map(function (item, index) {
      item.id = index;
      item.checked = false;
      item.first = index == 0;
      item.last = index == count - 1;
      items.push(item)
    });
    this.state = {
      data: items
    }
  }

  onPress = checked => {
    let items = []
    this.state.data.map(function (item, index) {

      item.id = index;
      item.checked = checked.value == item.value;
      items.push(item)
    });
    this.setState({ data: items });
  }


  render() {
    return (
      <View style={styles.fullWidth}>

        <FlatList
          numColumns={this.state.data.length}
          data={this.state.data}
          renderItem={({ item, index }) =>

            <TouchableOpacity
              style={[styles.main,
                item.first && styles.first,
                item.last && styles.last,
                item.checked && styles.checked,
              ]}
              onPress={() => { this.onPress(item), this.props.onPress(item) }}>
              <Image style={styles.icon} source={item.image} />
              

            </TouchableOpacity>


          }
        />


      </View>
    )
  }
}

export default MultipleOptionIcon