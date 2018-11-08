import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Controller from './controller';
import {stop} from '../../../assets/js/myFn';
import './big-player.css';

class BigPlayer extends Component {
    componentDidMount(){
        stop();
    }

    render() {
        let {img, singerName, duration, isPlaying, curTime, pausePlay, nextSong, nextLoad, prevSong, prevLoad, updateTime} = this.props;

        return (
            <div className="big" style={{backgroundImage: `url(${img})`}}>
                <div className="big-mask">
                    <img alt={singerName} src={img} />
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
    prevLoad: false
}

BigPlayer.propTypes = {
    img: PropTypes.string,
    singerName: PropTypes.string,
    isPlaying: PropTypes.bool,
    nextLoad: PropTypes.bool,
    prevLoad: PropTypes.bool,
    duration: PropTypes.number,
    curTime: PropTypes.number
}

export default BigPlayer;