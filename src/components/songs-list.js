import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { List, WingBlank } from 'antd-mobile';

const Item = List.Item;

class SongsList extends Component {
    //开始播放歌曲
    play = (hash) => {
        let {list} = this.props;

        this.props.dispatch({
            type: 'play',
            isPlay: true,
            songList: list,
            hash
        });
    }

    render() {
        let {list} = this.props;

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

export default connect()(SongsList);