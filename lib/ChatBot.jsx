import React from 'react';
import Radium from 'radium';
import { Badge } from 'react-mdl';

@Radium
export class ChatBot extends React.Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      showAll: false
    }
  }
  componentDidMount() {
    this.setState({
      chats: this.props.chats.reduce(this.pushChat, this.state.chats)
    });
  }
  componentWillReceiveProps(props) {
    /*this.setState({
      chats: props.chats.reduce(this.pushChat, this.state.chats)
    });*/
  }
  pushChat(chats, chat) {
    let tail = chats[chats.length - 1];
    let time = (tail === undefined)? +new Date: tail.start;
    chats.push({
      start: time + (0.25 * 1000), // 4 Second Overlap
      expires: (1 * 1000) + time, // 8 Second Show
      message: chat.message
    });
    return chats;
  }

  filterDisplay(chats, chat) {
    let time = +new Date()
    if (this.state.showAll) {
      chats.push(chat);
    } else if (time >= chat.start && time < chat.expires) {
      chats.push(chat);
    }
    return chats;
  }

  renderFace() {
    return (
      <div style={[defaultStyles.image, this.props.styles.imageContainer]}>
        <img style={[defaultStyles.image]} src={this.props.avatar}/>
      </div>
    );
  }

  renderMessage(message) {
    return (
      <div style={[defaultStyles.chat, this.props.styles.chat]}>
        {message}
      </div>
    );
  }

  renderChat({message=""}, iter) {
    return(
      <div style={[defaultStyles.container, this.props.styles.container]} key={iter}>
        {this.renderFace()}
        {this.renderMessage(message)}
      </div>
    );
  }

  render() {
    // Refresh every half a second.
    setTimeout(this.forceUpdate.bind(this), 500);
    return (
      <div style={this.props.style}>
        <div onClick={()=> this.setState({showAll: !this.state.showAll})}>
          <Badge
            text={this.state.chats.length}>
            {this.renderFace()}
          </Badge>
        </div>
        <div>
          {this.state.chats.reduce(this.filterDisplay.bind(this), []).map(this.renderChat, this)}
        </div>
      </div>
    );
  }
}

ChatBot.defaultProps = {
  chats: [],
  styles: {},
  avatar: "https://image.spreadshirtmedia.com/image-server/v1/designs/12582273,width=178,height=178/cute-robot-child-face.png"
}

let defaultStyles = {
  container: {
    marginTop: 15,
    marginBottom: 20
  },
  image: {
    height: 44,
    width: 44,
    display: 'inline-block',
    verticalAlign: 'top'
  },
  chat: {
    margin: 12,
    padding: 12,
    overflowWrap: 'break-word',
    display: 'inline-block',
    color: 'white',
    backgroundColor: '#4e4f4c',
    borderRadius: '0px 4px 4px 4px',
    verticalAlign: 'top'
  }
}

