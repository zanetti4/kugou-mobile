import React, { Component } from 'react';
import { Flex, Progress } from 'antd-mobile';
import classnames from 'classnames';
import {convertSecond} from '../../../assets/js/myFn';

class Controller extends Component {
    componentDidMount(){
        let progress = document.querySelector('.controller-progress');

        progress.addEventListener('touchstart', e => {
            let touchX = e.changedTouches[0].clientX;
            let disX = progress.getBoundingClientRect().left;
            let {duration, updateTime} = this.props;
            let newTime = (touchX - disX)/progress.clientWidth*duration;

            updateTime(newTime);
        })
    }

    render() {
        let {duration, isPlaying, curTime, pausePlay, nextSong, nextLoad, prevSong, prevLoad} = this.props;
        let durationCon = convertSecond(duration);
        let curTimeCon = convertSecond(curTime);

        //判断播放、暂停图标
        let iconPlayPause = () => {
            return isPlaying ? <span>&#xe783;</span> : <span>&#xe781;</span>;
        };

        //判断下一首图标
        let iconNext = () => {
            return nextLoad ? <span>&#xe788;</span> : <span>&#xe616;</span>;
        };

        //判断上一首图标
        let iconPrev = () => {
            return prevLoad ? <span>&#xe788;</span> : <span>&#xe607;</span>;
        };

        let curProgress = curTime/duration*100;

        return (
            <div className="controller">
                <Flex justify="between" className="controller-time">
                    <span>{curTimeCon}</span>
                    <span>{durationCon}</span>
                </Flex>
                <Progress percent={curProgress} position="normal" className="controller-progress" />
                <div className="controller-btns">
                    <i className={classnames({
                        iconfont: true,
                        'playerb-right-load': prevLoad
                    })} onClick={prevSong}>{iconPrev()}</i><i className="iconfont controller-btns-pp" onClick={pausePlay}>{iconPlayPause()}</i><i className={classnames({
                        iconfont: true,
                        'playerb-right-load': nextLoad
                    })} onClick={nextSong}>{iconNext()}</i>
                </div>
            </div>
        );
    }
}

export default Controller;