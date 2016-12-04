import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import {
  Grid, Cell,
  Layout, Header, Navigation, Content
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
      <a key={title} href={location}>title</a>
    );
  }
  render() {
    return(
      <Layout style={defaultStyles.container}>
        <Header title="Paul Prae" style={defaultStyles.header}>
          <Navigation>
            {this.props.sections.map(this.renderNavigation, this)}
          </Navigation>
        </Header>
        <Content>
          <Tiles>
            <Cell offset={4} col={4} phone={12}>
              The future is starting, and we're here to help.
              The websites of the future:
              will mold themselves to a user.
              will change as their users change.
              will interact with their users.
              will understand their users.
            </Cell>
            <div>
              <h4 style={{textAlign: 'left'}}>
                No man is an island.
              </h4>
              <Grid>
                <Cell col={6} phone={12}>
                  Austin New
                </Cell>
                <Cell col={6} phone={12}>
                  David Prae
                </Cell>
                <Cell col={6} phone={12}>
                  Kristin Ottofy
                </Cell>
              </Grid>
            </div>
            <div>
              <Grid>
                <Cell col={6} phone={12}>
                  <h2>
                    <img src="/cute-closeup.jpg" style={[
                      defaultStyles.image, defaultStyles.largeImage]} />
                  </h2>
                </Cell>
                <Cell col={6} phone={12}>
                  <div style={[defaultStyles.businessCard]}>
                    <h2 style={defaultStyles.title}>
                      Paul Prae
                    </h2>
                    <h3>
                      Software Engineer, Data Scientist
                    </h3>
                    <p>
                      I’m a solutions architect who creates collaborative web technology to improve business and society. I build interactive systems that augment cognitive abilities and scale impact.
                    </p>
                  </div>
                </Cell>
              </Grid>
            </div>
            <div>
              {this.state.selectedStyles.map((styles, i) =>
                <BusinessCard key={i} style={defaultStyles.businesscard} styles={styles} />
              )}
            </div>
            <GeneticThemeDemo onChoice={({traits: {style}}) => {
              this.setState({selectedStyles: this.state.selectedStyles.concat(style)});
            }} />
        </Tiles>
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
    borderRadius: '50%'
  },
  largeImage: {
    maxHeight: 200,
    width: 'auto'
  },
  businessCard: {
    textAlign: 'left'
  }
};
