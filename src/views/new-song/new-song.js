import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';
import Carousel from './carousel';
import Songs from '../../components/songs';
import SongsList from '../../components/songs-list';
import {getData} from '../../server/getData';

class NewSong extends Component {
    render() {
        let {isPlay, pageTitlePlay} = this.props;
        const defaultTitle = '新歌 - 酷狗移动版';
        let title = isPlay ? pageTitlePlay : defaultTitle;

        return ( 
            <DocumentTitle title={title}>
                <React.Fragment>
                    <Carousel bannerData={this.props.data.banner} />
                    {/* <Songs list={this.props.data.data} /> */}
                    <SongsList list={this.props.data.data} />
                </React.Fragment>
            </DocumentTitle>
        );
    }
}

//从 redux 获取数据
function mapStateToProps(state){
    return {
        isPlay: state.isPlay,
        pageTitlePlay: state.pageTitlePlay
    };
};

export default connect(mapStateToProps)(getData('getNewSongData')(NewSong));