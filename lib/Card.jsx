import React from 'react';
import Radium from 'radium';
import { Card, CardTitle, CardText } from 'react-mdl';
import { Grid, Cell } from 'react-mdl';

@Radium
export class BusinessCard extends React.Component {
  render() {
    return(
      <div style={this.props.style}>
        <Card shadow={1} style={this.props.styles.card}>
          <CardTitle>
            <div style={this.props.styles.title}>
              Paul Prae
            </div>
          </CardTitle>
          <CardText style={this.props.styles.text}>
            I’m a solutions architect who creates collaborative web technology to improve business and society. I build interactive systems that augment cognitive abilities and scale impact.
          </CardText>
        </Card>
      </div>
    );
  }
}
