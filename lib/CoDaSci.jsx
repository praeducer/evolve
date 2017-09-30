import React from 'react';
import { BusinessCard } from '/lib/Card.jsx';
import { ChatBot } from '/lib/ChatBot.jsx';
import { Grid, Cell } from 'react-mdl';

export class CoDaSci extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Grid>
        <ChatBot />
      </Grid>
    );
  }
}

let defaultStyles = {
};
