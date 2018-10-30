import React, { Component } from 'react';
import {getData} from '../../server/getData';

class NewSong extends Component {
    render() {
        console.log(this.props.data);

        return ( 
            <h1>新歌</h1>
        );
    }
}

export default getData('getNewSongData')(NewSong);