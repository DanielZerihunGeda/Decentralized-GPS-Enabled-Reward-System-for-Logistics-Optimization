import { ethers } from 'ethers';
import RoutePaymentContract from '../contracts/build/contracts/RoutePaymentContract.json'; // Import ABI

const ContractService = {
  contract: null,

  init: async () => {
    // Connect to Ethereum provider (e.g., Metamask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get signer
    const signer = provider.getSigner();

    // Initialize contract instance
    ContractService.contract = new ethers.Contract(
      RoutePaymentContract.networks[provider.network.chainId].address,
      RoutePaymentContract.abi,
      signer
    );
  },

  createRoute: async (driver, duration, paymentInterval, paymentAmount, latitudes, longitudes) => {
    await ContractService.contract.createRoute(driver, duration, paymentInterval, paymentAmount, latitudes, longitudes);
  },

  updateRoute: async (driver, duration, paymentInterval, paymentAmount, latitudes, longitudes) => {
    await ContractService.contract.updateRoute(driver, duration, paymentInterval, paymentAmount, latitudes, longitudes);
  },

  reportLocation: async (latitude, longitude) => {
    await ContractService.contract.reportLocation(latitude, longitude);
  },

  getRouteDetails: async (driver) => {
    return await ContractService.contract.routes(driver);
  },

  getContractAddress: () => {
    return ContractService.contract.address;
  },
};

export default ContractService;
