import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import config from './config';

class Routes extends Component {
    render() {
        let routes = config.map(obj => {
            return <Route exact key={obj.path} path={obj.path} component={obj.component}></Route>
        });

        return ( 
            <React.Fragment>
                <Switch>
                    {routes}
                    <Redirect to="/" />
                </Switch>
            </React.Fragment>
        );
    }
}

export default Routes;