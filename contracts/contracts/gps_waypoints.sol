// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract RoutePaymentContract is Ownable {
    struct Waypoint {
        int latitude;
        int longitude;
    }

    struct Route {
        address driver;
        address payable admin;
        uint duration; // in minutes
        Waypoint[10] waypoints; // Fixed-size array with a maximum of 10 waypoints
        uint waypointCount; // Number of waypoints in the route
        uint paymentInterval; // in minutes
        uint paymentAmount; // in wei
        uint lastPaymentTime;
    }

    mapping(address => Route) public routes;

    IERC20 public tokenContract; // ERC20 token contract

    event PaymentMade(address indexed driver, uint amount);

    constructor(address _tokenContractAddress) Ownable(msg.sender) {
        tokenContract = IERC20(_tokenContractAddress);
    }

    function createRoute(
        address _driver,
        uint _duration,
        uint _paymentInterval,
        uint _paymentAmount,
        int[] memory _latitudes,
        int[] memory _longitudes
    ) external onlyOwner {
        require(routes[_driver].driver == address(0), "Route already exists");
        require(_latitudes.length == _longitudes.length, "Mismatch between latitude and longitude arrays");
        require(_latitudes.length <= 10, "Exceeded maximum waypoints");

        Route storage route = routes[_driver];
        route.driver = _driver;
        route.admin = payable(msg.sender);
        route.duration = _duration;
        route.paymentInterval = _paymentInterval;
        route.paymentAmount = _paymentAmount;
        route.lastPaymentTime = block.timestamp;

        // Copy waypoints
        for (uint i = 0; i < _latitudes.length; i++) {
            route.waypoints[i] = Waypoint({
                latitude: _latitudes[i],
                longitude: _longitudes[i]
            });
        }

        route.waypointCount = _latitudes.length;
    }

    function updateRoute(
        address _driver,
        uint _duration,
        uint _paymentInterval,
        uint _paymentAmount,
        int[] memory _latitudes,
        int[] memory _longitudes
    ) external onlyOwner {
        Route storage route = routes[_driver];
        require(route.driver != address(0), "Route does not exist");
        require(_latitudes.length == _longitudes.length, "Mismatch between latitude and longitude arrays");
        require(_latitudes.length <= 10, "Exceeded maximum waypoints");

        route.duration = _duration;
        route.paymentInterval = _paymentInterval;
        route.paymentAmount = _paymentAmount;

        // Copy waypoints
        for (uint i = 0; i < _latitudes.length; i++) {
            route.waypoints[i] = Waypoint({
                latitude: _latitudes[i],
                longitude: _longitudes[i]
            });
        }

        route.waypointCount = _latitudes.length;
    }

    function reportLocation(int _latitude, int _longitude) external {
        Route storage route = routes[msg.sender];
        require(route.driver != address(0), "Route does not exist");

        require(block.timestamp >= route.lastPaymentTime + route.paymentInterval, "Payment interval not reached");

        route.lastPaymentTime = block.timestamp;

        uint payment = calculatePayment(route, _latitude, _longitude);

        if (payment > 0) {
            tokenContract.transferFrom(route.admin, route.driver, payment);
            emit PaymentMade(route.driver, payment);
        }
    }

    function calculatePayment(Route memory _route, int _latitude, int _longitude) internal view returns (uint) {
        uint elapsedMinutes = (block.timestamp - _route.lastPaymentTime) / 60;
        if (elapsedMinutes > _route.duration) {
            return 0; // Route duration exceeded
        }

        uint payment = _route.paymentAmount;

        for (uint i = 0; i < _route.waypointCount; i++) {
            int latDiff = abs(_route.waypoints[i].latitude - _latitude);
            int longDiff = abs(_route.waypoints[i].longitude - _longitude);
            if (latDiff <= 1 && longDiff <= 1) { // Assuming latitude and longitude differences less than 1 unit are considered within waypoint range
                return payment; // Full payment if within waypoint range
            } else {
                // Decrease payment proportionally based on distance from waypoint
                payment -= (uint(latDiff) + uint(longDiff)) * _route.paymentAmount / (2 * (uint(latDiff) + uint(longDiff)));
            }
        }

        return payment;
    }

    function abs(int x) internal pure returns (int) {
        return x >= 0 ? x : -x;
    }
}
