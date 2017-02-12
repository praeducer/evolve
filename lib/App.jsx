import _ from 'lodash';
import React from 'react';
import { Motion, spring } from 'react-motion';
import Radium from 'radium';
import Icon from 'react-simple-icons';
import { Link } from 'react-router';
import {
  Grid, Cell,
  Layout, Header, Navigation, Content,
  Button, IconButton,
  Tooltip
} from 'react-mdl';

import { GeneticThemeDemo } from '/lib/GeneticThemeDemo';
import { BusinessCard } from '/lib/Card';
import { ChatBot } from '/lib/ChatBot';
import { defaultStyles } from '/lib/defaultStyles';

@Radium
export class App extends React.Component {
  constructor() {
    super();
    // I should probably store the default theme somewhere else.
    // How hard would it be to consume css for the default state?
    this.state = {
      content: [],
      chats: [],
      evolve: false,
      selectedStyles: [defaultStyles],
      selectedStyle: 0,
      styles: defaultStyles
    };
  }

  componentDidMount() {
    this.setState({content: [
    ]});
    window.onresize = () => this.forceUpdate()
  }
  componentWillUnmount() {
    delete window.onresize;
  }

  getChats() {
    return [
      {message: "This business card could look a lot better."},
      {message: (
        <span>
          My electrical impulses tell me that <Link to="/demo/genetic">
            you can help!
          </Link>
        </span>
      )},
      {message: (<Link to="/collaborators">Paul's Collaborators</Link>)},
      {message: (<a href="http://paulprae.com">More about Paul.</a>)},
    ];
  }
  renderNavigation({title="Link", location=""}) {
    return(
      <a key={title} href={location}>{title}</a>
    );
  }
  scaledBusinessCard() {
    let scale = Math.min(window.document.body.clientWidth / (3 * defaultStyles.businessCard.width), window.document.body.clientHeight /(4 * defaultStyles.businessCard.height));
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
        marginBottom: (defaultStyles.cardTitle.fontSize * scale + defaultStyles.cardText.fontSize * scale + 40) / 2 * -1
      }
    };
  }
  renderIntroduction(styles, index) {
    return (
      <BusinessCard key={index}
        styles={_.merge({}, defaultStyles, styles, this.scaledBusinessCard())}
        isFullscreen={(
          !this.state.evolve &&
          index === this.state.selectedStyle
        )}
        isHidden={(
          !this.state.evolve &&
          index !== this.state.selectedStyle
        )}
        hasButton={!this.state.evolve}
        hasLinks={!this.state.evolve}
        onClick={() => this.setState({
          evolve: !this.state.evolve,
          selectedStyle: index
        })}
        title={"Software & Data Science"}
        name={"Paul Prae"}
        buttonText={"Evolve"}
      />
    );
  }

  render() {
    let pageScale = Math.min(window.document.body.clientWidth / (3 * defaultStyles.businessCard.width), window.document.body.clientHeight /(4 * defaultStyles.businessCard.height));
    return(
      <Layout style={defaultStyles.container}>
        <Content style={defaultStyles.container}>
          <div style={{height: '100%', textAlign: 'center'}}>
            <div style={{width: '100%', overflowX: 'auto', overflowY: 'hidden', textAlign: 'left'}}
              ref={(el) => {
                if(el) {
                  el.scrollLeft = this.state.selectedStyles.length *
                    Math.floor(defaultStyles.businessCard.width * pageScale);
                }
              }}>
              <div style={{
                width: this.state.evolve? Math.ceil(defaultStyles.businessCard.width * pageScale) * this.state.selectedStyles.length: '100%'
              }}>
                {this.state.selectedStyles.map((styles, index) =>
                  this.renderIntroduction(styles, index)
                )}
              </div>
            </div>
            {(this.state.evolve) ?
              <GeneticThemeDemo
                key="demo"
                onChoice={({traits: {styles}}) => {
                  this.setState({
                    selectedStyles: this.state.selectedStyles.concat(styles)
                    });
              }}>
              {({traits: {styles, titles: {primary, secondary}}}, index) => {
                return (
                  <BusinessCard
                    key={index}
                    title={`${primary} & ${secondary}`}
                    name="Paul Prae"
                    buttonText="Select"
                    styles={_.merge({}, defaultStyles, styles, this.scaledBusinessCard())} />
                );
              }}
              </GeneticThemeDemo>
                : undefined
            }
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
    },
  ]
};

