import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App';
import reducer from './reducers/combine';
import * as serviceWorker from './serviceWorker';
require('es6-promise').polyfill();

let data = {
  play: {
    isPlay: 0,
    hash: '',
    songList: [],
  },
  others: {
    mainPt: 0,
    isShowPlayer: false,
    songName: '',
    titleName: '',
    isLoading: true,
    hasResult: true,
    pageTitlePlay: ''
  }
};

export let store = createStore(reducer, data);

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();