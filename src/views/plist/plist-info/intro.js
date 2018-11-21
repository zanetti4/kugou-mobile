import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Icon } from 'antd-mobile';

class Intro extends Component {
    constructor(props){
        super(props);

        this.state = {
            height: '1.7em',
            isUnfold: false,
            arrow: 'down'
        };
    }

    //展开、收起
    upDown = () => {
        let {isUnfold} = this.state;

        if(isUnfold){
            //展开状态
            this.setState({
                height: '1.7em',
                isUnfold: false,
                arrow: 'down'
            });
        }else{
            //收起状态
            this.setState({
                height: 'auto',
                isUnfold: true,
                arrow: 'up'
            });
        }
    }

    render(){
        let {height, arrow} = this.state;

        return <Flex className="intro" align="start">
            <Flex.Item className="intro-words" style={{height}}>{this.props.intro}</Flex.Item>
            <Flex.Item className="intro-right">
                <Icon type={arrow} color="#BBB" size="xs" className="intro-arrow" onClick={this.upDown} />
            </Flex.Item>
        </Flex>;
    }
}

Intro.defaultProps = {
    intro: ''
}

Intro.propTypes = {
    intro: PropTypes.string
}

export default Intro;