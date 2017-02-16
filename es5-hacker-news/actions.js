var MAX_ITEMS = require('./reducer');

function getNewStories () {
    return function(dispatch) {
		dispatch({type:'TOPNEWS_LOADING'});
		return fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
		.then(response => response.json())
		.then(function(response){
			response.map((item, index) => {
				if (index > MAX_ITEMS) return;
				return fetch('https://hacker-news.firebaseio.com/v0/item/' + item +'.json')
				.then(response => response.json())
				.then(response => 
				dispatch({
					type: 'ITEM_SUCCESS',
					id: item,
					data: response
				}))
			})
			return dispatch({
				type: 'TOPNEWS_SUCCESS',
				data: response
		    });
	    });
    }
}

module.exports = {
    getNewStories: getNewStories
}