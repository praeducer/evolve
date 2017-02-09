import React from 'react';
import Radium from 'radium';
import Icon from 'react-simple-icons';
import { Motion, spring } from 'react-motion';

import { defaultStyles } from '/lib/defaultStyles';

import {
  Card, CardTitle, CardText,
  Grid, Cell,
  Layout, Header, Navigation, Content,
  Button, IconButton,
  Tooltip
} from 'react-mdl';

function pv2(p, a, b){
  return Math.min(a, b) + Math.abs(a - b) * p;
}

@Radium
export class BusinessCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialProps: props
    };
  }
  pageScale() {
    return Math.min(window.document.body.clientWidth / (3 * defaultStyles.businessCard.width), window.document.body.clientHeight /(4 * defaultStyles.businessCard.height));
  }
  // Describe transitional states.
  isFullscreen(p, styles) {
    let scale = this.pageScale();
    let height = window.document.body.clientHeight;
    let width = window.document.body.clientWidth;
    styles.card = {
      height: pv2(p, height, styles.businessCard.height),
      width: pv2(p, width, styles.businessCard.width),
      //marginTop: Math.floor((scale) * height / 2 * -1),
      //marginBottom: Math.floor((scale) * height / 2 * -1),
      //marginLeft: Math.floor((scale) * width / 2 * -1),
      //marginRight: Math.floor((scale) * width / 2 * -1),
      //transform: `scale(${scale})`
    }
    //styles.text = {
      //position: 'absolute',
      //top: '50%'
    //}
    return styles;
  }
  hasLinks(p, styles) {
    return styles;
  }
  hasDescription(p, styles) {
    styles.contact = {
      position: 'absolute',
      bottom:'8%',
      width: '100%',
      opacity: p,
      display: (p)? 'block': 'none'
    };
    return styles;
  }
  hasButton(p, styles) {
    styles.button = {
      opacity: p,
      display: (p)? 'block': 'none'
    }
    return styles;
  }
  renderCard(transformations) {
    let {
      style={},
      title="",
      name="",
      buttonText="",
      ...restProps
    } = this.props;
    let styles = Object.keys(transformations).reduce((styles, key) =>
      this[key](transformations[key], styles)
    , this.props.styles);
    return (
      <div style={[defaultStyles.introduction, styles.card]}
        onClick={(this.props.showButton)?undefined: this.props.onClick}>
        <div style={[styles.title]}>
          <h6 style={[styles.text]}>
            {title}
          </h6>
          <h1 style={[styles.title, {padding: 16}]}>
            {name}
          </h1>
          <div style={styles.button}>
            <Button style={{color: styles.card.backgroundColor, background: styles.text.color}} raised colored
              onClick={(this.props.showButton)?this.props.onClick: undefined}>
              {buttonText}
            </Button>
          </div>
        </div>
        <div style={[styles.text, styles.icons]}>
          <div style={[styles.contact]}>
            <div style={{maxWidth: 240}}>
              I’m a solutions architect who creates collaborative web technology to improve business and society.
              I build interactive systems that augment cognitive abilities and scale impact.
            </div>
            <hr style={{borderColor: 'inherit'}} />
          </div>
          <a href="//blog.paulprae.com">
            <img src="/cute-closeup.jpg" style={[defaultStyles.image, {height: 24, padding: 8}]} />
          </a>
          <a href="https://github.com/praeducer" >
            <Icon style={{padding: 8}} fill={styles.title.color || styles.icon.fill} size={styles.icon.size} name="github" />
          </a>
          <a href="https://twitter.com/praeducer" >
            <Icon style={{padding: 8}} fill={styles.title.color || styles.icon.fill} size={styles.icon.size} name="twitter" />
          </a>
          <a href="https://linkedin.com/in/paulprae" >
            <Icon style={{padding: 8}} fill={styles.title.color || styles.icon.fill} size={styles.icon.size} name="linkedin" />
          </a>
          <a href="https://instagram.com/praeducer" >
            <Icon style={{padding: 8}} fill={styles.title.color || styles.icon.fill} size={styles.icon.size} name="instagram" />
          </a>
        </div>
      </div>
    );
  }
  // Render with transition to different states.
  render() {
    let {
      isFullscreen=false,
      hasButton=false,
      hasLinks=false,
      hasDescription=false,
    } = this.props;
    return (
      <Motion defaultStyle={{
        isFullscreen: this.state.initialProps.isFullscreen?1:0,
        hasLinks: this.state.initialProps.hasLinks?1:0,
        hasDescription: this.state.initialProps.hasDescription?1:0,
        hasButton: this.state.initialProps.hasButton?1:0,
      }} style={{
        isFullscreen: isFullscreen?spring(1):spring(0),
        hasLinks: hasLinks?spring(1):spring(0),
        hasDescription: hasDescription?spring(1):spring(0),
        hasButton: hasButton?spring(1):spring(0),
      }}>
        {this.renderCard.bind(this)}
      </Motion>
    );
  }
}

BusinessCard.defaultProps = {
  styles: defaultStyles,
  title: "Software & Data Science"
}
