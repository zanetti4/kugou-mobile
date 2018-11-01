import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import './new-song.css';

class CarouselKu extends Component {
    constructor(props){
        super(props);
        this.carou = React.createRef();
    }

    componentDidMount(){
        // this.carou.current.clientWidth/360*137
        console.log(this.link);
    }

    render() {
        let html = this.props.bannerData.map(obj => {
            return (
                <a href={obj.extra.tourl} key={obj.id} className="carousel-link" ref={a => {
                    return this.link = a;
                }}>
                    <img src={obj.imgurl} alt={obj.title} />
                </a>
            );
        });

        return ( 
            <WingBlank size="sm">
                <Carousel
                    autoplay={true}
                    infinite
                    ref={this.carou}
                >{html}</Carousel>
            </WingBlank>
        );
    }
}

CarouselKu.defaultProps = {bannerData: []}
CarouselKu.propTypes = {bannerData: PropTypes.array}

export default CarouselKu;