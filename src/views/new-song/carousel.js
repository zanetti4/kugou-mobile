import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import './new-song.css';

class CarouselKu extends Component {
    componentDidMount(){
        let carousel = document.querySelector('.slider.am-carousel');
        let carouH = carousel.clientWidth/360*137;
        let carouUl = carousel.querySelector('ul.slider-list');

        setTimeout(() => {
            carouUl.style.height = `${carouH}px`;
        });
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        let html = this.props.bannerData.map(obj => {
            return (
                <a href={obj.extra.tourl} key={obj.id} className="carousel-link">
                    <img src={obj.imgurl} alt={obj.title} />
                </a>
            );
        });

        return (
            <WingBlank size="sm">
                <Carousel
                    className="carousel"
                    autoplay={true}
                    infinite
                >{html}</Carousel>
            </WingBlank> 
        );
    }
}

CarouselKu.defaultProps = {bannerData: []}
CarouselKu.propTypes = {bannerData: PropTypes.array}
export default CarouselKu;