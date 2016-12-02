import React from 'react';
import Radium from 'radium';

@Radium
export class Tiles extends React.Component {
  constructor() {
    super();
  }
  getColor(i) {
    // This should probably be something a little different.
    return (i%2)?{color: 'white', background: 'black'}:{color: 'black', background:'white'};
  }
  renderChildren(child, i) {
    return (
      <div key={i} style={[defaultStyles.tile, this.props.style, this.getColor(i)]}>
        {child}
      </div>
    );
  }
  render() {
    return (
      <div style={this.props.style}>
        {this.props.children.map(this.renderChildren, this)}
      </div>
    );
  }
}
let defaultStyles = {
  tile: {
    minHeight: 250,
    width: '100%',
  }
}
