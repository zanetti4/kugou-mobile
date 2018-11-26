import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Tabs, NavBar, Icon} from 'antd-mobile';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import {topNav} from '../../route/config';
import {move} from '../../assets/js/myFn';
import './head.css';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state ={
            isInTabs: true,
            title: ''
        };
    }

    //切换选项卡
    changePage = (path, index) => {
        this.props.changePageHead(path, index);
    }

    //判断当前地址是否在顶部导航的路由中
    inTabs = (location, isShowPlayer, songName, titleName) => {
        let pathName = location.pathname;
        let len = pathName.length;

        if(pathName[len - 1] === '/' && len !== 1){
            //当前路径最后一位是/，且不是新歌页，则去掉这个/，因为顶部导航的4个路由路径最后没有/
            pathName = pathName.slice(0, -1);
        }

        let isInTabs = topNav.some(obj => {
            return obj.path === pathName;
        });
        
        this.setState({isInTabs}, () => {
            this.titleCon(isShowPlayer, songName, titleName);
        });
    }

    //title 内容
    titleCon = (isShowPlayer, songName, titleName) => {
        if(isShowPlayer){
            //显示大播放器
            this.setState({title: songName});
        }else if(!this.state.isInTabs){
            //当前地址不在顶部导航的路由中
            this.setState({title: titleName});
        }else{
            //当前地址在顶部导航的路由中
            this.setState({title: ''});
        }
    }

    //点击后退
    cancelBack = () => {
        let {showPlayer, isShowPlayer, history} = this.props;

        if(isShowPlayer){
            //显示着大播放器：隐藏大播放器并取消禁止页面滚动
            showPlayer();
            move();
        }else{
            //没有显示大播放器：后退
            history.goBack();
        }
    };

    componentDidMount(){
        let {location, isShowPlayer, songName} = this.props;
        let pathName = location.pathname;

        if(pathName === '/search' || pathName === '/search/'){
            //搜索页
            this.inTabs(location, isShowPlayer, songName, '搜索');
        }else{
            //不是搜索页
            let titleName = Cookies.get('titleName');

            this.inTabs(location, isShowPlayer, songName, titleName);
        }
    }

    componentWillReceiveProps(nextProps){
        let {location, isShowPlayer, songName, titleName} = nextProps;

        this.inTabs(location, isShowPlayer, songName, titleName);
    }

    render() {
        let {isShowPlayer, initPage, indexPage} = this.props;
        let {isInTabs, title} = this.state;
        let back = <Icon type="left" size="lg" color="#BBB" />;
        let navBar = <NavBar
            className="nav-title"
            mode="light"
            icon={back}
            onLeftClick={this.cancelBack}
        >{title}</NavBar>;
        let tabs = <Tabs 
            tabs={topNav}
            initialPage={initPage}
            page={indexPage}
            onChange={(tab, index) => {
                this.changePage(tab.path, index);
            }}
        ></Tabs>;
        let which = isShowPlayer || !isInTabs ? navBar : tabs;

        return which;
    }
}

Nav.defaultProps = {
    initPage: 0,
    indexPage: -1,
    isShowPlayer: false,
    songName: '',
    titleName: ''
}

Nav.propTypes = {
    initPage: PropTypes.number,
    indexPage: PropTypes.number,
    isShowPlayer: PropTypes.bool,
    songName: PropTypes.string,
    titleName: PropTypes.string
}

//从 redux 获取是否显示播放器
function mapStateToProps(state){
    return {
        isShowPlayer: state.isShowPlayer,
        songName: state.songName,
        titleName: state.titleName
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