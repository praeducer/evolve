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
      selectedTitles: [{primary: "Software", secondary: "Data Science"}],
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
  renderIntroduction(styles, {primary, secondary}, index) {
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
        hasButton={(
          !this.state.evolve &&
          index === this.state.selectedStyle
        )}
        hasLinks={(
          !this.state.evolve &&
          index === this.state.selectedStyle
        )}
        onClick={() => this.setState({
          evolve: !this.state.evolve,
          selectedStyle: index
        })}
        title={`${primary} & ${secondary}`}
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
            <div ref={(el) => {
                if(el) {
                  el.scrollLeft = this.state.selectedStyles.length *
                    Math.floor(defaultStyles.businessCard.width * pageScale);
                }
              }}
              style={{
                position: 'relative',
                height: (this.state.evolve)?defaultStyles.businessCard.height * pageScale:'100%',
                whiteSpace: 'nowrap',
                overflowX: 'auto',
                overflowY: 'hidden'
              }}>
                {this.state.selectedStyles.map((styles, index) =>
                  this.renderIntroduction(styles, this.state.selectedTitles[index], index)
                )}
            </div>
            {(this.state.evolve) ?
              <GeneticThemeDemo
                key="demo"
                onChoice={({traits: {styles, titles}}) => {
                  this.setState({
                    selectedStyles: this.state.selectedStyles.concat(styles),
                    selectedTitles: this.state.selectedTitles.concat(titles)
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

