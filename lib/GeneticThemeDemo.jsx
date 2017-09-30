import React from "react";
import PropTypes from "proptypes";
import { Population } from "/imports/dargen/src";

/**
 * @class GeneticThemeDemo
 * @desc
 *
 * Takes a DarGen population manifest and a function to render
 * individuals as children.
 *
 * Displays population as rendered children with onClick handlers.
 *
 */
export default class GeneticThemeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Start population from the manifest given.
      population: new Population(props.population).evolve()
    };
  }

  onChoice(choice) {
    let { onChoice } = this.props;
    let { population } = this.state;
    let { identifier } = population.individuals[choice];

    onChoice instanceof Function && onChoice(identifier);

    this.setState({
      // TODO This generation parameter to population.evolve should be passed in and stored in /imports/evolve settings.
      population: population.evolve({
        fitness: individual => {
          return individual.identifier === identifier;
        },
        comparison: ({ value: a }, { value: b }) =>
          a && !b ? -1 : !a && b ? 1 : 0,
        groups: population.individuals.length
      })
    });
  }

  render() {
    let { population: {individuals} } = this.state;
    let { children, style } = this.props;
    return (
      <div style={style}>
        {individuals.map(children).map((child, index) =>
          React.cloneElement(child, {
            // Add onClick listening function so make selections.
            onClick: () => this.onChoice(index)
          })
        )}
      </div>
    );
  }
}
GeneticThemeDemo.propTypes = {
  seedThemes: PropTypes.object,
  children: PropTypes.func
};
// Simply dump JSON by default.
GeneticThemeDemo.defaultProps = {
  children: ({ traits }) => <code>{JSON.stringify(traits, null, 2)}</code>
};
