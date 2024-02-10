import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { DriverLocationService } from '../../services/DriverLocationService';

const DriverLocationReport = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const reportLocation = async () => {
        try {
            // Convert latitude and longitude to floating-point numbers with 6 significant figures
            const scaledLatitude = parseFloat(latitude).toFixed(6);
            const scaledLongitude = parseFloat(longitude).toFixed(6);

            // Call service method to report location
            await DriverLocationService.reportLocation(scaledLatitude, scaledLongitude);
        } catch (error) {
            console.error('Error reporting location:', error);
        }
    };

    return (
        <View>
            <Text>Driver Location Report</Text>
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
            <Button title="Report Location" onPress={reportLocation} />
        </View>
    );
};

export default DriverLocationReport;
