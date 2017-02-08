var React = require('react');
var ReactRedux = require('react-redux');
var glamorStyle = require('glamor/jsxStyle');
var Block = glamorStyle.Block;
var actions = require('./actions.js');

var App = React.createClass({
	componentDidMount: function() {
	    this.props.getCatPics(100, 100);
	    this.props.getCatNames();
	},
	render: function(){
	    var url = this.props.url;
	    console.log(this.props.data);
	    return <div>
	    <Block backgroundColor='#f06' css={{height: '20px'}}></Block>
	    <Block backgroundColor='#ffd82b' css={{height: '20px'}}></Block>
            <Block backgroundColor='#c6ff2b' css={{height: '20px', textAlign:'center'}}>Get A Kitty!</Block>
	    <Block backgroundColor='#2bfff4' css={{height: '20px'}}></Block>
	    <img src={url} />
	    </div>
	}
});

const mapStateToProps = function(state) {
    return {
	url: state.kittyApp && state.kittyApp.url,
	data: state.kittyNames && state.kittyNames.data
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
	getCatPics: function(height, width) {
	    dispatch(actions.getCatsX(height, width));
	},
	getCatNames: function() {
	    dispatch(actions.getCatNames());
	}
    }
}

    module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);