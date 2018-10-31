import React, { Component } from 'react';
import {Tabs} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {topNav} from '../../route/config';
import './head.css';

class Nav extends Component {
    render() {
        let initPage = 0;
        //如果当前在除了新歌的顶部一级路由，刷新页面后依然停留在这儿。
        let index = topNav.findIndex(obj => {
            return obj.path === this.props.location.pathname;
        });

        if(index !== -1){
            //当前在顶部一级路由
            initPage = index;
        }

        return (
            <Tabs 
                tabs={topNav}
                initialPage={initPage}
<<<<<<< HEAD
                page={initPage}
=======
>>>>>>> 50f0af9cbe90e2788a4cd48a3f4c99093ca67b62
                onChange={tab => {
                    this.props.history.push(tab.path);
                }}
            ></Tabs>
        );
    }
}

export default withRouter(Nav);