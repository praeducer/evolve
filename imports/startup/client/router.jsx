import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { App } from '/lib/App.jsx';
import { GeneticThemeDemo } from '/lib/GeneticThemeDemo.jsx';

Meteor.startup( () => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/demo/genetic" component={GeneticThemeDemo} />
    </Router>
  ), document.getElementById('root'))
});
