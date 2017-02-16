var Redux = require('redux');

var MAX_ITEMS = 28;
module.exports = MAX_ITEMS;

var newsStories = function (state, action) {
    var state = state || { status: 'init' };
    switch (action.type){
        case 'TOPNEWS_LOADING':
            return {
                status: 'loading'
            }
        case 'TOPNEWS_SUCCESS':
            return {
                status: 'loading',
                topNews: action.data,
                items: {}
            }
        case 'ITEM_SUCCESS':
            const items = state.items;
            items[action.id] = action.data;
            return {
                status: Object.keys(items).length === MAX_ITEMS ? 'success' : state.status,
                topNews : state.topNews,
                items: items
            }
        default:
            return state;
    }
};

module.exports = Redux.combineReducers({
	newsStories: newsStories
});