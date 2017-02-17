var Redux = require('redux');
var MAX_ITEMS = require('./maxConstant');

var newsStories = function (state, action) {
    state = state || { status: 'init' };
    switch (action.type) {
    case 'TOPNEWS_LOADING':
        return {
            status: 'loading',
        };
    case 'TOPNEWS_SUCCESS':
        return {
            status: 'loading',
            topNews: action.data,
            items: {},
        };
    case 'ITEM_SUCCESS':
        var items = state.items;
        if(!items) return state;
        items[action.id] = action.data;
        return {
            status: Object.keys(items).length === MAX_ITEMS ? 'success' : state.status,
            topNews: state.topNews,
            items: items,
        };
    default:
        return state;
    }
};

module.exports = Redux.combineReducers({
    newsStories: newsStories
});
