var makeRequest = require('./utils');
var MAX_ITEMS = require('./maxConstant');

function getNewStories(number) {
    return function (dispatch) {
        dispatch({ type: 'TOPNEWS_LOADING' });
        return makeRequest('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json')
          .then(function(response){ return JSON.parse(response);})
          .then(function(response){
              response.map(function(item, index) {
                  var actualMax = MAX_ITEMS * number;
                  var actualMin = actualMax - MAX_ITEMS; 
                  if (actualMin > index || index > actualMax) return;
                  return makeRequest('GET', 'https://hacker-news.firebaseio.com/v0/item/' + item + '.json')
                    .then(function(response) { return JSON.parse(response);})
                    .then(function(response){
                        dispatch({
                            type: 'ITEM_SUCCESS',
                            id: item,
                            data: response,
                        });
                    });
              });
              return dispatch({
                  type: 'TOPNEWS_SUCCESS',
                  data: response,
              });
          });
    };
}

module.exports = {
    getNewStories: getNewStories
};
