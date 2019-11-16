import React, { Component } from 'react';
import classnames from 'classnames';

class Lyric extends Component {
  constructor(props) {
    super(props);
    this.ul = React.createRef();
  }

  //获取歌词行高
  getLineHL = () => {
    this.props.getLineH(this.ul.current.firstElementChild);
  }

  componentDidMount() {
    this.getLineHL();
  }

  render() {
    let { lyric, top, lineH, indexAc } = this.props;
    let time = /\[.+\]/g;
    let aLyric = lyric.split(time).slice(1);

    aLyric = aLyric.map(str => {
      return str.slice(0, -1);
    });

    let lis = aLyric.map((sentence, index) => {
      return <li key={index} className={classnames({ 'lyric-active': index === indexAc })}>{sentence}</li>;
    });

    let heightL = lineH * 3;

    return (
      <div className="lyric" style={{ height: `${heightL}px` }}>
        <ul ref={this.ul} style={{ top: `${top}px` }}>{lis}</ul>
      </div>
    );
  }
}

export default Lyric;