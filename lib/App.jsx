import React from 'react';
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
  renderIntroduction() {
    return (
      <div style={[defaultStyles.introduction]}>
        <div style={{position: 'absolute', width: '100%', top: '50%', marginTop: -173}}>
          <h6>
            Software &amp; Data Science
          </h6>
          <h1 style={[defaultStyles.title, {padding: 16}]}>
            Paul Prae
          </h1>
          <div>
            <Button raised colored>
              Evolve
            </Button>
          </div>
        </div>
        <p style={{position: 'absolute', bottom:'8%', width: '100%'}}>
          <img src="/cute-closeup.jpg" style={[defaultStyles.image, {height: 24, padding: 8}]} />
          <Icon style={{padding: 8}} name="github" fill="black" size={24} />
          <Icon style={{padding: 8}} name="twitter" fill="black" size={24} />
          <Icon style={{padding: 8}} name="linkedin" fill="black" size={24} />
          <Icon style={{padding: 8}} name="instagram" fill="black" size={24} />
        </p>
      </div>
    );
  }
  render() {
    return(
      <Layout style={defaultStyles.container}>
        <Content style={defaultStyles.container}>
          <div style={{height: '100%', textAlign: 'center'}}>
            {this.renderIntroduction()}
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
    height: 'inherit',
    backgroundColor: 'rgb(231, 233, 232)',
    textAlign: 'center'
  }
};
