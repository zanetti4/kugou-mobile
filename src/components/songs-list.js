import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, WingBlank } from 'antd-mobile';

const Item = List.Item;

class SongsList extends Component {
  /* componentWillReceiveProps(nextProps) {
    //测试 redux 中的数据是否修改成功
    let { isPlay } = nextProps;

    console.log(isPlay);
  } */

  //开始播放歌曲
  play = (hash) => {
    // console.log(this.props);

    let { list, dispatch, isPlay } = this.props;

    dispatch({
      type: 'play',
      isPlay: ++isPlay,
      songList: list,
      hash
    });
  }

  render() {
    let { list } = this.props;

    let items = list.map(song => {
      return <Item key={song.hash} onClick={() => {
        this.play(song.hash);
      }}>{song.filename}</Item>;
    });

    return (
      <WingBlank size="sm">
        <List className="songsl-list">
          {items}
        </List>
      </WingBlank>
    );
  }
}

SongsList.defaultProps = {
  list: []
}

SongsList.propTypes = {
  list: PropTypes.array
}

//从 redux 获取是否需要播放歌曲
function mapStateToProps(state) {
  // console.log(state);

  //使用 combineReducers 时，state 变成了对应的对象格式。
  /* let { play } = state;

  return {
    isPlay: play.isPlay
  }; */

  return {
    isPlay: state.isPlay
  };
};

export default connect(mapStateToProps)(SongsList);