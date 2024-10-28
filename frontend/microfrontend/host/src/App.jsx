import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('auth/Login'));
const Register = lazy(() => import('auth/Register'));
const Profile = lazy(() => import('profile/Profile'));
const PhotoGallery = lazy(() => import('photos/PhotoGallery'));
const LikeManager = lazy(() => import('likes/LikeManager'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/signin" component={Login} />
                    <Route path="/signup" component={Register} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/photos" component={PhotoGallery} />
                    <Route path="/likes" component={LikeManager} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;