import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Tabs, NavBar, Icon} from 'antd-mobile';
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

        let back = <Icon type="left" size="lg" color="#BBB" />;
        let navBar = <NavBar
            className="nav-title"
            mode="light"
            icon={back}
            onLeftClick={() => console.log('onLeftClick')}
        >{this.props.songName}</NavBar>;
        let tabs = <Tabs 
            tabs={topNav}
            initialPage={initPage}
            page={initPage}
            onChange={tab => {
                this.props.history.push(tab.path);
            }}
        ></Tabs>;
        let which = this.props.isShowPlayer ? navBar : tabs;

        return which;
    }
}

//从 redux 获取是否显示播放器
function mapStateToProps(state){
    return {
        isShowPlayer: state.isShowPlayer,
        songName: state.songName
    };
};

export default connect(mapStateToProps)(withRouter(Nav));