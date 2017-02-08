function getCats (height, width) {
    return function(dispatch) {
	dispatch({type:'KITTY_LOADING'});
	return fetch('/kitty/' + height + '/' + width)
	.then(function(response){
		return dispatch({
			type: 'KITTY_SUCCESS',
			url: resp
		    });
	    });
    }
}

function getCatNames () {
    return function (dispatch) {
	dispatch({type: 'NAMES_LOADING'});
	return fetch('/catnames')
	    .then(function(response){
		    return response.json();
		})
	    .then(function(response){
		    return dispatch({
			    type: 'NAMES_SUCCESS',
				data: response
			})
		});
    }
}


module.exports = {
    getCats: getCats,
    getCatNames: getCatNames
}