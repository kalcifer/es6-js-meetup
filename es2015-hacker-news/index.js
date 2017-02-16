import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import reducer from './reducer.js';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

/* eslint-disable */
function init() {
    let App = require('./app').default;
    root = render(<Provider store={store}>
      <App />
    </Provider>, document.getElementById('container'));
}

if (module.hot) {
    module.hot.accept('./app', () => requestAnimationFrame(init) );
}

init();