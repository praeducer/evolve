import React from 'react';
import Radium from 'radium';
import { BusinessCard } from '/lib/Card.jsx';
import { Link } from 'react-router';

@Radium
export class App extends React.Component {
  constructor() {
    super();
    // I should probably store the default theme somewhere else.
    // How hard would it be to consume css for the default state?
    this.state = {
      theme: {
        businessCard: {
          card: {
            backgroundColor: "white"
          },
          title: {
            color: "black",
            fontWeight: 500
          },
          text: {
            color: "black",
            fontWeight: 500
          },
        }
      }
    };
  }

  render() {
    return(
      <div>
        <BusinessCard styles={this.state.theme.businessCard} />
        <p>
          <Link to="/demo/genetic">
            Suite this to your tastes?
          </Link>
        </p>
      </div>
    );
  }
}
