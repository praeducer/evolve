import React from "react";
import PropTypes from "proptypes";
import { Population } from "dargen";

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
      population: new Population({
        proto: props.population.proto,
        individuals: props.population.size
      })
    };
  }

  onChoice(choice) {
    let { onChoice } = this.props;
    let { population } = this.state;
    let chosen = population.individuals[choice];
    let { identifier } = chosen;

    onChoice instanceof Function && onChoice(chosen);

    Population.Fitness["selected"] = individual =>
      individual.identifier === identifier ? 0 : 1;
    population.crossover([
      true,
      { sort: { value: "selected", comparison: "ascending" } }
    ]);
    population.mutate(true);
    this.setState({
      population: population
    });
  }

  render() {
    let { population: { individuals } } = this.state;
    let { children, style } = this.props;
    return (
      <div style={style}>
        {individuals.map(children).map((child, index) =>
          React.cloneElement(child, {
            // Add onClick listening function to make selections.
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
