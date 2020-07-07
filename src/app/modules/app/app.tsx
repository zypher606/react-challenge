import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import DefaultModule from '../default/default.module';
import ProductModule from '../product/product.module';
import './app.css';

// This is the root module, don't add anything in here apart form the routing part

function App() {
  return (
    <Router basename={'/'}>
      <Switch>
        <Redirect exact from="/" to="product" />
        <Route path="/default" children={DefaultModule} />
        <Route path="/product" children={ProductModule} />
        <Redirect from="**" to="/default" />

        {/* Load the required modules accordingly below */}
      </Switch>
    </Router>
  );
}

export default App;
