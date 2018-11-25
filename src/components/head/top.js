import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import './head.css';

class Top extends Component {
    //回到新歌页
    toHome = () => {
        let {history, isShowPlayer} = this.props;

        if(!isShowPlayer){
            //没有显示大播放器
            history.push('/');
        }
    }

    //跳转到搜索页
    toSearch = () => {
        let {history, saveTitleName} = this.props;

        saveTitleName();
        Cookies.set('titleName', '搜索');
        history.push('/search');
    }

    render() {
        let logo = <img alt="logo" className="block-pic" src={require("../../assets/images/top-logo.png")} />;
        let search = <Icon type="search" onClick={this.toSearch} />;

        return (
            <NavBar
                mode="dark"
                leftContent={logo}
                rightContent={search}
                onLeftClick={this.toHome}
                className="top"
            ></NavBar>
        );
    }
}

//从 redux 获取是否显示播放器
function mapStateToProps(state){
    return {
        isShowPlayer: state.isShowPlayer
    };
};

//修改 redux 中的值
function mapDispatchToProps(dispatch){
    return {
        //保存标题
        saveTitleName(){
            dispatch({
                type: 'saveTitleName',
                titleName: '搜索'
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Top));