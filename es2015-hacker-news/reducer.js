const Redux = require('redux');

export const MAX_ITEMS = 28;

const newsStories = function (state ={status: 'init'}, action) {
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
