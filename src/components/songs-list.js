import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { List, WingBlank } from 'antd-mobile';
import classnames from 'classnames';

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

        let {isPlay} = this.props;

        return ( 
            <WingBlank size="sm">
                <List className={classnames({
                    'songsl-list': true,
                    'songsl-lpb': isPlay
                })}>
                    {items}
                </List>
            </WingBlank>
        );
    }
}

SongsList.defaultProps = {
    list: [],
    isPlay: false
}

SongsList.propTypes = {
    list: PropTypes.array,
    isPlay: PropTypes.bool
}

//从 redux 获取是否需要播放歌曲
function mapStateToProps(state){
    return {
        isPlay: state.isPlay
    };
};

export default connect(mapStateToProps)(SongsList);