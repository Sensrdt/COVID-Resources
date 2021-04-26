import Location from '../Utils/Location.json';

let stateArray = [];

Object.keys(Location).forEach(function (key) {
	stateArray.push(key);
});

console.log(stateArray);

export default stateArray;
