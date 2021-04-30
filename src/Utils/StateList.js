import Location from '../Utils/Location.json';

let stateArray = [];

Object.keys(Location).forEach(function (key) {
	stateArray.push(key);
});


export default stateArray;
