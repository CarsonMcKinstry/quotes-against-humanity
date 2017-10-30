import React, { Component } from "react";
import "./cards.scss";

class Card extends Component {
  render() {
    const { type, text } = this.props;

    const cardClassName = () => {
      return `${type} card`;
    };

    return <div className={cardClassName()}>{text}</div>;
  }
}

Card.propTypes = {};

export default Card;
