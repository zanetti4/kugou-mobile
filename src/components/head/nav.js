import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Tabs, NavBar, Icon} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {topNav} from '../../route/config';
import {move} from '../../assets/js/myFn';
import './head.css';

class Nav extends Component {
    render() {
        let {songName, isShowPlayer, history, location, showPlayer} = this.props;
        let initPage = 0;
        //如果当前在除了新歌的顶部一级路由，刷新页面后依然停留在这儿。
        let index = topNav.findIndex(obj => {
            return obj.path === location.pathname;
        });

        if(index !== -1){
            //当前在顶部一级路由
            initPage = index;
        }

        //隐藏大播放器并取消禁止页面滚动
        let cancelPlayer = () => {
            showPlayer();
            move();
        };

        let back = <Icon type="left" size="lg" color="#BBB" />;
        let navBar = <NavBar
            className="nav-title"
            mode="light"
            icon={back}
            onLeftClick={cancelPlayer}
        >{songName}</NavBar>;
        let tabs = <Tabs 
            tabs={topNav}
            initialPage={initPage}
            onChange={tab => {
                history.push(tab.path);
            }}
        ></Tabs>;
        let which = isShowPlayer ? navBar : tabs;

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

//修改 redux 中的值
function mapDispatchToProps(dispatch){
    return {
        //隐藏大播放器
        showPlayer(){
            dispatch({
                type: 'showPlayer',
                isShowPlayer: false
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));