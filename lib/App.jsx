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

  renderIntroduction(styles, i) {
    // Get the window width
    /*let styles = this.state.selectedStyles[index];
    let p = percent / 100;
    let transformations = {
      introduction: {
        marginTop: Math.floor((1 - scale) * height / 2 * -1),
        marginBottom: Math.floor((1 - scale) * height / 2 * -1),
        marginLeft: Math.floor((1 - scale) * width / 2 * -1),
        marginRight: Math.floor((1 - scale) * width / 2 * -1),
        transform: `scale(${scale})`
      },
      button: {
        opacity: p,
        display: (percent)? 'block': 'none'
      },
      title: {
        marginTop: -73 * p - 100,
        width: `${percent * 0.5 + 50}%`
      },
      icons: {
        width: `${percent * 0.5 + 50}%`,
        left: `${50 - percent * 0.5}%`,
        bottom: `${(10 - percent * 0.10) + 8}%`,
      },
    };*/
    return (
      <BusinessCard key={i}
        styles={Object.assign({}, defaultStyles, styles)}
        isFullscreen={!this.state.evolve}
        hasButton={!this.state.evolve}
        hasLinks={!this.state.evolve}
        onClick={() => this.setState({evolve: true})}
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
                width: this.state.evolve? Math.floor(defaultStyles.businessCard.width * pageScale) * this.state.selectedStyles.length: '100%'
              }}>
                {this.state.selectedStyles.map((styles, index) =>
                  /*<Motion key={index}
                    defaultStyle={{
                      percent: (index==0)? 100: 0,
                      scale: (!this.state.evolve)? 1: pageScale,
                      index: index,
                      height: (index==0)? window.document.body.clientHeight: defaultStyles.businessCard.height,
                      width: (index==0)? window.document.body.clientWidth: defaultStyles.businessCard.width,
                    }}
                    style={{
                      percent: spring((this.state.evolve)? 0: 100),
                      scale: spring((this.state.evolve)? pageScale: 1),
                      index: index,
                      height: spring((this.state.evolve)? defaultStyles.businessCard.height: window.document.body.clientHeight),
                      width: spring((this.state.evolve)? defaultStyles.businessCard.width: window.document.body.clientWidth),
                  }}>
                    {this.renderIntroduction.bind(this)}
                  </Motion>*/
                  this.renderIntroduction(styles, index)
                )}
              </div>
            </div>
            {(this.state.evolve) ?
              <GeneticThemeDemo key="demo" onChoice={({traits: {styles}}) => {
                this.setState({selectedStyles: this.state.selectedStyles.concat(styles)});
              }}>
              {({traits: {styles, titles: {primary, secondary}}}, index) => {
                return (
                  <BusinessCard
                    key={index}
                    title={`${primary} & ${secondary}`}
                    name="Paul Prae"
                    styles={Object.assign({}, defaultStyles, styles)} />
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

