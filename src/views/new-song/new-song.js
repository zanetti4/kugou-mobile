import React, { Component } from 'react';
import Carousel from './carousel';
import {getData} from '../../server/getData';

class NewSong extends Component {
    render() {
        console.log(this.props.data);

        return ( 
            <Carousel bannerData={this.props.data.banner} />
        );
    }
}

export default getData('getNewSongData')(NewSong);