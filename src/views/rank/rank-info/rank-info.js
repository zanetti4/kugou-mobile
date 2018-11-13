import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Icon } from 'antd-mobile';
import RankBanner from './rank-banner';
import Songs from '../../../components/songs';
import {getRankInfo, cancelRequest} from '../../../server/api';

class RankInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            banner: '',
            name: '',
            list: []
        };
    }

    //根据榜单 id，获取榜单信息
    getRankInfoById = (page) => {
        let {match, changeLoading} = this.props;
        let rankId = match.params.id;

        if(rankId){
            //rankId 不是空字符串
            changeLoading(true);

            getRankInfo(rankId, page).then(({data}) => {
                console.log(data);

                if(page > 1){
                    //获取下一页数据
                    let {list} = this.state;

                    list.push(...data.data);

                    this.setState({list}, () => {
                        changeLoading(false);
                    });
                }else{
                    //获取第一页数据
                    let {banner7url, rankname} = data.info;
                    let banner = banner7url.replace('{size}', 400);

                    this.setState({
                        banner,
                        name: rankname,
                        list: data.data
                    }, () => {
                        changeLoading(false);
                    });
                }
            });
        }
    }

    componentDidMount(){
        this.getRankInfoById();
    }

    componentWillUnmount(){
        cancelRequest();
    }

    render() {
        let {banner, name, list} = this.state;
        let {isLoading, mainPt} = this.props;
        let loadPt = (document.documentElement.clientHeight - mainPt - 36)/2;
        let loading = <div className="load" style={{paddingTop: `${loadPt}px`}}>
            <Icon type="loading" size="lg" />
        </div>;
        let html = <React.Fragment>
            <RankBanner banner={banner} name={name} />
            <Songs list={list} getRankInfoById={this.getRankInfoById} />
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankInfo);