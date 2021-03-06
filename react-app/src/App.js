import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Location from './components/Location';
import CreateListing from './components/CreateListing';
import Listing from './components/Listing';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Home from './components/Home';
import { authenticate } from './services/auth';
import SimpleMap from './components/SimpleMap';

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await authenticate();
            if (!user.errors) {
                setAuthenticated(true);
            }
            setLoaded(true);
        })();
    }, []);

    if (!loaded) {
        return null;
    }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/locations/:id" exact={true}>
          <Listing>
            <SimpleMap />
          </Listing>
        </Route>
        <Route path="/locations" exact={true}>
          <Location />
        </Route>

        <Route path="/">
          <Home />
          < SimpleMap />
        </Route>
        {/* <ProtectedRoute
          path="/users"
          exact={true}
          authenticated={authenticated}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path="/users/:userId"
          exact={true}
          authenticated={authenticated}
        >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <Home />
          <SimpleMap />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
