import React, { Component } from 'react';
import { List, WingBlank } from 'antd-mobile';
import {getData} from '../../server/getData';
import {isView} from '../../assets/js/myFn';
import './rank.css';

const Item = List.Item;

class Rank extends Component {
    //进入榜单信息页
    toRankInfo = (rankId) => {
        this.props.history.push(`/rank/list/${rankId}`);
    }

    componentDidMount(){
        let {data} = this.props.data;

        let imgsUrl = data.map(rank => {
            return rank.imgurl.replace('{size}', 400);
        });

        let divs = document.querySelectorAll('.am-list-item');
        //懒加载
        let lazy = () => {
            for(var i = 0; i < divs.length; i++){
                let img = divs[i].querySelector('img');
    
                if(isView(img)){
                    //该图片在可视区
                    img.src = imgsUrl[i];
                }
            };
        };

        lazy();

        window.onscroll = () => {
            lazy();
        };
    }

    render() {
        console.log(this.props.data.data);

        let {data} = this.props.data;
        let defImg = 'http://m.kugou.com/static/images/share2014/default.png';

        let html = data.map(rank => {
            return <Item
                key={rank.id}
                arrow="horizontal"
                thumb={defImg}
                onClick={() => {
                    this.toRankInfo(rank.rankid);
                }}
            >{rank.rankname}</Item>;
        });

        return ( 
            <WingBlank size="sm">
                <List className="rank">{html}</List>
            </WingBlank>
        );
    }
}

export default getData('getRankList')(Rank);