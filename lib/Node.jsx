import React from 'react';
import { Motion, spring } from 'react-motion';


export class Node extends React.Component {
  constructor() {
    super();
  }
  // Render the child in an appropriate place?
  render() {
    return this.children;
  }
}

export class Edge extends React.Component {
  constructor() {
    super();
  }
  // Draw a line from the origin to child.
  render() {
    return this.children;
  }
}
