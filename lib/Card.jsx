import _ from 'lodash';
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
  isHidden(p, styles) {
    return {
      card: {
        transform: `scale(${1-p})`,
        marginTop: Math.floor((p) * styles.businessCard.height / 2 * -1),
        marginBottom: Math.floor((p) * styles.businessCard.height / 2 * -1),
        marginLeft: Math.floor((p) * styles.businessCard.width / 2 * -1),
        marginRight: Math.floor((p) * styles.businessCard.width / 2 * -1),
        display: (1-p)?'inline-block':'none'
      }
    };
  }
  // Describe transitional states.
  isFullscreen(p, styles) {
    let height = window.document.body.clientHeight;
    let width = window.document.body.clientWidth;
    return {
      card: {
        height: pv2(p, height, styles.businessCard.height),
        width: pv2(p, width, styles.businessCard.width),
        zIndex: 999,
        //position: (p > 0.001)?'absolute': 'relative',
        top: 0
      },
      title: {
        fontSize: pv2(p, defaultStyles.cardTitle.fontSize, styles.cardTitle.fontSize),
      },
      text: {
        fontSize: pv2(p, defaultStyles.cardText.fontSize, styles.cardText.fontSize),
      }
    };
  }
  hasLinks(p, styles) {
    return {
      icons: {
        opacity: p,
        display: (p>0.1)? 'block': 'none',
        pointerEvents: (p>0.7)? 'all': 'none'
      }
    };
  }
  hasDescription(p, styles) {
    return {
      contact: {
        position: 'absolute',
        bottom:'8%',
        width: '100%',
        opacity: p,
        display: (p)? 'block': 'none'
      }
    };
  }
  hasButton(p, styles) {
    return {
      button: {
        opacity: p,
        display: (p>0.1)? 'block': 'none',
        marginTop: Math.floor((1-p) * 36 / 2 * -1),
        marginBottom: Math.floor((1-p) * 36 / 2 * -1),
      },
      titleContainerExt: {
        paddingBottom: p * 20
      },
      title: {
        marginBottom: p * 20
      }
    };
  }
  renderCard(transformations) {
    let {
      style={},
      title="",
      name="",
      buttonText="Select",
      styles: {
      },
      ...restProps
    } = this.props;
    let styles = Object.keys(transformations).reduce((styles, key) =>
      (transformations[key])?_.merge(styles, this[key](transformations[key], styles)):styles
    , this.props.styles);
    return (
      <div style={[styles.businessCard, styles.card, {cursor: (!this.props.hasButton && this.props.onClick instanceof Function)? "pointer": undefined}]}
        onClick={(this.props.hasButton)?undefined: this.props.onClick}>
        <div style={[styles.titleContainer, styles.titleContainerExt]}>
          <h6 style={[styles.cardText, styles.text]}>
            {title}
          </h6>
          <h1 style={[styles.cardTitle, styles.title, {padding: 16}]}>
            {name}
          </h1>
          <div style={[{display: 'none'}, styles.button]}>
            <Button style={{color: styles.card.backgroundColor, background: styles.text.color}} raised colored
              onClick={(this.props.hasButton)?this.props.onClick: undefined}>
              {buttonText}
            </Button>
          </div>
        </div>
        <div style={[styles.cardText, styles.businessIcons]}>
          <div style={[styles.contact, styles.text]}>
            <div style={{maxWidth: 240}}>
              I’m a solutions architect who creates collaborative web technology to improve business and society.
              I build interactive systems that augment cognitive abilities and scale impact.
            </div>
            <hr style={{borderColor: 'inherit'}} />
          </div>
          <div style={[{display: 'none'}, styles.icons]}>
            <a href="//blog.paulprae.com">
              <img src="/cute-closeup.jpg" style={[styles.image, {height: 24, padding: 8}]} />
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
      </div>
    );
  }
  // Render with transition to different states.
  render() {
    let {
      isFullscreen=false,
      isHidden=false,
      hasButton=false,
      hasLinks=false,
      hasDescription=false,
    } = this.props;
    return (
      <Motion defaultStyle={{
        isFullscreen: this.state.initialProps.isFullscreen?1:0,
        isHidden: this.state.initialProps.isHidden?1:0,
        hasLinks: this.state.initialProps.hasLinks?1:0,
        hasDescription: this.state.initialProps.hasDescription?1:0,
        hasButton: this.state.initialProps.hasButton?1:0,
      }} style={{
        isFullscreen: isFullscreen?spring(1):spring(0),
        isHidden: isHidden?spring(1):spring(0),
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
