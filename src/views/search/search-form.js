import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import fetchJsonp from 'fetch-jsonp';

class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    //修改 value
    onChange = (value) => {
        this.setState({ value });
    }

    //搜索
    onSubmit = () => {
        let txt = this.state.value.trim();

        if(txt === ''){
            //无输入内容
            alert('关键字不能为空');
            return;
        }

        txt = encodeURIComponent(txt);

        fetchJsonp(`http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${txt}&page=1&pagesize=30&showtype=1`)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json', json);
            that.setState({hotWords: json.data.info});
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }

    render() {
        return (
            <SearchBar 
                placeholder="歌手/歌名/拼音"
                value={this.state.value}
                onChange={this.onChange}
                onSubmit={() => {}}
            />
        );
    }
}

export default SearchForm;