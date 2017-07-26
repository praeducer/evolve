import _ from "lodash";
import React from "react";
import { Motion, spring } from "react-motion";
import Radium from "radium";
import Icon from "react-simple-icons";
import { Link } from "react-router";
import { Layout, Header, Navigation, Content } from "react-mdl";
import Color from "color";

import { GeneticThemeDemo } from "/lib/GeneticThemeDemo";
import { BusinessCard } from "/lib/Card";
import { ChatBot } from "/lib/ChatBot";
import { defaultStyles } from "/lib/defaultStyles";

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
    this.setState({
      content: []
    });
    window.onresize = () => this.forceUpdate();
    window.Color = Color;
  }
  componentWillUnmount() {
    delete window.onresize;
  }

  getChats() {
    return [
      { message: "This business card could look a lot better." },
      {
        message: (
          <span>
            My electrical impulses tell me that <Link to="/demo/genetic">
              you can help!
            </Link>
          </span>
        )
      },
      { message: <Link to="/collaborators">Paul's Collaborators</Link> },
      { message: <a href="http://paulprae.com">More about Paul.</a> }
    ];
  }
  renderNavigation({ title = "Link", location = "" }) {
    return <a key={title} href={location}>{title}</a>;
  }
  // We want the cards to fill out page rows and columns.
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
                if (el) {
                  el.scrollLeft =
                    this.state.selectedStyles.length *
                    Math.floor(defaultStyles.businessCard.width * pageScale);
                }
              }}
              style={{
                position: "relative",
                height: this.state.evolve
                  ? defaultStyles.businessCard.height * pageScale
                  : "100%",
                whiteSpace: "nowrap",
                overflowX: "auto",
                overflowY: "hidden"
              }}
            >
              {this.state.selectedStyles.map((styles, index) =>
                this.renderIntroduction(
                  styles,
                  this.state.selectedTitles[index],
                  index
                )
              )}
            </div>
            {this.state.evolve
              ? <GeneticThemeDemo
                  key="demo"
                  population={Object.assign({}, this.props.population, {
                    size: (this.demoRows() - 1) * this.demoColumns()
                  })}
                  onChoice={({ traits: { styles, titles } }) => {
                    this.setState({
                      population: this.state.population,
                      selectedStyles: this.state.selectedStyles
                        .slice(-10)
                        .concat(styles),
                      selectedTitles: this.state.selectedTitles
                        .slice(-10)
                        .concat(titles)
                      //selections: this.state.selections + 1
                    });
                  }}
                >
                  {(
                    { traits: { styles, titles: { primary, secondary } } },
                    index
                  ) => {
                    return (
                      <BusinessCard
                        key={index}
                        title={`${primary} & ${secondary}`}
                        name="Paul Prae"
                        buttonText="Select"
                        styles={_.merge(
                          {},
                          defaultStyles,
                          styles,
                          this.scaledBusinessCard()
                        )}
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

function decodeColor(o, isBackground = false) {
  // Base Hue, Lightness Style.
  let sum = (sum, value) => {
    return sum
  };
  return (genome, start) => {
    let colorLength = 2;
    let ostart = start + colorLength + o * colorLength * 3;
    let hue = 360 * (genome.slice(start, colorLength).reduce(sum, 0) % 1);
    let lightness =
      100 *
      (genome
        .slice(start + colorLength, start + colorLength * 2)
        .reduce(sum, 0) %
        1);
    let saturation =
      100 * (genome.slice(ostart, ostart + colorLength).reduce(sum, 0) % 1);
    let offhue =
      360 *
      (genome
        .slice(ostart + colorLength * 2, ostart + colorLength * 3)
        .reduce(sum, 0) %
        1);
    let color = {
      h: (hue + offhue) % 360,
      s: saturation,
      l: isBackground ? lightness : 100 - lightness
    };
    console.log(color);
    return Color(color).rgbString();
  };
}

const Fonts = [
  "Open Sans",
  "Josefin Slab",
  "Arvo",
  "Lato",
  "Vollkorn",
  "Abril Fatface",
  "Ubuntu",
  "PT Sans",
  "PT Serif",
  "Old Standard TT",
  "Droid Sans",
  "Anivers",
  "Junction",
  "Fertigo",
  "Aller",
  "Audimat",
  "Delicious",
  "Prociono"
];

App.defaultProps = {
  sections: [
    {
      title: "Demo",
      location: "/demo/genetic"
    }
  ],
  population: {
    //size: 12,
    phenotype: {
      mutate: [
      {
        name: "sustitution",
        selection: 0.03,
      },
      {
        name: g => ["incrementation", "decrementation"][Math.floor(g*2)],
        selection: {
          rate: g => [1/5, 1/2][Math.floor(g*2)],
          selection: "style.title.color"
        },
        params: {
          increment: 1/60,
          decrement: 1/60
        }
      },
      {
        name: "sustitution",
        selection: {
        rate: 0.1,
        selection: 'mutate.1.name'
        }
      }
      ],
      titles: {
        primary: g => [
          "Software",
          "Engineering",
          "Marketing",
          "Applications",
          "Learning",
          "Solutions"
        ][Math.floor(g*7)],
        secondary: g => [
          "Data Science",
          "Data Processing",
          "Data Collection",
          "Artificial Intelligence",
          "Cognitive Computing",
          "Chat Bots",
          "Cloud Services"
        ][Math.floor(g*7)]
      },
      styles: {
        title: {
          color: decodeColor(0),
          fontWeight: g => [500, 700],
          fontFamily: g => Fonts[Math.floor(Fonts.length*g)]
        },
        text: {
          color: decodeColor(0),
          fontWeight: g => [500, 700],
          fontFamily: g => Fonts[Math.floor(Fonts.length*g)]
        },
        card: {
          backgroundColor: decodeColor(0)
        }
      }
    }
  }
};
