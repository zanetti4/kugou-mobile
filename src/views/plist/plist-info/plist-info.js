import React, { Component } from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import { Icon } from 'antd-mobile';
import Intro from './intro';
import Songs from '../../../components/songs';
import {getPlistInfo} from '../../../server/api';
import './plist-info.css';

class PlistInfo extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            banner: '',
            name: '',
            intro: ''
        };
    }

    //根据歌单 id，获取歌单信息
    getPlistInfoById = () => {
        let {match, changeLoading, saveTitleName} = this.props;
        let plistId = match.params.id;

        if(plistId){
            //plistId 不是空字符串
            changeLoading(true);

            getPlistInfo({plistId}).then(({data}) => {
                let {imgurl, specialname, intro} = data.info;
                let banner = imgurl.replace('{size}', 400);

                saveTitleName(specialname);
                Cookies.set('titleName', specialname);

                this.setState({
                    banner,
                    name: specialname,
                    intro
                }, () => {
                    changeLoading(false);
                });
            });
        }
    }

    componentDidMount(){
        this.getPlistInfoById();
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        let {banner, name, intro} = this.state;
        let {isLoading, mainPt} = this.props;
        let loadPt = (document.documentElement.clientHeight - mainPt - 36)/2;
        let loading = <div className="load" style={{paddingTop: `${loadPt}px`}}>
            <Icon type="loading" size="lg" />
        </div>;
        let html = <React.Fragment>
            <div className="plisti-banner">
                <img src={banner} alt={name} />
            </div>
            <Intro intro={intro} />
            <Songs />
        </React.Fragment>;

        return isLoading ? loading : html;
    }
}

//从 redux 获取 loading 状态、页面主体的上内边距
function mapStateToProps(state){
    return {
        isLoading: state.isLoading,
        mainPt: state.mainPt
    };
};

//修改 redux 中的值
function mapDispatchToProps(dispatch){
    return {
        //隐藏 loading
        changeLoading(isLoading){
            dispatch({
                type: 'changeLoading',
                isLoading
            });
        },
        //保存 titleName
        saveTitleName(plistName){
            dispatch({
                type: 'saveTitleName',
                titleName: plistName
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlistInfo);