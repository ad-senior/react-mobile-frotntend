import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import Checkbox from '../Components/Checkbox';
import mainStyles from '../Themes/Styles';
import MultipleCheckBox from './Styles/MultipleCheckBox';

class MultipleCheckbox extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
    }

    constructor (props) {
        super(props);
        let items = [];
        this.props.data.map(function (item, index) {
            item.id = index;
            item.checked = false;
            items.push(item);
        });
        this.state = {
            data: items
        };
    }

    onPress = checked => {
        let items = [];
        this.state.data.map(function (item, index) {
            item.id = index;
            item.checked = checked.value == item.value;
            items.push(item);
        });
        this.setState({data: items});
    }


    render () {
        return (
            <View>

                <FlatList
                    data={this.state.data}
                    renderItem={({item}) =>

                        <Checkbox
                            style={[mainStyles.button,
                                mainStyles.buttonRoundInActive,
                                MultipleCheckBox.checkbox]}
                            title={item.label} checked={item.checked} onPress={() => { this.onPress(item); this.props.onPress(item); }} />
                    }
                />
            </View>
        );
    }
}

export default MultipleCheckbox;