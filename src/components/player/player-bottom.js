import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import {getSongInfo} from '../../server/api';
import './player-bottom.css';

class PlayerBottom extends Component {
    constructor(props){
        super(props);

        this.state = {
            index: -1, //播放歌曲所在位置
            isPlaying: false, //是否正在播放
            songInfo: {} //播放的歌曲信息
        };
    }

    //通过 hash 发请求，获取歌曲信息
    getSongInfoByHash = (hash) => {
        let index = this.props.songList.findIndex(song => song.hash === hash);

        if(hash){
            //hash 不是空字符串
            getSongInfo(hash).then(({data}) => {
                this.setState({
                    isPlaying: true,
                    songInfo: data,
                    index
                });
            });
        }
    }

    componentDidMount(){
        let {hash} = this.props;

        this.getSongInfoByHash(hash);
    }

    componentWillReceiveProps(nextProps){
        //点击另一首歌时，执行这里
        let {hash} = nextProps;

        this.getSongInfoByHash(hash);
    }

    render() {
        let {hash, songList} = this.props;

        console.log(hash);
        console.log(songList);
        console.log(this.state.songInfo);

        let {songInfo, isPlaying} = this.state;

        //处理图片
        let dealImg = () => {
            return songInfo.imgUrl && songInfo.imgUrl.replace('{size}', 240);
        };

        //处理歌名
        let dealSongName = () => {
            let song = songList.find(song => {
                return song.hash === hash;
            });

            if(song){
                //在歌曲列表中找到这首歌
                return song.filename;
            }else{
                //在歌曲列表中没有找到这首歌
                return '';
            }
        };

        //判断播放、暂停图标
        let iconPlayPause = () => {
            return isPlaying ? '&#xe783;' : '&#xe781;';
        };

        return ReactDOM.createPortal(
            <div className="playerb">
                <Flex>
                    <Flex.Item>
                        <img alt={songInfo.singerName} className="block-pic" src={dealImg()} />
                    </Flex.Item>
                    <Flex.Item className="playerb-2 playerb-center">
                        <div>{dealSongName()}</div>
                        {songInfo.singerName}
                    </Flex.Item>
                    <Flex.Item className="playerb-2 playerb-right">
                        <i className="iconfont">&#xe7ea;</i><i className="iconfont">{iconPlayPause()}</i><i className="iconfont">&#xe7eb;</i>
                    </Flex.Item>
                </Flex>
            </div>,
            document.body
        );
    }
}

PlayerBottom.defaultProps = {
    songList: [],
    hash: ''
}

PlayerBottom.propTypes = {
    songList: PropTypes.array,
    hash: PropTypes.string
}

//从 redux 获取是否需要播放歌曲
function mapStateToProps(state){
    return {
        hash: state.hash,
        songList: state.songList
    };
};

export default connect(mapStateToProps)(PlayerBottom);