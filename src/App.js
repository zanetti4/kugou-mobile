import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './route/routes';
import 'antd-mobile/dist/antd-mobile.css';
import './kugou.css';

class App extends Component {
    render() {
        return ( 
            <Router>
                <div>
                    <div className="content app-main">
                        <Routes />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;