import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from '/lib/App.jsx';

// Wait until Meteor is loaded to render the page.
Meteor.startup( () => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  ), document.getElementById('root'))
});
