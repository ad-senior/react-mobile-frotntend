import React, {Component} from 'react';
import {View, Modal, TouchableOpacity, Image} from 'react-native';
import Text from './CustomText';
import {connect} from 'react-redux';
import {EventDispatcher} from '../Actions';
import images from '../Themes/Images';
import styles from './Styles/AlertMessage';

class AlertMessage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            time: undefined
        };
    }

    componentDidMount () {
        const {daily} = this.props;
        if(daily.fetching) {
            let date = new Date();
            const h = date.getHours();
            const m = date.getMinutes();
            const hts = h < 10 ? '0' + h.toString() : h.toString();
            const mts = m < 10 ? '0' + m.toString() : m.toString();

            let time = `${hts}.${mts}`;
            this.setState({visible: true, time: time});
            setTimeout(() => this.setState({visible: false}), 2500);
            this.props.fetchDaily();
        }
    }

    render () {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.visible}>
                {this.state.visible &&
          <TouchableOpacity
              style={styles.container}
              onPress={() => this.setState({visible: false})}>
              <View style={styles.alertContainer}>
                  <View style={styles.alertBody}>
                      <View style={styles.panelBody}>
                          <View>
                              <Text style={styles.message}>NOTE SAVED</Text>
                              <Text style={styles.time}>{this.state.time} - {this.props.message}</Text>
                          </View>
                          <Image style={styles.image} source={images.close}/>
                      </View>
                  </View>
              </View>
          </TouchableOpacity>
                }
            </Modal>
        );
    }
}

const dispatchToProps = (dispatch) => ({
    fetchDaily: () => EventDispatcher.FetchDaily(dispatch),
});

const stateToProps = (state) => {
    return {
        daily: state.daily,
    };
};

export default connect(stateToProps, dispatchToProps)(AlertMessage);
