import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './route/routes';
import Head from './components/head/head';
import 'antd-mobile/dist/antd-mobile.css';
import './assets/css/kugou.css';

class App extends Component {
    render() {
        return ( 
            <Router>
                <React.Fragment>
                    <Head />
                    <div className="content app-main">
                        <Routes />
                    </div>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;