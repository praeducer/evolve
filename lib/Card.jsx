import React from 'react';
import Radium from 'radium';
import { Card, CardTitle, CardText } from 'react-mdl';
import { Grid, Cell } from 'react-mdl';

@Radium
export class BusinessCard extends React.Component {
  render() {
    return(
      <div style={[this.props.style, {transform: 'scale(0.75)'}]}>
        <Card shadow={1} style={this.props.styles.card}>
          <CardTitle>
            <h2 style={this.props.styles.title}>
              Paul Prae
            </h2>
          </CardTitle>
          <CardText style={this.props.styles.text}>
            <h3 style={this.props.styles.title}>
              Software Engineer, Data Scientist
            </h3>
            <p>
              I’m a solutions architect who creates collaborative web technology to improve business and society. I build interactive systems that augment cognitive abilities and scale impact.
            </p>
          </CardText>
        </Card>
      </div>
    );
  }
}

BusinessCard.defaultProps = {
  styles: {}
}
