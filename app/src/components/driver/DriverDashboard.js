import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { ContractService } from '../../services/ContractService';
import { DriverLocationService } from '../../services/DriverLocationService';

const DriverDashboard = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [reportingStatus, setReportingStatus] = useState(false);

    // Function to report current location
    const reportLocation = async () => {
        try {
            // Get current location from GPS
            const { latitude, longitude } = await DriverLocationService.getCurrentLocation();

            // Multiply latitude and longitude by 10^6 for precision
            const scaledLatitude = latitude * 10 ** 6;
            const scaledLongitude = longitude * 10 ** 6;

            // Call smart contract method to report location
            await ContractService.reportLocation(scaledLatitude, scaledLongitude);

            // Set current location state
            setCurrentLocation({ latitude, longitude });
        } catch (error) {
            console.error('Error reporting location:', error);
        }
    };

    // Function to start/stop location reporting
    const toggleLocationReporting = () => {
        setReportingStatus(!reportingStatus);
        if (!reportingStatus) {
            // Start reporting location periodically
            // For example, you can use setInterval to call reportLocation function every few minutes
        } else {
            // Stop reporting location
            // For example, you can use clearInterval to stop the setInterval process
        }
    };

    useEffect(() => {
        // Cleanup function to stop reporting location when component unmounts
        return () => {
            // Stop reporting location
            // For example, you can use clearInterval to stop the setInterval process
        };
    }, []);

    return (
        <View>
            <Text>Driver Dashboard</Text>
            <Button title="Report Location" onPress={reportLocation} />
            <Button title={reportingStatus ? "Stop Reporting" : "Start Reporting"} onPress={toggleLocationReporting} />
            {currentLocation && (
                <View>
                    <Text>Current Location:</Text>
                    <Text>Latitude: {currentLocation.latitude}</Text>
                    <Text>Longitude: {currentLocation.longitude}</Text>
                </View>
            )}
        </View>
    );
};

export default DriverDashboard;
