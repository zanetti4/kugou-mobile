import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Controller from './controller';
import Lyric from './lyric';
import {stop, getStyle} from '../../../assets/js/myFn';
import './big-player.css';

class BigPlayer extends Component {
    constructor(props){
        super(props);

        this.state = {lineH: 0};
    }

    //获取歌词行高
    getLineH = (li) => {
        let lineH = parseFloat(getStyle(li, 'height'));

        this.setState({lineH});
    }

    componentDidMount(){
        stop();
    }

    render() {
        let {img, singerName, duration, isPlaying, curTime, pausePlay, nextSong, nextLoad, prevSong, prevLoad, updateTime, lyric} = this.props;
        let reTime = /\d{2}:\d{2}\.\d{2}/g;
        let result = lyric.match(reTime);
        let top = 0;
        let {lineH} = this.state;
        let indexAc = -1; //歌词高亮位置

        if(result !== null){
            //有歌词
            let aTime = result.map(time => {
                return parseInt(time) * 60 + parseFloat(time.substring(3));
            });
    
            let index = -1; //歌词位置
            let len = aTime.length;
    
            for(let i = 0; i < len; i++){
                if(curTime < aTime[i]){
                    //没到这句
                    index = i - 1;
                    indexAc = i - 1;
                    break;
                }
            };
    
            if(index === -1){
                //当前时间大于等于最后一句的时间
                index = len - 2;
                indexAc = len - 1;
            }
    
            if(index >= 2){
                //歌词开始移动
                top = -(index-1)*lineH;
            }
        }

        let hasLyric = lyric ? <Lyric lyric={lyric} getLineH={this.getLineH} top={top} lineH={lineH} indexAc={indexAc} /> : <div className="big-mask-nol">酷狗音乐，让音乐改变世界！</div>;

        return (
            <div className="big" style={{backgroundImage: `url(${img})`}}>
                <div className="big-mask">
                    <img alt={singerName} src={img} />
                    {hasLyric}
                    <Controller duration={duration} isPlaying={isPlaying} curTime={curTime} pausePlay={pausePlay} nextSong={nextSong} nextLoad={nextLoad} prevSong={prevSong} prevLoad={prevLoad} updateTime={updateTime} />
                </div>
            </div>
        );
    }
}

BigPlayer.defaultProps = {
    img: '',
    isPlaying: false,
    duration: 0,
    singerName: '',
    curTime: 0,
    nextLoad: false,
    prevLoad: false,
    lyric: ''
}

BigPlayer.propTypes = {
    img: PropTypes.string,
    singerName: PropTypes.string,
    isPlaying: PropTypes.bool,
    nextLoad: PropTypes.bool,
    prevLoad: PropTypes.bool,
    duration: PropTypes.number,
    curTime: PropTypes.number,
    lyric: PropTypes.string
}

export default BigPlayer;