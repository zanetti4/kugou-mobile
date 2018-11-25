import React, { Component } from 'react';
import { List, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';

const Item = List.Item;

class HotList extends Component {
    render() {
        let {list} = this.props;
        console.log(list);

        let items = list.map((hotWord, index) => {
            return <Item key={index} onClick={() => {}}>{hotWord.keyword}</Item>;
        });

        return (
            <React.Fragment>
                <h4 className="hotl-tit">最近热门</h4>
                <WingBlank size="sm">
                    <List className="songsl-list">
                        {items}
                    </List>
                </WingBlank>
            </React.Fragment>
        );
    }
}

HotList.defaultProps = {
    list: []
}

HotList.propTypes = {
    list: PropTypes.array
}

export default HotList;