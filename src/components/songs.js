import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { ListView, WingBlank, Flex } from 'antd-mobile';
import classnames from 'classnames';
import {getRankInfo, getPlistInfo} from '../server/api';

let pageIndex = 1;

class Songs extends Component {
    constructor(props){
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });      

        this.state = {
            dataSource,
            isLoading: true
        };

        //存放歌曲
        this.list = [];
        this.curList = [];
    }

    componentDidMount() {
        pageIndex = 1;

        if(this.props.match.path === '/rank/list/:id'){
            //榜单信息页
            this.getRankListById(this.changeState);
        }else{
            //其它长列表
            this.getSongListById(this.changeState);
        }
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };      
    }

    //修改 state
    changeState = (list) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(list),
            isLoading: false
        });
    }

    //根据榜单 id 获取歌曲列表
    getRankListById = (callback, pageIndex) => {
        let {match} = this.props;
        let rankId = match.params.id;

        if(rankId){
            //rankId 不是空字符串
            getRankInfo(rankId, pageIndex).then(({data}) => {
                this.curList = data.data;
                this.list.push(...data.data);
                callback(this.list);
            });
        }
    }

    //根据 id 获取歌曲列表
    getSongListById = (callback, pageIndex) => {
        let {match} = this.props;
        let id = match.params.id;

        if(id){
            //id 不是空字符串
            getPlistInfo({
                plistId: id,
                page: pageIndex
            }).then(({data}) => {
                console.log(data);
                this.curList = data.data;
                this.list.push(...data.data);
                callback(this.list);
            });
        }
    }

    //无限加载
    onEndReached = () => {
        if(this.curList.length < 30){
            //到最后一页了
            return;
        }

        this.setState({isLoading: true});

        if(this.props.match.path === '/rank/list/:id'){
            //榜单信息页
            this.getRankListById(this.changeState, ++pageIndex);
        }else{
            //其它长列表
            this.getSongListById(this.changeState, ++pageIndex);
        }
    }

    //开始播放歌曲
    play = (hash) => {
        this.props.dispatch({
            type: 'play',
            isPlay: true,
            songList: this.list,
            hash
        });
    }

    //渲染列表
    renderList(){
        //只有榜单信息页才显示序号
        let isShowNum = this.props.match.path === '/rank/list/:id' ? true : false;
        //一行的结构
        const row = (dataRow, sectionID, rowID) => {
            let num = parseInt(rowID) + 1;
            let htmlNum = <Flex.Item className={classnames({
                'songs-lv-num': true,
                'songs-lv-three': num < 4,
                'songs-lv-runner': num === 2,
                'songs-lv-third': num === 3
            })}>{num}</Flex.Item>;

            return (
                <Flex className="songs-lv-row" onClick={() => {
                    this.play(dataRow.hash);
                }}>
                    {isShowNum ? htmlNum : null}
                    <Flex.Item className="songs-lv-name">{dataRow.filename}</Flex.Item>
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
                className="songs-lv"
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

export default connect()(withRouter(Songs));