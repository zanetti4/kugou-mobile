import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { List, WingBlank } from 'antd-mobile';

const Item = List.Item;

class SongsList extends Component {
    //开始播放歌曲
    play = (hash) => {
        let {list, dispatch, isPlay} = this.props;

        dispatch({
            type: 'play',
            isPlay: ++isPlay,
            songList: list,
            hash
        });
    }

    render() {
        let {list} = this.props;
        // console.log(list);

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
function mapStateToProps(state){
    return {
        isPlay: state.isPlay
    };
};

export default connect(mapStateToProps)(SongsList);