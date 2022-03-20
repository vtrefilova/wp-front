import React, { Fragment, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store'
import App from './components/app'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { routes } from './route';

// Error page
import Error404 from "./pages/errors/error404"
import Login from './components/Login/Login';


const Root = (props) => {
  const jwt_token = localStorage.getItem('token');

  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter basename={`/admin`}>
          <Switch>
              <Switch>
                <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                <Route path="/404" component={Error404} />
                {jwt_token ?

                  <App>
                    <TransitionGroup>
                      {routes.map(({ path, Component }) => (
                        <Route key={path} path={`${process.env.PUBLIC_URL}${path}`}>
                          {({ match }) => (
                            <CSSTransition
                              in={match != null}
                              timeout={100}
                              classNames={"fade"}
                              unmountOnExit>
                              <div><Component /></div>
                            </CSSTransition>
                          )}
                        </Route>
                      ))}
                    </TransitionGroup>
                  </App>
                  :
                  <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                }
              </Switch>
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  )
}

ReactDOM.render(<Root />,
  document.getElementById('root')
);
serviceWorker.unregister();
