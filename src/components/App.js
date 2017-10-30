import React, { Component } from "react";
import * as api from "../api/cards";
import Cards from "./Cards";
import "./App.scss";
import { get } from "lodash";
import twitter from "../assets/twitter.svg";

class App extends Component {
  render() {
    const getNewCards = () => {
      api.getCards().then(data => {
        const black = get(data.data, "blackCard")[0];
        const white = get(data.data, "whiteCards");

        this.setState({ cards: { black, white } });
      });
    };

    return (
      <div className="App">
        <h1 className="App-heading">Quotes Against Humanity</h1>
        <div className="follow-badge">
          <a href="" tareget="_blank">
            <img className="twitter" src={twitter} alt="" />
            @TweetsAHumanity
          </a>
        </div>
        <div className="shuffle-btn-container">
          <button className="shuffle-btn" onClick={getNewCards}>
            Shuffle
          </button>
        </div>
        <Cards cards={this.state ? this.state.cards : undefined} />
      </div>
    );
  }
}

export default App;
