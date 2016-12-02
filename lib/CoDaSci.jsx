import React from 'react';
import Radium from 'radium';
import { BusinessCard } from '/lib/Card.jsx';
import { ChatBot } from '/lib/ChatBot.jsx';
import { Grid, Cell } from 'react-mdl';

@Radium
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
