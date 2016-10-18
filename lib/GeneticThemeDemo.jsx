import React from 'react';
import Radium from 'radium';
import Color from 'color';
import { Grid, Cell } from 'react-mdl';
import { Individual, Population, Genome } from '/imports/genetic-experience-management';
import { Choose } from '/lib/Choose.jsx';
import { BusinessCard } from '/lib/Card.jsx';

if (Meteor.isClient) {
  window.Population = Population;
  window.Individual = Individual;
  window.Genome = Genome;
}
export const Fonts = ["Open Sans", "Josefin Slab", "Arvo", "Lato", "Vollkorn", "Abril Fatface", "Ubuntu", "PT Sans", "PT Serif", "Old Standard TT", "Droid Sans", "Anivers", "Junction", "Fertigo", "Aller", "Audimat", "Delicious", "Prociono"];

export class GeneticThemeDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      population: new Population()
    };
  }
  addChoice(choice) {
    var individual = this.state.population.currentGeneration[choice];
    this.setState({
      population: this.state.population.evolveFromSelection(individual)
    })
  }
  decodeColor(traits) {
    return traits.reduce((blend, color, index) => {
      if (index % 2 === 0)
        return blend.mix(Color(color));
      return blend;
    }, Color('#fff')).rgbString()
  }
  decodeBackgroundColor(traits) {
    return traits.slice(6).reduce((blend, color, index) => {
      if (index % 2 === 1)
        return blend.mix(Color(color));
      return blend;
    }, Color('#fff')).rgbString()
  }
  decodeFontWeight(traits) {
    if (Color(traits[1]).luminosity() > Color(traits[traits.length-1]).luminosity())
      return 700;
    return 500;
  }
  decodeFontFamily(traits) {
    var d = Color(traits[0]).luminosity() - Color(traits[traits.length-2]).luminosity();
    var font = Fonts[Math.floor(Math.sqrt(Math.abs(d)) * Fonts.length)];
    console.log(font, d);
    return font;
  }
  convertIndividualToStyle({traits}) {
    return {
      container: {
      },
      title: {
        color: this.decodeColor(traits),
        fontWeight: this.decodeFontWeight(traits.slice(4, 8)),
        fontFamily: this.decodeFontFamily(traits.slice(4, 8)),
        fontSize: 'x-large'
      },
      text: {
        color: this.decodeColor(traits),
        fontWeight: this.decodeFontWeight(traits),
        fontFamily: this.decodeFontFamily(traits)
      },
      card: {
        backgroundColor: this.decodeBackgroundColor(traits),
      }
    };
  }
  renderStyledElement(style, index) {
    return(
      <Cell key={index} col={3} onClick={() => this.addChoice(index)}>
        <BusinessCard style={style.container} styles={style} />
      </Cell>
    );
  }
  render() {
    var individuals = this.state.population.currentGeneration;
    var styles = individuals.map(this.convertIndividualToStyle, this);
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

