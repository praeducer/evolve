import React from 'react';
import Radium from 'radium';
import { BusinessCard } from '/lib/Card.jsx';

@Radium
export class App extends React.Component {
  constructor() {
    super();
    // I should probably store the default theme somewhere else.
    // How hard would it be to consume css for the default state?
    this.state = {
      theme: {
        businessCard: {
          backgroundColor: "white",
          color: "black",
          fontFamily: "arial"
        }
      }
    };
  }
  render() {
    return(
      <BusinessCard style={[
        this.state.theme.businessCard
      ]} />
    );
  }
}
