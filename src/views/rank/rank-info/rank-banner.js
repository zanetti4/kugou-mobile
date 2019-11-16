import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './rank-info.css';

class RankBanner extends Component {
  constructor(props) {
    super(props);
    this.state = { today: '' };
  }

  //今天日期
  getToday = () => {
    let reTime = /\//g;
    let today = new Date().toLocaleDateString().replace(reTime, '-');

    this.setState({ today });
  }

  componentDidMount() {
    this.getToday();
  }

  render() {
    let { banner, name } = this.props;

    return (
      <div className="rankb">
        <div>
          上次更新时间：{this.state.today}
        </div>
        <img src={banner} alt={name} />
      </div>
    );
  }
}

RankBanner.defaultProps = {
  banner: '',
  name: ''
}

RankBanner.propTypes = {
  banner: PropTypes.string,
  name: PropTypes.string
}

export default RankBanner;