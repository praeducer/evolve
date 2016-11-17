import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { App } from '/lib/App.jsx';
import { GeneticThemeDemo } from '/lib/GeneticThemeDemo.jsx';
import { GeneticThemePitch } from '/lib/GeneticThemePitch.jsx';
import { CoDaSci } from '/lib/CoDaSci.jsx';

// Wait until Meteor is loaded to render the page.
Meteor.startup( () => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/demo/genetic" component={GeneticThemeDemo} />
      <Route path="/pitch" component={GeneticThemePitch} />
      <Route path="/collaborators" component={CoDaSci} />
    </Router>
  ), document.getElementById('root'))
});
