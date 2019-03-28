import React, { Component } from "react";
import arrow from "./arrow.svg";

const Checkbox = props => {
  return (
    <div className="checkbox">
      <input type="checkbox" />
      {props.name}
    </div>
  );
};

const stops = ["Без пересадок", "1 Пересадка", "2 Пересадки", "3 Пересадки"];
const checkboxes = stops.map(function(props) {
  return <Checkbox name={props} />;
});
const i = {
  origin: "VVO",
  origin_name: "Владивосток",
  destination: "TLV",
  destination_name: "Тель-Авив",
  departure_date: "12.05.18",
  departure_time: "16:20",
  arrival_date: "12.05.18",
  arrival_time: "22:10",
  carrier: "TK",
  stops: 3,
  price: 12400
};

class Ticket extends Component {
  render() {
    return (
      <div className="ticket">
        <div className="column">
          <span className="t-logo" />
          <button className="buy-button">
            Купить
            <br /> за {i.price}₽
          </button>
        </div>
        <div className="column">
          <div>
            <p>{i.departure_time}</p>
            <div className="column">
              <p>{stops[i.stops]}</p>
              <img alt="arrow" src={arrow} />
            </div>
            <p>{i.arrival_time}</p>
          </div>
          <div>
            <div className="column">
              <p>{i.origin}, {i.origin_name}</p>
              <p>{i.departure_date}</p>
            </div>
            <div className="column">
              <p> {i.destination_name}, {i.destination}</p>
              <p>{i.arrival_date}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <span className="logo" />
        <div className="content">
          <div className="filters">
            <p>ВАЛЮТА</p>
            <div className="buttons">
              <button>RUB</button>
              <button>USD</button>
              <button>EUR</button>
            </div>
            <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
            <Checkbox name="Все" />
            {checkboxes}
          </div>
          <div className="tickets">
            <Ticket />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
