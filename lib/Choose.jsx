import React from 'react';
import Radium from 'radium';
import Color from 'color';
import { Grid, Cell } from 'react-mdl';

export class Choose extends React.Component {
  renderChild(child, index) {
    <div onClick={(event) => this.props.choice(index)}>
      {child}
    </div>
  }
  render() {
    return(
      <div>
        {this.props.children.map(this.renderChild)}
      </div>
    );
  }
}

Choose.propTypes = {
  children: React.PropTypes.array.isRequired,
  choice: React.PropTypes.func.isRequired
}
