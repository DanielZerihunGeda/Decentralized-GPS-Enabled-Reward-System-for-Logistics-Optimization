import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ContractService } from '../../services/ContractService';

const DriverRouteForm = () => {
    const [duration, setDuration] = useState('');
    const [paymentInterval, setPaymentInterval] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [waypoints, setWaypoints] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const addWaypoint = () => {
        // Convert latitude and longitude to floating-point numbers with 6 significant figures
        const scaledLatitude = parseFloat(latitude).toFixed(6);
        const scaledLongitude = parseFloat(longitude).toFixed(6);

        // Add waypoint to the list
        setWaypoints([...waypoints, { latitude: scaledLatitude, longitude: scaledLongitude }]);

        // Clear latitude and longitude input fields
        setLatitude('');
        setLongitude('');
    };

    const submitRoute = async () => {
        try {
            // Convert duration, paymentInterval, and paymentAmount to numbers
            const durationNumber = parseInt(duration);
            const paymentIntervalNumber = parseInt(paymentInterval);
            const paymentAmountNumber = parseInt(paymentAmount);

            // Call smart contract method to create route
            await ContractService.createRoute(durationNumber, paymentIntervalNumber, paymentAmountNumber, waypoints);
        } catch (error) {
            console.error('Error submitting route:', error);
        }
    };

    return (
        <View>
            <Text>Driver Route Form</Text>
            <TextInput
                placeholder="Duration (minutes)"
                onChangeText={text => setDuration(text)}
                value={duration}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Payment Interval (minutes)"
                onChangeText={text => setPaymentInterval(text)}
                value={paymentInterval}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Payment Amount (wei)"
                onChangeText={text => setPaymentAmount(text)}
                value={paymentAmount}
                keyboardType="numeric"
            />
            <View>
                <TextInput
                    placeholder="Latitude"
                    onChangeText={text => setLatitude(text)}
                    value={latitude}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Longitude"
                    onChangeText={text => setLongitude(text)}
                    value={longitude}
                    keyboardType="numeric"
                />
                <Button title="Add Waypoint" onPress={addWaypoint} />
            </View>
            <Button title="Submit Route" onPress={submitRoute} />
        </View>
    );
};

export default DriverRouteForm;
