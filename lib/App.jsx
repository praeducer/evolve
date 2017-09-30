import _ from "lodash";
import React from "react";
import { Motion, spring } from "react-motion";
import Icon from "react-simple-icons";
import { Link } from "react-router";
import { Layout, Header, Navigation, Content } from "react-mdl";
import Color from "color";

import { GeneticThemeDemo } from "/lib/GeneticThemeDemo";
import { BusinessCard } from "/lib/Card";
import { ChatBot } from "/lib/ChatBot";
import { defaultStyles } from "/lib/defaultStyles";
import EvolveSettings from "/imports/evolve/settings.js";

let tutorial = [
  "Select the one you think looks best!",
  //"As you make choices your options converge.",
  "People are constantly making choices.",
  "Through intelligent algorithms like this one ...",
  "we can understand individuals ...",
  "... and tailor the web to them.",
  //"... while coming to understand them better.",
  "Select this card to apply it!"
];

export class App extends React.Component {
  constructor(props) {
    super(props);
    // I should probably store the default theme somewhere else.
    // How hard would it be to consume css for the default state?
    this.state = {
      content: [],
      chats: [],
      evolve: false,
      selectedStyles: [defaultStyles],
      selectedStyle: 0,
      selectedTitles: [{ primary: "Software", secondary: "Data Science" }],
      styles: defaultStyles,
      selections: 0
    };
  }

  componentDidMount() {
    this.setState({ content: [] });
    window.addEventListener("onresize", this.forceUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener("onresize", this.forceUpdate);
  }

  renderNavigation({ title = "Link", location = "" }) {
    return <a key={title} href={location}>{title}</a>;
  }

  // We want the cards to fill out page rows and columns.
  // This doesn't always work, and there is probably a better solution.
  demoRows() {
    return Math.min(
      4,
      Math.max(
        3,
        Math.ceil(
          window.document.body.clientHeight / defaultStyles.businessCard.height
        )
      )
    );
  }
  demoColumns() {
    return Math.min(
      4,
      Math.max(
        2,
        Math.ceil(
          window.document.body.clientWidth / defaultStyles.businessCard.width
        )
      )
    );
  }
  scaledBusinessCard(rows = this.demoRows(), columns = this.demoColumns()) {
    let scale = Math.min(
      window.document.body.clientWidth /
        (columns * defaultStyles.businessCard.width),
      window.document.body.clientHeight /
        (rows * defaultStyles.businessCard.height)
    );
    return {
      businessCard: {
        height: defaultStyles.businessCard.height * scale,
        width: defaultStyles.businessCard.width * scale
      },
      cardTitle: {
        fontSize: defaultStyles.cardTitle.fontSize * scale
      },
      cardText: {
        fontSize: defaultStyles.cardText.fontSize * scale
      },
      titleContainer: {
        marginBottom: (defaultStyles.cardTitle.fontSize * scale +
          defaultStyles.cardText.fontSize * scale +
          40) /
          2 *
          -1
      }
    };
  }
  renderIntroduction(styles, { primary, secondary }, index) {
    // Component that can transform stabily between an introduction and a simple BusinessCard.
    var title = `${primary} & ${secondary}`;
    var name = "Paul Prae";
    if (index < tutorial.length && this.state.evolve) {
      title = tutorial[index];
      name = "";
    }
    return (
      <BusinessCard
        key={index}
        styles={_.merge({}, defaultStyles, styles, this.scaledBusinessCard())}
        isFullscreen={!this.state.evolve && index === this.state.selectedStyle}
        isHidden={!this.state.evolve && index !== this.state.selectedStyle}
        hasButton={!this.state.evolve && index === this.state.selectedStyle}
        hasLinks={!this.state.evolve && index === this.state.selectedStyle}
        onClick={() =>
          this.setState({
            evolve: !this.state.evolve,
            selectedStyle: index
          })}
        title={title}
        name={name}
        buttonText={"Evolve"}
      />
    );
  }

  render() {
    // Some wild math to determine how many business cards should be on the page.
    let pageScale = Math.min(
      window.document.body.clientWidth /
        (this.demoColumns() * defaultStyles.businessCard.width),
      window.document.body.clientHeight /
        (this.demoRows() * defaultStyles.businessCard.height)
    );
    return (
      <Layout style={defaultStyles.container}>
        <Content style={defaultStyles.container}>
          <div style={{ height: "100%", textAlign: "center" }}>
            <div
              ref={el => {
                // Stay scrolled to the left when changes to the DOM occur.
                if (el) {
                  el.scrollLeft =
                    this.state.selectedStyles.length *
                    Math.floor(defaultStyles.businessCard.width * pageScale);
                }
              }}
              style={{
                position: "relative",
                // Fit the BusinessCard components to the entire page.
                height: this.state.evolve
                  ? defaultStyles.businessCard.height * pageScale
                  : "100%",
                whiteSpace: "nowrap",
                overflowX: "auto",
                overflowY: "hidden"
              }}
            >
              {
              // Map all selected styles to the introduction animation.
              this.state.selectedStyles.map((styles, index) =>
                this.renderIntroduction(
                  styles,
                  this.state.selectedTitles[index],
                  index
                )
              )}
            </div>
            {
            // Show the demo.
            this.state.evolve
              ? <GeneticThemeDemo
                  key="demo"
                  population={
                  // Create a population of the appropriate size to the screen size.
                  {...this.props.population, ...{
                    size: (this.demoRows() - 1) * this.demoColumns()
                  }}}
                  onChoice={
                  // Copy chosen individual as style to state.
                  ({ traits: { styles, titles } }) => {
                    this.setState({
                      // Population has been mutated, and we need to set the state with that mutation in order to keep it.
                      population: this.state.population,
                      selectedStyles: this.state.selectedStyles
                        // Only keep the 10 most recent styles.
                        .slice(-10)
                        .concat(styles),
                      selectedTitles: this.state.selectedTitles
                        .slice(-10)
                        .concat(titles)
                    });
                  }}
                >
                  {
                  // Given an individual, map the traits to a BusinessCard component.
                  (
                    { traits: { styles, titles: { primary, secondary } } },
                    index
                  ) => {
                    return (
                      <BusinessCard
                        key={index}
                        title={`${primary} & ${secondary}`}
                        name="Paul Prae"
                        buttonText="Select"
                        styles={{
                          ...defaultStyles,
                          ...styles,
                          ...this.scaledBusinessCard()
                        }}
                      />
                    );
                  }}
                </GeneticThemeDemo>
              : undefined}
          </div>
        </Content>
      </Layout>
    );
  }
}

App.defaultProps = {
  sections: [
    {
      title: "Demo",
      location: "/demo/genetic"
    }
  ],
  ...EvolveSettings
};
