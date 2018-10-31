import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import servers from './api';

export let getData = function(serverName, params = {}){
    return function(Component){
        return class anyComponent extends Component {
            constructor(props){
                super(props);

                this.state = {
                    data: {},
                    isLoading: true
                };
            }

            componentDidMount(){
                let method = servers[serverName];

                if(!method){
                    //请求方法不存在
                    throw new Error('请求的方法不存在，请检测传入的参数。');
                }

                let p = params;

                if(typeof params === 'function'){
                    //params 是函数
                    p = params(this.props);
                }

                servers[serverName](p).then(({data}) => {
                    this.setState({
                        data,
                        isLoading: false
                    });
                });
            }

            render(){
                let loading = <div className="load">
                    <Icon type="loading" />
                </div>;

                return(
                    /* this.state.isLoading 
                    ? <Icon type="loading" />
                    //将 this.props 扩展到组件上，为了让组件可以使用 match, history, location
                    : <Component data={this.state.data} {...this.props} /> */
                    loading
                )
            }
        };
    };
};