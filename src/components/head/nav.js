import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Tabs, NavBar, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import {topNav} from '../../route/config';
import {move} from '../../assets/js/myFn';
import './head.css';

class Nav extends Component {
    //切换选项卡
    changePage = (path, index) => {
        this.props.changePageHead(path, index);
    }

    render() {
        let {songName, isShowPlayer, showPlayer, initPage, indexPage} = this.props;

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
            page={indexPage}
            onChange={(tab, index) => {
                this.changePage(tab.path, index);
            }}
        ></Tabs>;
        let which = isShowPlayer ? navBar : tabs;

        return which;
    }
}

Nav.defaultProps = {
    initPage: 0,
    indexPage: -1
}

Nav.propTypes = {
    initPage: PropTypes.number,
    indexPage: PropTypes.number
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);