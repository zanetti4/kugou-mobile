import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './route/routes';
import Head from './components/head/head';
<<<<<<< HEAD
import {getStyle} from './assets/js/myFn';
=======
>>>>>>> 50f0af9cbe90e2788a4cd48a3f4c99093ca67b62
import 'antd-mobile/dist/antd-mobile.css';
import './assets/css/kugou.css';

class App extends Component {
<<<<<<< HEAD
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

=======
>>>>>>> 50f0af9cbe90e2788a4cd48a3f4c99093ca67b62
    render() {
        return ( 
            <Router>
                <React.Fragment>
                    <Head />
<<<<<<< HEAD
                    <div className="content app-main" ref={this.main}>
=======
                    <div className="content app-main">
>>>>>>> 50f0af9cbe90e2788a4cd48a3f4c99093ca67b62
                        <Routes />
                    </div>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;