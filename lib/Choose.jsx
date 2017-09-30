import React from 'react';
import PropTypes from 'proptypes';
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
  children: PropTypes.array.isRequired,
  choice: PropTypes.func.isRequired
}
