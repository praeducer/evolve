import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from '/lib/App.jsx';

// Wait until Meteor is loaded to render the page.
Meteor.startup( () => {
  render((
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  ), document.getElementById('root'))
});
