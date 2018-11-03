import React, { Component } from 'react';
import Carousel from './carousel';
import Songs from '../../components/songs';
import SongsList from '../../components/songs-list';
import {getData} from '../../server/getData';

class NewSong extends Component {
    render() {
        return ( 
            <React.Fragment>
                <Carousel bannerData={this.props.data.banner} />
                {/* <Songs list={this.props.data.data} /> */}
                <SongsList list={this.props.data.data} />
            </React.Fragment>
        );
    }
}

export default getData('getNewSongData')(NewSong);