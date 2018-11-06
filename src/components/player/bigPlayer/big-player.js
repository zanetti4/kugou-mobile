import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './big-player.css';

class BigPlayer extends Component {
    render() {
        return (
            <div className="big">
                <div className="big-mask"></div>
            </div>
        );
    }
}

BigPlayer.defaultProps = {
}

BigPlayer.propTypes = {
}

export default BigPlayer;