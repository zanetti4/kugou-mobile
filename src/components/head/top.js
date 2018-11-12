import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './head.css';

class Top extends Component {
    toHome = () => {
        let {history, isShowPlayer} = this.props;

        if(!isShowPlayer){
            //没有显示大播放器
            history.push('/');
        }
    }

    render() {
        let logo = <img alt="logo" className="block-pic" src={require("../../assets/images/top-logo.png")} />;
        let search = <Icon type="search" />;

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

export default connect(mapStateToProps)(withRouter(Top));