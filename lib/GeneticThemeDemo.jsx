import React from 'react';
import Radium from 'radium';
import Color from 'color';
import { Grid, Cell } from 'react-mdl';
import { Individual, Population, Genome } from '/imports/genetic-experience-management/src';
import { Choose } from '/lib/Choose.jsx';
import { BusinessCard } from '/lib/Card.jsx';

if (Meteor.isClient) {
  window.Population = Population;
  window.Individual = Individual;
  window.Genome = Genome;
  window.Color = Color;
}
export const Fonts = ["Open Sans", "Josefin Slab", "Arvo", "Lato", "Vollkorn", "Abril Fatface", "Ubuntu", "PT Sans", "PT Serif", "Old Standard TT", "Droid Sans", "Anivers", "Junction", "Fertigo", "Aller", "Audimat", "Delicious", "Prociono"];

export class GeneticThemeDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      population: new Population({
        size: 12,
        phenotype: {
          mutate: {
            substitution: 0.06,
            upper: 25,
            lower: 25
          },
          crossover: {
            crossover: 0.5,
            modify: true
          },
          style: {
            container: {
            },
            title: {
              color: this.decodeColor(0),
              fontWeight: [500, 700],
              fontFamily: Fonts,
              fontSize: ['x-large', 'xx-large']
            },
            text: {
              color: this.decodeColor(-1),
              fontWeight: [500, 700],
              fontFamily: Fonts,
            },
            card: {
              cursor: 'pointer',
              backgroundColor: this.decodeColor(1),
            }
          }
        }
      }).evolve()
    };
  }
  addChoice(choice) {
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
  decodeColor(o) {
    return ((genome, start) => {
      let ordinal = o;
      if (o == -1) {
        ordinal = (genome[genome.length-1] > 0.5)? 0: 2;
      }
      return Color({
        r: 255 * genome[start + ordinal * 5 + 0],
        g: 255 * genome[start + ordinal * 5 + 1],
        b: 255 * genome[start + ordinal * 5 + 2],
        s: 100 * genome[start + ordinal * 5 + 3],
        l: 100 * genome[start + ordinal * 5 + 4]
      }).rgbString()
    });
  }
  renderStyledElement(style, index) {
    return(
      <Cell key={index} col={3} onClick={() => this.addChoice(index)}>
        <BusinessCard style={style.container} styles={style} />
      </Cell>
    );
  }
  render() {
    var styles = this.state.population.individuals.map((i) => i.traits.style);
    var children = styles.map(this.renderStyledElement, this);
    return(
      <Grid>
        {children}
      </Grid>
    );
  }
}
GeneticThemeDemo.propTypes = {
  seedThemes: React.PropTypes.object,
};
GeneticThemeDemo.defaultProps = {
};

