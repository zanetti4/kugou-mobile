import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, WingBlank } from 'antd-mobile';

const Item = List.Item;

class SongsList extends Component {
    render() {
        let {list} = this.props;

        let items = list.map(song => {
            return <Item key={song.hash}>{song.filename}</Item>;
        })

        return ( 
            <WingBlank size="sm">
                <List className="songsl-list">
                    {items}
                </List>
            </WingBlank>
        );
    }
}

SongsList.defaultProps = {list: []}
SongsList.propTypes = {list: PropTypes.array}
export default SongsList;