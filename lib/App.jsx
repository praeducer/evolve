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
import { BusinessCard } from '/lib/Card.jsx';
import { ChatBot } from '/lib/ChatBot.jsx';
import { Tiles } from '/lib/Tiles';

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
      selectedStyles: [defaultStyles.businesscard],
      theme: {
        businessCard: {
          card: {
            backgroundColor: "white"
          },
          title: {
            color: "black",
            fontWeight: 500
          },
          text: {
            color: "black",
            fontWeight: 500
          },
        }
      }
    };
  }

  componentDidMount() {
    this.setState({content: [
    ]});
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

  renderIntroduction({percent}) {
    // Get the window width
    let p = percent / 100;
    let transformations = {
      introduction: {
        height: p * (window.document.body.clientHeight - 300) + 300, // 300
        width: p * (window.document.body.clientWidth - 486) + 486, // 486
      },
      button: {
        opacity: percent * 0.01,
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
        opacity: 1 - percent / 100,
        display: (90 - percent)? 'block': 'none'
      }
    };
    let icon = {
      fill: 'black',
      size: 24
    }
    return (
      <div style={[defaultStyles.introduction, transformations.introduction]} onClick={
        () => {if(this.state.evolve){this.setState({evolve: false})}}
      }>
        <div style={[{position: 'absolute', top: '50%', marginTop: -173}, transformations.title]}>
          <h6>
            Software &amp; Data Science
          </h6>
          <h1 style={[defaultStyles.title, {padding: 16}]}>
            Paul Prae
          </h1>
          <div style={transformations.button}>
            <Button raised colored onClick={() => {this.setState({evolve: true})}}>
              Evolve
            </Button>
          </div>
        </div>
        <div style={[{position: 'absolute', bottom:'8%', width: '100%'}, transformations.icons]}>
          <img src="/cute-closeup.jpg" style={[defaultStyles.image, {height: 24, padding: 8}]} />
          <Icon style={{padding: 8}} fill={icon.fill} size={icon.size} name="github" />
          <Icon style={{padding: 8}} fill={icon.fill} size={icon.size} name="twitter" />
          <Icon style={{padding: 8}} fill={icon.fill} size={icon.size} name="linkedin" />
          <Icon style={{padding: 8}} fill={icon.fill} size={icon.size} name="instagram" />
          <div style={transformations.contact}>
            <hr />
            <div>
              Phone: (555) 213-2134
            </div>
            <hr />
            <div>
              I’m a solutions architect who creates collaborative web technology to improve business and society.
              I build interactive systems that augment cognitive abilities and scale impact.
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return(
      <Layout style={defaultStyles.container}>
        <Content style={defaultStyles.container}>
          <div style={{height: '100%', textAlign: 'center'}}>
            <Motion defaulStyle={{percent: 100}} style={{percent: spring((this.state.evolve)? 0: 100)}}>
              {this.renderIntroduction.bind(this)}
            </Motion>
          </div>
          <p>
            I’m a solutions architect who creates collaborative web technology to improve business and society.
            I build interactive systems that augment cognitive abilities and scale impact.
          </p>
          <div>
            The future is starting, and we're here to help.
            The interfaces of the future:
            will mold themselves to a user.
            will change as their users change.
            will interact with their users.
            will understand their users.
          </div>
          <div>
            <h4 style={{textAlign: 'left'}}>
              No man is an island.
            </h4>
            <p>
              Austin New
            </p>
            <p>
              David Prae
            </p>
            <p>
              Kristin Ottofy
            </p>
          </div>
          <div style={{height: 192, width: '100%', overflowX: 'auto', overflowY: 'hidden'}}>
            <div ref={(ref) => {console.log(ref)}} style={{width: 180 * 9/10 * 8/9 * this.state.selectedStyles.length}}>
              {this.state.selectedStyles.map((styles, i) =>
                <BusinessCard key={i} onClick={() => {
                  console.log(this.state.theme);
                  this.setState({theme: styles});
                }} style={defaultStyles.businesscard} styles={styles} />
              )}
            </div>
          </div>
          <div>
            <GeneticThemeDemo onChoice={({traits: {style}}) => {
              this.setState({selectedStyles: this.state.selectedStyles.concat(style)});
            }} />
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


let defaultStyles = {
  title: {
    fontSize: 48,
  },
  container: {
    height: "100%",
    width: "100%",
    margin: 'auto'
  },
  header: {
    background: "rgba(0, 0, 0, 0.8)"
  },
  content: {
    height: "100%"
  },
  businesscard: {
    display: 'inline-block',
    margin: 6,
    transform: 'scale(0.4)',
    transformOrigin: 'top left',
    width: 130,
    height: 180
  },
  chatbot: {
    margin: 12
  },
  image: {
    height: 40,
    borderRadius: '50%'
  },
  largeImage: {
    maxHeight: 200,
    width: 'auto'
  },
  introduction: {
    position: 'relative',
    height: 'inherit',
    backgroundColor: 'rgb(231, 233, 232)',
    textAlign: 'center'
  }
};
