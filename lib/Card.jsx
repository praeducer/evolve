import React from 'react';
import Radium from 'radium';
import { Card, CardTitle, CardText } from 'react-mdl';
import { Grid, Cell } from 'react-mdl';

@Radium
export class BusinessCard extends React.Component {
  render() {
    return(
      <Card shadow={1} style={[{margin: 'auto'}, this.props.style]}>
        <CardTitle style={[this.props.style]}>
          Paul Prae
        </CardTitle>
        <CardText style={[this.props.style]}>
          I’m a solutions architect who creates collaborative web technology to improve business and society. I build interactive systems that augment cognitive abilities and scale impact.
        </CardText>
      </Card>
    );
  }
}
