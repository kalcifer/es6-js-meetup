var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var reducer = require('./reducer.js');
var thunk = require('redux-thunk').default;
console.log(thunk);

var store = Redux.createStore(reducer, Redux.applyMiddleware(thunk));

var App = require('./app.js');

function render(){
    return <ReactRedux.Provider store={store}>
	<App />
    </ReactRedux.Provider>
}

ReactDOM.render(render(), document.getElementById('container'));