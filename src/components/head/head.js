import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Top from './top';
import Nav from './nav';
import {topNav} from '../../route/config';
import './head.css';

class Head extends Component {
    render() {
        let {location} = this.props;
        let initPage = 0;
        let indexPage = -1;
        //如果当前在除了新歌的顶部一级路由，刷新页面后依然停留在这儿。
        let index = topNav.findIndex(obj => {
            return obj.path === location.pathname;
        });

        if(index !== -1){
            //当前在顶部一级路由
            initPage = index;
        }

        //切换选项卡
        let changePageHead = (path, index) => {
            this.props.history.push(path);
            indexPage = index;
        }

        //indexPage 为-1说明刷新了页面
        indexPage = indexPage === -1 ? initPage : indexPage;

        return (
            <header className="head">
                <Top />
                <Nav initPage={initPage} indexPage={indexPage} changePageHead={changePageHead} />
            </header>
        );
    }
}

export default withRouter(Head);