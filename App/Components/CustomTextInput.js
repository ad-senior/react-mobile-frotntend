import React, {Component} from 'react';
import {TextInput} from 'react-native';
import styles from './Styles/CustomText';


class CustomTextInput extends Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TextInput {...this.props} style={[styles.defaultText, this.props.style]}  >
                {this.props.children}
            </TextInput>
        );
    }

}

export default (CustomTextInput);
