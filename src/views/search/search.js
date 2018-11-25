import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import {connect} from 'react-redux';
import HotList from './hot-list';
import { SearchBar, ListView, WingBlank, Icon } from 'antd-mobile';
import './search.css';

let pageIndex = 1;

class Search extends Component {
    constructor(props){
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            hotWords: [],
            value: '',
            isShowHot: true,
            total: 0,
            dataSource,
            isLoading: true,
            keyword: ''
        };

        //存放歌曲
        this.list = [];
        this.curList = [];
    }

    componentDidMount(){
        let {changeLoading} = this.props;

        changeLoading(true);

        let that = this;

        fetchJsonp('http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30')
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            // console.log('parsed json', json);
            that.setState({hotWords: json.data.info}, () => {
                changeLoading(false);
            });
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };

        this.props.judgeResult(true);
    }

    //修改 value
    onChange = (value) => {
        this.setState({ value });
    }

    //搜索
    onSubmit = () => {
        let txt = this.state.value.trim();

        if(txt === ''){
            //无输入内容
            alert('关键字不能为空');
            return;
        }

        txt = encodeURIComponent(txt);

        this.setState({
            isShowHot: false,
            keyword: txt
        });

        this.props.changeLoading(true);
        this.getResult(this.changeState, 1, txt);
    }

    //获取搜索数据
    getResult = (callback, pageIndex, txt) => {
        let that = this;

        fetchJsonp(`http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${txt}&page=${pageIndex}&pagesize=30&showtype=1`)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log('parsed json', json);
            that.setState({total: json.data.total});

            let hasResult = json.data.total ? true : false;
            let {judgeResult, changeLoading} = that.props;

            judgeResult(hasResult);
            that.curList = json.data.info;

            if(pageIndex === 1){
                //新的搜索
                that.list = json.data.info;
            }else{
                //无限加载
                that.list.push(...json.data.info);
            }
            
            callback(that.list);
            changeLoading(false);
        }).catch(function(ex) {
            console.log('parsing failed', ex);
        });
    }

    //修改 state
    changeState = (list) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(list),
            isLoading: false
        });
    }

    //无限加载
    onEndReached = () => {
        if(this.curList.length < 30){
            //到最后一页了
            return;
        }

        this.setState({isLoading: true});
        this.getResult(this.changeState, ++pageIndex, this.state.keyword);
    }

    //渲染列表
    renderList(){
        //一行的结构
        const row = (dataRow, sectionID, rowID) => {
            return (
                <div className="songs-lv-row">{dataRow.filename}</div>
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

    render() {
        let {value, isShowHot, hotWords, total} = this.state;
        let {isLoading, mainPt} = this.props;
        let loadPt = (document.documentElement.clientHeight - mainPt - 36)/2;
        let loading = <div className="load" style={{paddingTop: `${loadPt}px`}}>
            <Icon type="loading" size="lg" />
        </div>;
        let noResult = <div className="search-no">
            <img alt="empty" src={require("../../assets/images/search-empty.png")} /><br />
            没有搜索到相关内容
        </div>;
        let result = total ? <React.Fragment>
            <div className="search-num">共有{total}条结果</div>
            <WingBlank size="sm">
                {this.renderList()}
            </WingBlank>
        </React.Fragment> : noResult;
        let hotList = isShowHot ? <HotList list={hotWords} /> : result;
        let content = isLoading ? loading : hotList;

        return (
            <React.Fragment>
                <SearchBar 
                    className="search-bar"
                    placeholder="歌手/歌名/拼音"
                    value={value}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
                {content}
            </React.Fragment>
        );
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
        //判断是否有搜索内容
        judgeResult(hasResult){
            dispatch({
                type: 'judgeResult',
                hasResult
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);