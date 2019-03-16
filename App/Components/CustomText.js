import React, {Component} from 'react';
import {Text} from 'react-native';
import styles from './Styles/CustomText';


class CustomText extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Text style={[styles.defaultText, this.props.style]} numberOfLines={this.props.numberOfLines}>
                {this.props.children}
            </Text>
        );
    }

}

export default (CustomText);
