import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import classnames from 'classnames';
import {getSongInfo, getLyric} from '../../server/api';
import BigPlayer from './bigPlayer/big-player';
import './player-bottom.css';

class PlayerBottom extends Component {
    constructor(props){
        super(props);

        this.state = {
            index: -1, //播放歌曲所在位置
            isPlaying: false, //是否正在播放
            songInfo: {}, //播放的歌曲信息
            prevLoad: false, //载入上一首歌
            nextLoad: false, //载入下一首歌
            currentTime: 0, //当前播放时间
            lyric: '' //歌词
        };

        this.audio = React.createRef();
    }

    //通过 hash 发请求，获取歌曲信息
    getSongInfoByHash = (hash, isShowPlayer = false) => {
        let index = this.props.songList.findIndex(song => song.hash === hash);

        if(hash){
            //hash 不是空字符串
            getSongInfo(hash).then(({data}) => {
                let {songList, saveSongName, play} = this.props;

                play(songList);
                saveSongName(data.songName);

                this.setState({
                    isPlaying: true,
                    songInfo: data,
                    index,
                    prevLoad: false,
                    nextLoad: false
                });
            });
        }

        if(isShowPlayer){
            //显示大播放器
            let {fileName, timeLength} = this.state.songInfo;

            getLyric({
                hash,
                keyword: fileName,
                timelength: timeLength*1000
            }).then(({data}) => {
                this.setState({lyric: data});
            });
        }
    }

    //暂停、播放
    pausePlay = () => {
        let audioPlayer = this.audio.current;

        if(this.state.isPlaying){
            //正在播放，需要暂停
            audioPlayer.pause();
        }else{
            //暂停状态，需要播放
            audioPlayer.play();
        }

        this.setState({isPlaying: !this.state.isPlaying});
    }

    //下一首
    nextSong = () => {
        this.setState({nextLoad: true});

        let nextIndex = -1;
        let {index} = this.state;
        let {songList, isShowPlayer} = this.props;

        if(index === songList.length - 1){
            //当前播放的是最后一首
            nextIndex = 0;
        }else{
            //当前播放的不是最后一首
            nextIndex = ++index;
        }

        let nextHash = songList[nextIndex].hash;

        this.getSongInfoByHash(nextHash, isShowPlayer);
    }

    //上一首
    prevSong = () => {
        this.setState({prevLoad: true});

        let prevIndex = -1;
        let {index} = this.state;
        let {songList, isShowPlayer} = this.props;

        if(index === 0){
            //当前播放的是第一首
            prevIndex = songList.length - 1;
        }else{
            //当前播放的不是第一首
            prevIndex = --index;
        }

        let prevHash = songList[prevIndex].hash;

        this.getSongInfoByHash(prevHash, isShowPlayer);
    }

    //获取歌曲当前时间
    getCurTime = () => {
        let audioPlayer = this.audio.current;

        this.setState({currentTime: audioPlayer.currentTime});
    }

    //更新歌曲当前时间
    updateTime = (time) => {
        let audioPlayer = this.audio.current;

        audioPlayer.currentTime = time;
        this.setState({currentTime: time});
    }

    componentDidMount(){
        let {hash} = this.props;

        this.getSongInfoByHash(hash);
    }

    componentWillReceiveProps(nextProps){
        //点击另一首歌时，执行这里
        let {hash, isShowPlayer} = nextProps;

        this.getSongInfoByHash(hash, isShowPlayer);
    }

    render() {
        let {isShowPlayer, showPlayer} = this.props;
        let {songInfo, isPlaying, prevLoad, nextLoad, currentTime, lyric} = this.state;

        //处理图片
        let dealImg = () => {
            return songInfo.imgUrl && songInfo.imgUrl.replace('{size}', 240);
        };

        //判断播放、暂停图标
        let iconPlayPause = () => {
            return isPlaying ? <span>&#xe783;</span> : <span>&#xe781;</span>;
        };

        //判断上一首图标
        let iconPrev = () => {
            return prevLoad ? <span>&#xe788;</span> : <span>&#xe7ea;</span>;
        };

        //判断下一首图标
        let iconNext = () => {
            return nextLoad ? <span>&#xe788;</span> : <span>&#xe7eb;</span>;
        };
        
        let showPlayerLyric = isShowPlayer && lyric;
        let isShowPlayerBot = this.state.songInfo.hash
        ? <React.Fragment>
            <div className="playerb">
                <audio src={songInfo.url} autoPlay ref={this.audio} onEnded={this.nextSong} onTimeUpdate={this.getCurTime}></audio>
                <Flex>
                    <Flex.Item onClick={() => {
                        showPlayer();
                    }}>
                        <img alt={songInfo.singerName} className="block-pic playerb-avatar" src={dealImg()} />
                    </Flex.Item>
                    <Flex.Item className="playerb-2 playerb-center" onClick={() => {
                        showPlayer();
                    }}>
                        <div>{songInfo.songName}</div>
                        {songInfo.singerName}
                    </Flex.Item>
                    <Flex.Item className="playerb-2 playerb-right">
                        <i className={classnames({
                            iconfont: true,
                            'playerb-right-load': prevLoad
                        })} onClick={this.prevSong}>{iconPrev()}</i><i className="iconfont" onClick={this.pausePlay}>{iconPlayPause()}</i><i className={classnames({
                            iconfont: true,
                            'playerb-right-load': nextLoad
                        })} onClick={this.nextSong}>{iconNext()}</i>
                    </Flex.Item>
                </Flex>
            </div>
            {showPlayerLyric ? <BigPlayer img={dealImg()} isPlaying={isPlaying} duration={songInfo.timeLength} singerName={songInfo.singerName} curTime={currentTime} pausePlay={this.pausePlay} nextSong={this.nextSong} nextLoad={nextLoad} prevSong={this.prevSong} prevLoad={prevLoad} updateTime={this.updateTime} lyric={lyric} /> : null}
        </React.Fragment>
        : null;

        return ReactDOM.createPortal(
            isShowPlayerBot,
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
        songList: state.songList,
        isShowPlayer: state.isShowPlayer
    };
};

//修改 redux 中的值
function mapDispatchToProps(dispatch){
    return {
        //显示大播放器
        showPlayer(){
            dispatch({
                type: 'showPlayer',
                isShowPlayer: true
            });
        },
        //把歌名存在 redux 中
        saveSongName(songName){
            dispatch({
                type: 'saveSongName',
                songName
            });
        },
        //把 redux 中的 hash 清掉，否则再点击首次播放的歌曲时，props 没有改变就不执行 componentWillReceiveProps
        play(songList){
            dispatch({
                type: 'play',
                isPlay: true,
                hash: '',
                songList
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBottom);