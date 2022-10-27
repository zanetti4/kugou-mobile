import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Icon } from 'antd-mobile';
import DocumentTitle from 'react-document-title';
import Intro from '../../../components/intro';
import Songs from '../../../components/songs';
import { getSingerInfo } from '../../../server/api';

class SingerInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banner: '',
      name: '',
      intro: ''
    };
  }

  //根据歌手 id，获取歌手信息
  getSingerInfoById = () => {
    let { match, changeLoading, saveTitleName } = this.props;
    let singerId = match.params.id;

    if (singerId) {
      //singerId 不是空字符串
      changeLoading(true);

      getSingerInfo({ 
        singerId,
        page: 1,
      }).then(({ data }) => {
        let { imgurl, singername, intro } = data.info;
        let banner = imgurl.replace('{size}', 400);

        saveTitleName(singername);
        Cookies.set('titleName', singername);

        this.setState({
          banner,
          name: singername,
          intro
        }, () => {
          changeLoading(false);
        });
      });
    }
  }

  componentDidMount() {
    this.getSingerInfoById();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    let { banner, name, intro } = this.state;
    let { isLoading, mainPt } = this.props;
    let loadPt = (document.documentElement.clientHeight - mainPt - 36) / 2;
    let loading = <div className="load" style={{ paddingTop: `${loadPt}px` }}>
      <Icon type="loading" size="lg" />
    </div>;
    let html = <React.Fragment>
      <div className="plisti-banner">
        <img src={banner} alt={name} />
      </div>
      <Intro intro={intro} />
      <Songs />
    </React.Fragment>;
    let show = isLoading ? loading : html;
    let { isPlay, pageTitlePlay } = this.props;
    let defaultTitle = `${name} - 酷狗移动版`;
    let title = isPlay ? pageTitlePlay : defaultTitle;

    return <DocumentTitle title={title}>{show}</DocumentTitle>;
  }
}

//从 redux 获取 loading 状态、页面主体的上内边距、是否显示底部播放器、播放音乐时的页面标题
function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    mainPt: state.mainPt,
    isPlay: state.isPlay,
    pageTitlePlay: state.pageTitlePlay
  };
};

//修改 redux 中的值
function mapDispatchToProps(dispatch) {
  return {
    //隐藏 loading
    changeLoading(isLoading) {
      dispatch({
        type: 'changeLoading',
        isLoading
      });
    },
    //保存 titleName
    saveTitleName(singerName) {
      dispatch({
        type: 'saveTitleName',
        titleName: singerName
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingerInfo);