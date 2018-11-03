import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import Routes from './route/routes';
import Head from './components/head/head';
import PlayerBottom from './components/player/player-bottom';
import {getStyle} from './assets/js/myFn';
import 'antd-mobile/dist/antd-mobile.css';
import './assets/css/kugou.css';

class App extends Component {
    constructor(props){
        super(props);

        this.main = React.createRef();
    }

    componentDidMount(){
        let mainPt = parseInt(getStyle(this.main.current, 'paddingTop'));

        this.props.dispatch({
            type: 'updateMainPt',
            mainPt
        });
    }

    render() {
        return ( 
            <Router>
                <React.Fragment>
                    <Head />
                    <div className="content app-main" ref={this.main}>
                        <Routes />
                    </div>
                    <PlayerBottom />
                </React.Fragment>
            </Router>
        );
    }
}

export default connect()(App);