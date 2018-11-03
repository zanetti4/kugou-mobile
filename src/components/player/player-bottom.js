import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import './player-bottom.css';

class PlayerBottom extends Component {
    render() {
        return ReactDOM.createPortal(
            <div className="playerb">
                <Flex>
                    <Flex.Item>
                        <img alt="" className="block-pic" src={require("../../assets/images/top-logo.png")} />
                    </Flex.Item>
                    <Flex.Item className="playerb-2 playerb-center">
                        <div>爱的恨的都是你爱的恨的都是你</div>
                        任妙音
                    </Flex.Item>
                    <Flex.Item className="playerb-2 playerb-right">
                        <i className="iconfont">&#xe7ea;</i><i className="iconfont">&#xe781;</i><i className="iconfont">&#xe7eb;</i>
                    </Flex.Item>
                </Flex>
            </div>,
            document.body
        );
    }
}

/* PlayerBottom.defaultProps = {list: []}
PlayerBottom.propTypes = {list: PropTypes.array} */
export default PlayerBottom;