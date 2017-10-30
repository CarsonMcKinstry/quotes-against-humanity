import React, { Component } from "react";
import Card from "./card";
import { map } from "lodash";

class Cards extends Component {
  render() {
    if (this.props.cards) {
      const { black, white } = this.props.cards;

      const blackCard = <Card type="black" text={black.text} />;
      const whiteCards = map(white, card => {
        return <Card type="white" text={card.text} key="card._id" />;
      });

      return (
        <div>
          <div className="cardRow">{blackCard}</div>
          <div className="cardRow">{whiteCards}</div>
        </div>
      );
    } else {
      return (
        <div className="cardRow">
          <h2>Nothing yet</h2>
        </div>
      );
    }
  }
}

Cards.propTypes = {};

export default Cards;
