import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, WingBlank, Flex } from 'antd-mobile';
import classnames from 'classnames';

class Songs extends Component {
    constructor(props){
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });      

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            isLoading: true,
            page: 1
        };
    }

    componentDidMount() {
        this.changeState(this.props.list);
    }

    componentWillReceiveProps(nextProps){
        this.changeState(nextProps.list);
    }

    //修改 state
    changeState = (list) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(list),
            isLoading: false
        });
    }

    //获取下一页内容
    getNext = () => {
        let {page} = this.state;

        this.setState({
            page: ++page
        }, () => {
            this.setState({isLoading: true});
            this.props.getRankInfoById(page);
        });
    }

    //渲染列表
    renderList(){
        //一行的结构
        const row = (dataRow, sectionID, rowID) => {
            let num = parseInt(rowID) + 1;

            return (
                <Flex className="songs-lv-row">
                    <Flex.Item className={classnames({
                        'songs-lv-num': true,
                        'songs-lv-three': num < 4,
                        'songs-lv-runner': num === 2,
                        'songs-lv-third': num === 3
                    })}>{num}</Flex.Item>
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
                // onEndReached={this.getNext} // 上拉加载事件
            />
        );      
    }

    render(){
        return <WingBlank size="sm">
            {this.renderList()}
        </WingBlank>;
    }
}

Songs.defaultProps = {list: []}
Songs.propTypes = {list: PropTypes.array}
export default Songs;