import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import './head.css';

class Top extends Component {
    toHome = () => {
        this.props.history.push('/');
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

export default withRouter(Top);