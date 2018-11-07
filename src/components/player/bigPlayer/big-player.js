import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Controller from './controller';
import './big-player.css';

class BigPlayer extends Component {
    render() {
        let {img, singerName, duration, isPlaying, curTime} = this.props;

        return (
            <div className="big" style={{backgroundImage: `url(${img})`}}>
                <div className="big-mask">
                    <img alt={singerName} src={img} />
                    <Controller duration={duration} isPlaying={isPlaying} curTime={curTime} />
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
    curTime: 0
}

BigPlayer.propTypes = {
    img: PropTypes.string,
    singerName: PropTypes.string,
    isPlaying: PropTypes.bool,
    duration: PropTypes.number,
    curTime: PropTypes.number
}

export default BigPlayer;