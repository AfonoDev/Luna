import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Alerts from './pages/Alerts'
import { isSignedIn } from './services/security';

// const PrivateRoute = ({ children, ...rest }) => {
//     return <Route {...rest}
//         render={({ location }) =>
//             isSignedIn() ? (
//                 children
//             ) : (
//                     <Redirect
//                         to={{
//                             pathname: "/",
//                             state: { from: location },
//                         }}
//                     />
//                 )
//         }
//     />;

//}

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                {/* <PrivateRoute exact path="/home">
                    <Home />
                </PrivateRoute> */}

                <Route exact path="/alerts">
                <Alerts />
                </Route>

                {/* <PrivateRoute>
                    
                </PrivateRoute> */}

            </Switch>
        </BrowserRouter>
    );
}

export default Router;