var React = require('react');
var ReactRedux = require('react-redux');
var glamorStyle = require('glamor/jsxStyle');
var Block = glamorStyle.Block;
var InlineBlock = glamorStyle.InlineBlock;
var actions = require('./actions.js');

var textColor = '#828282';

var App = React.createClass({
	componentDidMount: function() {
	    this.props.getNewStories();
	},
	render: function(){
		var pageStatus = this.props.status;
	    var topStories = this.props.topStories;
		var items = this.props.items;
	    return <Block css={{height: '1200px', width: '85%', margin: '0 auto', backgroundColor:'#f6f6ef'}}>
			<Block css={{height: '20px', backgroundColor: '#ff6600', fontWeight: '600', paddingLeft: '5px'}}> Hacker News </Block>
			{pageStatus === 'success' && topStories && topStories.map(function(story, index){
				if(!items[story]) return null;
				var itemstory = items[story];
				return <Block>
					<Block css={{ padding: '10px 0 0 0' }}>
						<InlineBlock css={{color: textColor, width:'20px',textAlign:'right'}}>{index+1}.</InlineBlock>
						<InlineBlock css={{padding: '0 0 0 5px'}}>
							<a style={{textDecoration: 'none', cursor: 'pointer', color: 'black', }} href={itemstory.url}>{itemstory.title}</a>
						</InlineBlock>
						<InlineBlock css={{paddingLeft: '5px', color: textColor, fontSize: '12px'}}>(something.com)</InlineBlock>
					</Block>
					<Block css={{paddingLeft: '23px', fontSize: '12px', color: textColor}}>
						{itemstory.score} points by {itemstory.by} | {itemstory.kids? itemstory.kids.length : 0} comments
					</Block>
				</Block>
			})}
			{pageStatus === 'loading' && <Block>Loading</Block>}
		</Block>
	},
	getRainbow: function() {
		return (<div><Block backgroundColor='#f06' css={{height: '20px'}}></Block>
	    <Block backgroundColor='#ffd82b' css={{height: '20px'}}></Block>
            <Block backgroundColor='#c6ff2b' css={{height: '20px', textAlign:'center'}}>Get A Kitty!</Block>
	    <Block backgroundColor='#2bfff4' css={{height: '20px'}}></Block></div>)
	}
});

const mapStateToProps = function(state) {
	var newsStories = state.newsStories;
    return {
		topStories: newsStories.topNews,
		items: newsStories.items,
		status: newsStories.status
	};
}

const mapDispatchToProps = function(dispatch) {
    return {
		getNewStories: function() {
			dispatch(actions.getNewStories());
		},
    }
}

    module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);