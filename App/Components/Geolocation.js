import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Geolocation extends Component {

    constructor (props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            debugger: false
        };
    }

    componentDidMount () {
        this._realtimeObserveLocation();
        this._onceRequestLocation();
    }

    componentWillUnmount () {
        navigator.geolocation.clearWatch(this.watchId);
    }

    _realtimeObserveLocation () {
    //realtime updating
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.props.onLocation([position.coords.latitude, position.coords.longitude]);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10},
        );
    }

    _onceRequestLocation () {
    //once request less battery consume
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.onLocation([position.coords.latitude, position.coords.longitude]);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
    }

    render () {
        if (!this.state.debugger) {
            return (<View></View>);
        } else {
            return (
                <View style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Latitude: {this.state.latitude}</Text>
                    <Text>Longitude: {this.state.longitude}</Text>
                    {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                </View>
            );
        }
    }
}

export default Geolocation;
