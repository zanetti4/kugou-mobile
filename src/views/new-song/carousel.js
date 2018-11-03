import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import './new-song.css';

class CarouselKu extends Component {
    constructor(props){
        super(props);
        this.carou = React.createRef();
    }

    /* setHeight = () => {
        let carouH = this.carou.current.clientWidth/360*137;

        return `${carouH}px`;
    } */

    /* _ref = el => {
        if (el) {
          if (!this.els) {
            this.els = [];
          }

          this.els.push(el);
        } else {
          this.els = [];
        }
    }; */

    /* componentDidMount(){
        let carouH = this.carou.current.clientWidth/360*137;

        this.els.forEach(a => {
            // console.log(a);
            // a.style.height = `${carouH}px`;
            a.style.height = `136px`;
        });
    } */

    render() {
        /* let html = '';

        if(this.props.bannerData.length > 0){
            //获得焦点图数据
            html = this.props.bannerData.map(obj => {
                return (
                    <a href={obj.extra.tourl} key={obj.id} className="carousel-link">
                        <img src={obj.imgurl} alt={obj.title} />
                    </a>
                );
            });
        } */

        let html = this.props.bannerData.map((obj, index) => {
            return (
                /*<a href={obj.extra.tourl} key={obj.id} className="carousel-link" ref={a => {
                    return this[`link${index}`] = a;
                }}>
                    <img src={obj.imgurl} alt={obj.title} />
                </a>*/
                /*<a href={obj.extra.tourl} key={obj.id} className="carousel-link" ref={this._ref}>
                    <img src={obj.imgurl} alt={obj.title} />
                </a>*/
                <a href={obj.extra.tourl} key={obj.id} className="carousel-link">
                    <img src={obj.imgurl} alt={obj.title} />
                </a>
                /*<a href={obj.extra.tourl} key={obj.id} className="carousel-link" style={{height: this.setHeight}}>
                    <img src={obj.imgurl} alt={obj.title} />
                </a> */
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
            /*<WingBlank size="sm">
                <Carousel
                    autoplay={true}
                    infinite
                    ref={this.carou}
                    frameOverflow="visible"
                    cellSpacing={5}
                >{html}</Carousel>
            </WingBlank> */
            /*<Carousel
                autoplay={true}
                infinite
                frameOverflow="visible"
            >{html}</Carousel>*/
        );
    }
}

CarouselKu.defaultProps = {bannerData: []}
CarouselKu.propTypes = {bannerData: PropTypes.array}
export default CarouselKu;