import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { BusinessCard } from '/lib/Card.jsx';
import { ChatBot } from '/lib/ChatBot.jsx';

@Radium
export class App extends React.Component {
  constructor() {
    super();
    // I should probably store the default theme somewhere else.
    // How hard would it be to consume css for the default state?
    this.state = {
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
  render() {
    return(
      <div style={defaultStyles.container}>
        <BusinessCard style={defaultStyles.businesscard} styles={this.state.theme.businessCard} />
        <ChatBot style={defaultStyles.chatbot} chats={this.getChats()} styles={{chat: {maxWidth: 214}}} />
        <div>
        </div>
      </div>
    );
    // Input/Output conversation
    // Stagger the input to reflect conversation flow?
    //
  }
}

let defaultStyles = {
  container: {
    width: 330,
    margin: 'auto'
  },
  businesscard: {
    marginTop: 60
  },
  chatbot: {
    margin: 12
  }
};
