import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App';
import reducers from './reducers/reducers';
import * as serviceWorker from './serviceWorker';

let data = {
    mainPt: 0,
    isPlay: false,
    hash: '',
    songList: []
};

export let store = createStore(reducers, data);

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