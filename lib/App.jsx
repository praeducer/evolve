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

  renderIntroduction({percent, index, height, width, scale}) {
    // Get the window width
    let styles = this.state.selectedStyles[index];
    let p = percent / 100;
    let transformations = {
      introduction: {
        height: height,
        width: width,
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
      contact: {
        opacity: 1 - p,
        display: (90 - percent > 0)? 'block': 'none'
      }
    };
    let icon = {
      fill: 'black',
      size: 24
    }
    return (
      <div style={[defaultStyles.introduction, styles.card, transformations.introduction]} onClick={
        () => {if(this.state.evolve){this.setState({evolve: false, selectedStyles: [styles]})}}
      }>
      <div style={[{position: 'absolute', top: '50%'}, transformations.title]}>
        <h6 style={[styles.text]}>
          Software &amp; Data Science
        </h6>
        <h1 style={[defaultStyles.title, styles.title, {padding: 16}]}>
          Paul Prae
        </h1>
        <div style={transformations.button}>
          <Button style={{color: styles.card.backgroundColor, background: styles.text.color}} raised colored onClick={() => {this.setState({evolve: true})}}>
            Evolve
          </Button>
        </div>
      </div>
      <div style={[{position: 'absolute', bottom:'8%', width: '100%'}, styles.text, transformations.icons]}>
        <div style={[transformations.contact]}>
          <div>
          </div>
          <div style={{maxWidth: 240}}>
            I’m a solutions architect who creates collaborative web technology to improve business and society.
            I build interactive systems that augment cognitive abilities and scale impact.
          </div>
          <hr style={{borderColor: 'inherit'}} />
        </div>
        <img src="/cute-closeup.jpg" style={[defaultStyles.image, {height: 24, padding: 8}]} />
        <Icon style={{padding: 8}} fill={styles.title.color || icon.fill} size={icon.size} name="github" />
        <Icon style={{padding: 8}} fill={styles.title.color || icon.fill} size={icon.size} name="twitter" />
        <Icon style={{padding: 8}} fill={styles.title.color || icon.fill} size={icon.size} name="linkedin" />
        <Icon style={{padding: 8}} fill={styles.title.color || icon.fill} size={icon.size} name="instagram" />
      </div>
    </div>
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
                  <Motion key={index}
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
                  </Motion>
                )}
              </div>
            </div>
            {(this.state.evolve) ?
              <GeneticThemeDemo key="demo" onChoice={({traits: {styles}}) => {
                this.setState({selectedStyles: this.state.selectedStyles.concat(styles)});
              }} />
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

