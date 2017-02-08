var Redux = require('redux');

var kittyApp = function (state, action) {
    var state = state || {};
    switch (action.type){
    case 'KITTY_LOADING':
	return {
	    status: 'loading'
	}
    case 'KITTY_SUCCESS':
	return {
	    status: 'success',
	    url: action.url
	}
    default:
	return state;
    }
};

var kittyNames = function (state, action) {
    var state = state || {};
    switch (action.type){
    case 'NAMES_LOADING':
        return {
	    status: 'loading'
		}
    case 'NAMES_SUCCESS':
        return {
            status: 'success',
		data: action.data
		}
    default:
        return state;
    }
};


module.exports = Redux.combineReducers({
	kittyApp: kittyApp,
	kittyNames: kittyNames
    });