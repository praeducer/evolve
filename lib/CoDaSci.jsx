import React from 'react';
import Radium from 'radium';
import { BusinessCard } from '/lib/Card.jsx';
import { ChatBot } from '/lib/ChatBot.jsx';
import { Grid, Cell } from 'react-mdl';

@Radium
export class CoDaSci extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div style={defaultStyles.container}>
        <Grid>
          <Cell offset={4} col={4} phone={12}>
            The future is starting, and we're here to help.
            The websites of the:
            will mold themselves to a user.
            will change as their users change.
            will interact with their users.
            will understand their users.
          </Cell>
          <Cell offset={4} col={4} phone={12}>
            <ChatBot />
          </Cell>
          <Cell col={12}>
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
          </Cell>
          <Cell col={12}>
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
            </Grid>
          </Cell>
        </Grid>
      </div>
    );
  }
}

let defaultStyles = {
  container: {
    textAlign: 'center'
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
