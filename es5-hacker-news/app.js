var React = require('react');
var ReactRedux = require('react-redux');
var glamorStyle = require('glamor/jsxStyle');
var Block = glamorStyle.Block;
var InlineBlock = glamorStyle.InlineBlock;
var actions = require('./actions.js');

var textColor = '#828282';
var error = false;

var getPath = function() {
    var pathname = window.location.pathname;
    var paths = pathname.split('/');
    return Number(paths[2]);
};

var App = React.createClass({
    componentWillMount: function() {
        var pathname = window.location.pathname;
        var doesPathMatch = pathname.match(/page\/[0-9]*$/g);
        if (doesPathMatch === null) {
            error = true;
        } else {
            error = false;
        }
    },
    componentDidMount: function() {
        if(!error) this.props.getNewStories(getPath());
    },
    render: function() {
        var pageStatus = this.props.status;
        var topStories = this.props.topStories;
        var items = this.props.items;
        return React.createElement(
            Block,
            { css: { height: '1250px', width: '85%', margin: '0 auto', backgroundColor: '#f6f6ef' } },
            React.createElement(
                Block,
                { css: { height: '20px', backgroundColor: '#ff6600', fontWeight: '600', paddingLeft: '5px' } },
                ' Hacker News '
            ),
            error && React.createElement(
                'div',
                null,
                ' This is an error! '
            ),
            pageStatus === 'success' && topStories && topStories.map(function (story, index) {
                if (!items[story]) return null;
                var itemstory = items[story];
                return React.createElement(
                    Block,
                    null,
                    React.createElement(
                        Block,
                        { css: { padding: '10px 0 0 0' } },
                        React.createElement(
                            InlineBlock,
                            { css: { color: textColor, width: '20px', textAlign: 'right' } },
                            index + 1,
                            '.'
                            ),
                            React.createElement(
                            InlineBlock,
                            { css: { padding: '0 0 0 5px' } },
                            React.createElement(
                                'a',
                                { style: { textDecoration: 'none', cursor: 'pointer', color: 'black' }, href: itemstory.url },
                                itemstory.title
                            )
                        ),
                        React.createElement(
                        InlineBlock,
                        { css: { paddingLeft: '5px', color: textColor, fontSize: '12px' } },
                        '(something.com)'
                        )
                    ),
                    React.createElement(
                        Block,
                        { css: { paddingLeft: '23px', fontSize: '12px', color: textColor } },
                        itemstory.score,
                        ' points by ',
                        itemstory.by,
                        ' | ',
                        itemstory.kids ? itemstory.kids.length : 0,
                        ' comments'
                    )
                );
            }),
            pageStatus === 'success' && React.createElement(
                Block,
                { css: { paddingLeft: '20px', color: textColor, cursor: 'pointer' }, onclick: function onclick() {
                    window.location.href = window.location.origin + '/page/' + (getPath() + 1);
                } },
                'More'
            ),
            pageStatus === 'loading' && React.createElement(
                Block,
                null,
                'Loading'
            )
        );
    }
});

var mapStateToProps = function (state) {
    var newsStories = state.newsStories;
    return {
        topStories: newsStories.topNews,
        items: newsStories.items,
        status: newsStories.status,
    };
};

var mapDispatchToProps = function (dispatch) {
    return {
        getNewStories: function(number) {
            dispatch(actions.getNewStories(number));
        },
    };
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
