import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, WingBlank, Flex, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import DocumentTitle from 'react-document-title';
import { getSingerList } from '../../../server/api';
import { isView } from '../../../assets/js/myFn';
import './singer-list.css';

let pageIndex = 1;

class SingerList extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true
    };

    //存放歌手
    this.list = [];
    this.curList = [];
    this.imgsUrl = [];
    //滚动鼠标时绑定的函数
    this.fnScroll = () => {
      this.lazy(this.imgsUrl);
    };

    this.total = null;
    this.listClass = '';
  }

  componentWillMount() {
    let that = this;

    window.addEventListener('scroll', that.fnScroll);
  }

  componentDidMount() {
    pageIndex = 1;
    this.getSingerListData(this.changeState);
  }

  componentWillUnmount() {
    let that = this;

    window.removeEventListener('scroll', that.fnScroll);

    this.setState = (state, callback) => {
      return;
    };
  }

  //懒加载
  lazy = (aImgs) => {
    //只循环当前页的歌手，每页30条。
    let start = (pageIndex - 1) * 30;

    //每次都获取最新的歌单列表
    let divs = document.querySelectorAll('.singerl-row');

    for (let i = start; i < divs.length; i++) {
      let img = divs[i].querySelector('img');

      if (isView(img)) {
        //该图片在可视区
        img.src = aImgs[i - start];
      }
    };
  };

  //修改 state
  changeState = (list) => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(list),
      isLoading: false
    }, () => {
      this.imgsUrl = this.curList.map(singer => {
        return singer.imgurl.replace('{size}', 400);
      });

      this.lazy(this.imgsUrl);
    });
  }

  //获取歌手列表
  getSingerListData = (callback, pageIndex) => {
    let { match, dispatch } = this.props;
    let classid = match.params.id;

    if (classid) {
      //classid 不是空字符串
      getSingerList({
        classid,
        page: pageIndex
      }).then(({ data }) => {
        // console.log(data);
        this.total = data.total;
        this.curList = data.data;
        this.list.push(...data.data);
        this.listClass = data.classname;

        dispatch({
          type: 'saveTitleName',
          titleName: data.classname
        });

        Cookies.set('titleName', data.classname);
        callback(this.list);
      });
    }
  }

  //无限加载
  onEndReached = () => {
    if (this.curList.length < 30) {
      //到最后一页了
      return;
    }

    this.setState({ isLoading: true });
    this.getSingerListData(this.changeState, ++pageIndex);
  }

  //跳转至歌手信息页
  toSingerInfo = (singerId) => {
    this.props.history.push(`/singer/info/${singerId}`);
  }

  //渲染列表
  renderList() {
    //一行的结构
    const row = (dataRow, sectionID, rowID) => {
      return (
        <Flex className="singerl-row" onClick={() => {
          this.toSingerInfo(dataRow.singerid);
        }}>
          <Flex.Item className="singerl-left">
            <img src="http://m.kugou.com/static/images/share2014/default.png" alt={dataRow.singername} />
          </Flex.Item>
          <Flex.Item className="singerl-cen">{dataRow.singername}</Flex.Item>
          <Flex.Item>
            <Icon type="right" color="#DDD" />
          </Flex.Item>
        </Flex>
      );
    };

    let { isLoading, dataSource } = this.state;
    //长列表页脚
    let foot = () => {
      return isLoading ? '加载中……' : '木有了……';
    };

    let hasInfiniteLoad = this.total ? null : this.onEndReached;

    return (
      <ListView
        className="singerl"
        dataSource={dataSource} // 渲染的数据源
        renderFooter={foot}
        renderRow={row} // 单条数据
        pageSize={4} // 每次渲染的行数
        useBodyScroll
        scrollRenderAheadDistance={500} // 当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
        scrollEventThrottle={20} // 控制在滚动过程中，scroll事件被调用的频率
        onEndReachedThreshold={10} // 调用onEndReached之前的临界值，单位是像素
        onEndReached={hasInfiniteLoad} // 上拉加载事件
      />
    );
  }

  render() {
    let { isPlay, pageTitlePlay } = this.props;
    let defaultTitle = `${this.listClass} - 酷狗移动版`;
    let title = isPlay ? pageTitlePlay : defaultTitle;

    return <DocumentTitle title={title}>
      <WingBlank size="sm">
        {this.renderList()}
      </WingBlank>
    </DocumentTitle>;
  }
}

//从 redux 获取数据
function mapStateToProps(state) {
  return {
    isPlay: state.isPlay,
    pageTitlePlay: state.pageTitlePlay
  };
};

export default connect(mapStateToProps)(withRouter(SingerList));