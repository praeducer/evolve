import React from 'react';
import { Motion, spring } from 'react-motion';
import Radium from 'radium';


@Radium
export class Node extends React.Component {
  constructor() {
    super();
  }
  // Render the child in an appropriate place?
  render() {
    return this.children;
  }
}

@Radium
export class Edge extends React.Component {
  constructor() {
    super();
  }
  // Draw a line from the origin to child.
  render() {
    return this.children;
  }
}
