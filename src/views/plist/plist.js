import React, { Component } from 'react';
import { ListView, WingBlank, Flex, Icon } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {getPlist} from '../../server/api';
import {isView} from '../../assets/js/myFn';
import './plist.css';

let pageIndex = 1;

class Plist extends Component {
    constructor(props){
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });      

        this.state = {
            dataSource,
            isLoading: true
        };

        //存放歌单
        this.list = [];
        this.curList = [];
        this.imgsUrl = [];
    }

    componentWillMount(){
        window.addEventListener('scroll', () => {
            this.lazy(this.imgsUrl);
        });
    }

    componentDidMount() {
        pageIndex = 1;
        this.getPlistData(this.changeState);
    }

    componentWillUnmount(){
        let that = this;

        window.removeEventListener('scroll', that.lazy);

        this.setState = (state,callback)=>{
            return;
        };      
    }

    //懒加载
    lazy = (aImgs) => {
        //只循环当前页的歌单，只有第一页是35条，以后都是30条。
        let start = 0;

        if(pageIndex > 1){
            //当前不是第一页
            start = 35 + (pageIndex - 2) * 30;
        }
        //每次都获取最新的歌单列表
        let divs = document.querySelectorAll('.am-flexbox.plist-row');

        for(let i = start; i < divs.length; i++){
            let img = divs[i].querySelector('img');

            if(isView(img)){
                //该图片在可视区
                img.src = aImgs[i - start];
            }
        };

        console.log(4444)
    };

    //修改 state
    changeState = (list) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(list),
            isLoading: false
        }, () => {
            this.imgsUrl = this.curList.map(special => {
                return special.imgurl.replace('{size}', 400);
            });

            this.lazy(this.imgsUrl);
        });
    }

    //获取歌单列表
    getPlistData = (callback, pageIndex) => {
        getPlist(pageIndex).then(({data}) => {
            // console.log(data.data);
            this.curList = data.data;
            this.list.push(...data.data);
            callback(this.list);
        });
    }

    //无限加载
    onEndReached = () => {
        if(this.curList.length < 30){
            //到最后一页了
            return;
        }

        this.setState({isLoading: true});
        this.getPlistData(this.changeState, ++pageIndex);
    }

    //跳转至歌单信息页
    toPlistInfo = (plistId) => {
        this.props.history.push(`/plist/list/${plistId}`);
    }

    //渲染列表
    renderList(){
        //一行的结构
        const row = (dataRow, sectionID, rowID) => {
            return (
                <Flex className="plist-row" onClick={() => {
                    this.toPlistInfo(dataRow.specialid);
                }}>
                    <Flex.Item className="plist-left">
                        <img src="http://m.kugou.com/static/images/share2014/default.png" alt={dataRow.specialname} />
                    </Flex.Item>
                    <Flex.Item className="plist-cen">
                        {dataRow.specialname}
                        <div>
                            <i className="iconfont">&#xe869;</i> {dataRow.playcount}
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <Icon type="right" color="#DDD" />
                    </Flex.Item>
                </Flex>
            );
        };

        let {isLoading, dataSource} = this.state;
        //长列表页脚
        let foot = () => {
            return isLoading ? '加载中……' : '木有了……';
        };

        return (
            <ListView
                className="plist"
                dataSource={dataSource} // 渲染的数据源
                renderFooter={foot}
                renderRow={row} // 单条数据
                pageSize={4} // 每次渲染的行数
                useBodyScroll
                scrollRenderAheadDistance={500} // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                scrollEventThrottle={20} // 控制在滚动过程中，scroll事件被调用的频率
                onEndReachedThreshold={10} // 调用onEndReached之前的临界值，单位是像素
                onEndReached={this.onEndReached} // 上拉加载事件
            />
        );      
    }

    render(){
        return <WingBlank size="sm">
            {this.renderList()}
        </WingBlank>;
    }
}

export default withRouter(Plist);