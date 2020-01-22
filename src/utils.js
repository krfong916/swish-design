export function callAll(...functions) {
	return function(...args) {
		functions.forEach(function(fn) {
			fn && fn(...args)
		})
	}
}

export function pluck(property, obj) {
	return Object.keys(obj).reduce((temp, key) => {
		if (key != property) temp[key] = obj[key]
		return temp
	}, {})
}

export function hasStateChange(currentState, stateChanges) {
	return Object.keys(stateChanges).every(
		key => currentState[key] == stateChanges[key],
	)
}

export function shallowCompare(obj1, obj2) {
	return (
		Object.keys(obj1).length == Object.keys(obj2).length &&
		Object.keys(obj1).every(key => obj1[key] == obj2[key])
	)
}
