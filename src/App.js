import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './route/routes';
import Head from './components/head/head';
import {getStyle} from './assets/js/myFn';
import 'antd-mobile/dist/antd-mobile.css';
import './assets/css/kugou.css';

class App extends Component {
    constructor(props){
        super(props);

        this.main = React.createRef();
    }

    componentDidMount(){
        //获取非行间样式
        /* function getStyle(obj, name){
            if (obj.currentStyle){ //ie
                return obj.currentStyle[name];
            }
            else {
                return getComputedStyle(obj, false)[name]; //firefox
            }
        }; */

        console.log(getStyle(this.main.current, 'paddingTop'));
    }

    render() {
        return ( 
            <Router>
                <React.Fragment>
                    <Head />
                    <div className="content app-main" ref={this.main}>
                        <Routes />
                    </div>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;