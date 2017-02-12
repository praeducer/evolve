import React from 'react';
import { Motion, spring } from 'react-motion';
import Radium from 'radium';
import Color from 'color';
import {
  Grid, Cell,
  Tooltip
} from 'react-mdl';
import { ChatBot } from '/lib/ChatBot.jsx';
import { Individual, Population, Genome } from '/imports/genetic-experience-management/src';

export const Fonts = ["Open Sans", "Josefin Slab", "Arvo", "Lato", "Vollkorn", "Abril Fatface", "Ubuntu", "PT Sans", "PT Serif", "Old Standard TT", "Droid Sans", "Anivers", "Junction", "Fertigo", "Aller", "Audimat", "Delicious", "Prociono"];

export class GeneticThemeDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      population: new Population({
        size: 12,
        phenotype: {
          mutate: {
            incrementation: [1/5, 1/2, 1],
            increment: [1/Fonts.length, 1/10],
            upper: 40,
            lower: 40
          },
          crossover: {
            crossover: 0.5,
            modify: true
          },
          titles: {
            primary: [
              "Software",
              "Engineering",
              "Marketing",
              "Applications",
              "Learning",
              "Solutions"
            ],
            secondary: [
              "Data Science",
              "Data Processing",
              "Data Collection",
              "Artificial Intelligence",
              "Cognitive Computing",
              "Chat Bots",
              "Cloud Services"
            ]
          },
          styles: {
            title: {
              color: this.decodeColor(2),
              fontWeight: [500, 700],
              fontFamily: Fonts,
            },
            text: {
              color: this.decodeColor(1),
              fontWeight: [500, 700],
              fontFamily: Fonts,
            },
            card: {
              backgroundColor: this.decodeColor(0),
            }
          }
        }
      }).evolve()
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
  decodeColor(o) {
    let sum = (sum, value) => sum + value;
    return ((genome, start) => {
      let colorLength = 1
      let ostart = start + colorLength + o * colorLength * 3;
      let hue = 360 * (genome.slice(start, colorLength).reduce(sum, 0) % 1);
      let saturation = 100 * (genome.slice(ostart, ostart + colorLength).reduce(sum, 0) % 1);
      let lightness = 100 * (genome.slice(ostart + colorLength, ostart + colorLength * 2).reduce(sum, 0) % 1);
      let offhue = 360 * (genome.slice(ostart + colorLength * 2, ostart + colorLength * 3).reduce(sum, 0) % 1);
      return Color({
        h: (hue + offhue) % 360,
        s: saturation,
        l: lightness
      }).rgbString()
    });
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
      <div>
        {children}
      </div>
    );
  }
}
GeneticThemeDemo.propTypes = {
  seedThemes: React.PropTypes.object,
};
GeneticThemeDemo.defaultProps = {
};
