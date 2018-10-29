import React, { Component } from 'react';
import config from './config';
import {Route} from 'react-router-dom';

class Routes extends Component {
    render() {
        let routes = config.map(obj => {
            return <Route exact key={obj.path} path={obj.path} component={obj.component}></Route>
        });

        return ( 
            <React.Fragment>
                {routes}
            </React.Fragment>
        );
    }
}

export default Routes;