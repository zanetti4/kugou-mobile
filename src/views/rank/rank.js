import React, { Component } from 'react';
import {connect} from 'react-redux';
import { List, WingBlank } from 'antd-mobile';
import Cookies from 'js-cookie';
import DocumentTitle from 'react-document-title';
import {getData} from '../../server/getData';
import {isView} from '../../assets/js/myFn';
import './rank.css';

const Item = List.Item;

class Rank extends Component {
    constructor(props){
        super(props);
        this.divs = [];
        this.imgsUrl = [];

        this.fnScroll = () => {
            this.lazy(this.divs, this.imgsUrl);
        };
    }

    //进入榜单信息页
    toRankInfo = (rankId, rankName) => {
        let {history, dispatch} = this.props;

        dispatch({
            type: 'saveTitleName',
            titleName: rankName
        });

        Cookies.set('titleName', rankName);
        history.push(`/rank/list/${rankId}`);
    }

    //懒加载
    lazy = (divs, imgsUrl) => {
        for(let i = 0; i < divs.length; i++){
            let img = divs[i].querySelector('img');

            if(isView(img)){
                //该图片在可视区
                img.src = imgsUrl[i];
            }
        };
    };

    componentDidMount(){
        let {data} = this.props.data;

        this.imgsUrl = data.map(rank => {
            return rank.imgurl.replace('{size}', 400);
        });

        this.divs = document.querySelectorAll('.am-list-item');
        this.lazy(this.divs, this.imgsUrl);

        let that = this;

        window.addEventListener('scroll', that.fnScroll);
    }

    componentWillUnmount(){
        let that = this;

        window.removeEventListener('scroll', that.fnScroll);
    }

    render() {
        let {data} = this.props.data;
        let defImg = 'http://m.kugou.com/static/images/share2014/default.png';

        let html = data.map(rank => {
            let {id, rankid, rankname} = rank;

            return <Item
                key={id}
                arrow="horizontal"
                thumb={defImg}
                onClick={() => {
                    this.toRankInfo(rankid, rankname);
                }}
            >{rankname}</Item>;
        });

        let {isPlay, pageTitlePlay} = this.props;
        const defaultTitle = '排行 - 酷狗移动版';
        let title = isPlay ? pageTitlePlay : defaultTitle;

        return ( 
            <DocumentTitle title={title}>
                <WingBlank size="sm">
                    <List className="rank">{html}</List>
                </WingBlank>
            </DocumentTitle>
        );
    }
}

//从 redux 获取数据
function mapStateToProps(state){
    return {
        isPlay: state.isPlay,
        pageTitlePlay: state.pageTitlePlay
    };
};

export default connect(mapStateToProps)(getData('getRankList')(Rank));