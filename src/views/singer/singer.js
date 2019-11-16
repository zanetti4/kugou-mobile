import React, { Component } from 'react';
import { List, WingBlank } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { getData } from '../../server/getData';
import './singer.css';

const Item = List.Item;

class Singer extends Component {
  //跳转至歌手列表页
  toSingerList = (classId) => {
    this.props.history.push(`/singer/list/${classId}`);
  }

  render() {
    let { data } = this.props.data;

    let list1 = data.map(classSinger => {
      let { classid, classname } = classSinger;

      if (classid === 88) {
        //热门歌手
        return <Item
          className="singer-hot-row"
          key={classid}
          arrow="horizontal"
          onClick={() => {
            this.toSingerList(classid);
          }}
        >{classname}</Item>;
      }
    });

    let list2 = data.map(classSinger => {
      let { classid, classname } = classSinger;

      if (classid > 0 && classid < 4) {
        //华语歌手
        return <Item
          className="singer-hot-row"
          key={classid}
          arrow="horizontal"
          onClick={() => {
            this.toSingerList(classid);
          }}
        >{classname}</Item>;
      }
    });

    let list3 = data.map(classSinger => {
      let { classid, classname } = classSinger;

      if (classid > 3 && classid < 7) {
        //日韩歌手
        return <Item
          className="singer-hot-row"
          key={classid}
          arrow="horizontal"
          onClick={() => {
            this.toSingerList(classid);
          }}
        >{classname}</Item>;
      }
    });

    let list4 = data.map(classSinger => {
      let { classid, classname } = classSinger;

      if (classid > 6 && classid !== 88) {
        //欧美歌手
        return <Item
          className="singer-hot-row"
          key={classid}
          arrow="horizontal"
          onClick={() => {
            this.toSingerList(classid);
          }}
        >{classname}</Item>;
      }
    });

    let { isPlay, pageTitlePlay } = this.props;
    const defaultTitle = '歌手 - 酷狗移动版';
    let title = isPlay ? pageTitlePlay : defaultTitle;

    return (
      <DocumentTitle title={title}>
        <WingBlank size="md">
          <List className="singer-hot">{list1}</List>
          <List className="singer-hot">{list2}</List>
          <List className="singer-hot">{list3}</List>
          <List className="singer-hot">{list4}</List>
        </WingBlank>
      </DocumentTitle>
    );
  }
}

//从 redux 获取数据
function mapStateToProps(state) {
  return {
    isPlay: state.isPlay,
    pageTitlePlay: state.pageTitlePlay
  };
};

export default connect(mapStateToProps)(getData('getSingers')(Singer));