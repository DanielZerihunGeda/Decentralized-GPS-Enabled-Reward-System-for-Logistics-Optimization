import { ethers } from 'ethers';
import RoutePaymentContract from '../../contracts/build/contracts/RoutePaymentContract.json';
import contractAddress from '../../contracts/build/contracts/RoutePaymentContract.json';

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545'); // Adjust the URL based on your network configuration
const contract = new ethers.Contract(contractAddress, RoutePaymentContract.abi, provider);

const RouteService = {
  createRoute: async (driver, duration, paymentInterval, paymentAmount, latitudes, longitudes) => {
    try {
      const tx = await contract.createRoute(driver, duration, paymentInterval, paymentAmount, latitudes, longitudes);
      await tx.wait();
      console.log('Route created successfully!');
    } catch (error) {
      console.error('Error creating route:', error);
    }
  },
  updateRoute: async (driver, duration, paymentInterval, paymentAmount, latitudes, longitudes) => {
    try {
      const tx = await contract.updateRoute(driver, duration, paymentInterval, paymentAmount, latitudes, longitudes);
      await tx.wait();
      console.log('Route updated successfully!');
    } catch (error) {
      console.error('Error updating route:', error);
    }
  },
};

export default RouteService;
