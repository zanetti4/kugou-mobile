import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, WingBlank } from 'antd-mobile';

class Songs extends Component {
    constructor(props){
        super(props);

        console.log(this.props.list);

        /* const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            // getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2
            // sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        }); */

        this.state = {
            dataSource: this.props.list
        };
    }

    render() {
        let {list} = this.props;        
        let index = list.length - 1;

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                //没有歌曲
                index = list.length - 1;
            }

            const obj = list[index--];

            return (
                <div key={rowID} className="songs-row">{obj.filename}</div>
            );
        };

        return (
            <WingBlank size="sm">
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    /*renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}*/
                    renderRow={row}
                    className="songs-list"
                    pageSize={30}
                    scrollRenderAheadDistance={500}
                    style={{height: '400px'}}
                />
            </WingBlank>
        );
    }
}

Songs.defaultProps = {list: []}
Songs.propTypes = {list: PropTypes.array}
export default Songs;