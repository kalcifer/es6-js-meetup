'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Block, InlineBlock} from 'glamor/jsxstyle';

import actions from './actions.js';

const textColor = '#828282';

class App extends Component {
    componentDidMount () {
        this.props.getNewStories();
    }
    render () {
        const {status, topStories, items} = this.props;
        return (<Block css={{ height: '1200px', width: '85%', margin: '0 auto', backgroundColor: '#f6f6ef' }}>
          <Block css={{ height: '20px', backgroundColor: '#ff6600', fontWeight: '600', paddingLeft: '5px' }}> Hacker News </Block>
          {status === 'success' && topStories && topStories.map(function(story, index) {
              if (!items[story]) return null;
              const itemstory = items[story];
              return (<Block>
              <Block css={{ padding: '10px 0 0 0' }}>
                <InlineBlock css={{ color: textColor, width: '20px', textAlign: 'right' }}>{index + 1}.</InlineBlock>
                <InlineBlock css={{ padding: '0 0 0 5px' }}>
                  <a style={{ textDecoration: 'none', cursor: 'pointer', color: 'black' }} href={itemstory.url}>{itemstory.title}</a>
                </InlineBlock>
                <InlineBlock css={{ paddingLeft: '5px', color: textColor, fontSize: '12px' }}>(something.com)</InlineBlock>
              </Block>
              <Block css={{ paddingLeft: '23px', fontSize: '12px', color: textColor }}>
                {itemstory.score} points by {itemstory.by} | {itemstory.kids ? itemstory.kids.length : 0} comments
                  </Block>
            </Block>);
          })}
          {status === 'loading' && <Block>Loading</Block>}
        </Block>);
    }
    getRainbow () {
        return (<div><Block backgroundColor="#f06" css={{ height: '20px' }} />
      <Block backgroundColor="#ffd82b" css={{ height: '20px' }} />
      <Block backgroundColor="#c6ff2b" css={{ height: '20px', textAlign: 'center' }}>Get A Kitty!</Block>
      <Block backgroundColor="#2bfff4" css={{ height: '20px' }} /></div>);
    }
}

const mapStateToProps = function ({newsStories: {topNews: topStories, items, status}}) {
    return {
        topStories,
        items,
        status
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        getNewStories: function() {
            dispatch(actions.getNewStories());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
