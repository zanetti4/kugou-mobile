import React, { Component } from 'react';
import RankBanner from './rank-banner';
import {getRankInfo, cancelRequest} from '../../../server/api';

class RankInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            banner: '',
            name: ''
        };
    }

    //根据榜单 id，获取榜单信息
    getRankInfoById = () => {
        let rankId = this.props.match.params.id;

        if(rankId){
            //rankId 不是空字符串
            getRankInfo(rankId).then(({data}) => {
                console.log(data);
                let {banner7url, rankname} = data.info;
                let banner = banner7url.replace('{size}', 400);

                this.setState({
                    banner,
                    name: rankname
                });
            });
        }
    }

    componentDidMount(){
        this.getRankInfoById();
    }

    componentWillUnmount(){
        cancelRequest();
    }

    render() {
        let {banner, name} = this.state;

        return ( 
            <React.Fragment>
                <RankBanner banner={banner} name={name} />
            </React.Fragment>
        );
    }
}

export default RankInfo;