import React, { Component } from 'react';
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import { Route } from 'react-router-dom'
import {getData} from '../../../server/getData';

const history = createBrowserHistory()

class PlistInfo extends Component {
    constructor(...args){
        super(...args)

        this.state = {
          data: null
        }
    }    

    componentDidMount(){
        let plistId = this.props.match.params.id;

        getData('getPlistInfo', {plistId}).then(data => {
          this.setState({ data })
        })
    }    

    render(){
        return <React.Fragment>aaa</React.Fragment>;
    }
}

// export default getData('getPlistInfo', {plistId: '563507'})(PlistInfo);
export default () => <Router history={history}>
    <Route path="/plist/list/:id" component={PlistInfo} />
</Router>;