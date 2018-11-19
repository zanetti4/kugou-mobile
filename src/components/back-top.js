import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

class BackTop extends Component {
    constructor(props){
        super(props);
        this.state = {isShow: false};
    }

    //显示、隐藏回顶部按钮
    showHide = () => {
        let scrollTop = document.documentElement.scrollTop;

        if(scrollTop > 1500){
            //加载第二页歌曲时显示
            this.setState({isShow: true});
        }else{
            this.setState({isShow: false});
        }
    }

    //回顶部
    toTop = () => {
        document.documentElement.scrollTop = 0;
    }

    componentWillMount(){
        window.addEventListener('scroll', this.showHide);
    }

    render() {
        let {isShow} = this.state;
        let icon = <Icon type="up" color="white" size="lg" className="backt" onClick={this.toTop} />;

        return isShow ? icon : null;
    }
}

export default BackTop;