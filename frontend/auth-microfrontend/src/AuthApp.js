import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function AuthApp() {
    return (
        <Router basename="/auth">
            <Switch>
                <Route path="/signin" component={Login} />
                <Route path="/signup" component={Register} />
            </Switch>
        </Router>
    );
}

export default AuthApp;
