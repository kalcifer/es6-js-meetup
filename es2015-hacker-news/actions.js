const makeRequest = require('./utils');
const MAX_ITEMS = require('./reducer');


function getNewStories() {
    return function (dispatch) {
        dispatch({ type: 'TOPNEWS_LOADING' });
        return makeRequest('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json')
          .then(response => JSON.parse(response))
          .then(response => {
              response.map(function(item, index) {
                  if (index > MAX_ITEMS) return;
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
