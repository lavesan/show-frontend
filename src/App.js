import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import 'semantic-ui-css/semantic.min.css';

import { ListPage } from './pages/list';
import { RegisterPage } from './pages/register';
import env from './config.json';

axios.defaults.baseURL = env.API_URL;

const App = () => (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to='/cadastro' />} />
        <Route path="/cadastro" component={RegisterPage} />
        <Route path="/listagem" component={ListPage} />
      </Switch>
  </Router>
)

export default App;
