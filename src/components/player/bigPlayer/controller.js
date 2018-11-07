import React, { Component } from 'react';
import { Flex, Progress } from 'antd-mobile';
import {convertSecond} from '../../../assets/js/myFn';

class Controller extends Component {
    render() {
        let {duration, isPlaying, curTime} = this.props;
        let durationCon = convertSecond(duration);
        let curTimeCon = convertSecond(curTime);

        //判断播放、暂停图标
        let iconPlayPause = () => {
            return isPlaying ? <span>&#xe783;</span> : <span>&#xe781;</span>;
        };

        return (
            <div className="controller">
                <Flex justify="between" className="controller-time">
                    <span>{curTimeCon}</span>
                    <span>{durationCon}</span>
                </Flex>
                <Progress percent={50} position="normal" className="controller-progress" />
                <div className="controller-btns">
                    <i className="iconfont">&#xe607;</i><i className="iconfont controller-btns-pp">{iconPlayPause()}</i><i className="iconfont">&#xe616;</i>
                </div>
            </div>
        );
    }
}

export default Controller;