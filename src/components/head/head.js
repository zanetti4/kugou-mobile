import React, { Component } from 'react';
import Top from './top';
import Nav from './nav';
import './head.css';

class Head extends Component {
    render() {
        return (
            <header className="head">
                <Top />
                <Nav />
            </header>
        );
    }
}

export default Head;