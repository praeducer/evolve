import React from 'react';
import PropTypes from 'proptypes';
import { Motion, spring } from 'react-motion';
import { Individual, Population, Genome } from '/imports/dargen/src';


export class GeneticThemeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      population: new Population(props.population).evolve()
    };
  }
  onChoice(choice) {
    if (this.props.onChoice) {
      this.props.onChoice(
        this.state.population.individuals[choice]);
    }

    let { identifier } = this.state.population.individuals[choice];
    this.setState({
      population: this.state.population.evolve({
        fitness: ((individual) => {
          return individual.identifier === identifier;
        }),
        comparison: ({value: a}, {value: b}) => (a && !b)? -1: (!a && b)? 1: 0,
        groups: this.state.population.individuals.length
      })
    })
  }
  getNarration() {
    return [
      {message: "Select the one you think looks the best!"},
      {message: "People are making choices on the web all the time."},
      {message: "Through intelligent algorithms like this one, we can tailor the web to specific people, while coming to understand them better."},
      {message: "As you make actions your choices narrow and become more relevant."},
    ];
  }
  render() {
    var individualsStyles = this.state.population.individuals.map((i) => i.traits.styles);
    var children = this.state.population.individuals.map(this.props.children).map((child, index) => React.cloneElement(child, {
      onClick: () => this.onChoice(index)
    }));
    return(
      <div style={this.props.style}>
        {children}
      </div>
    );
  }
}
GeneticThemeDemo.propTypes = {
  seedThemes: PropTypes.object,
};
GeneticThemeDemo.defaultProps = {
};
