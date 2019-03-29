import React, { Component } from "react";
import arrow from "./arrow.svg";
import ticketsData from "./tickets.json";

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

const SortByNumber = (a, b) => {
  return a.price - b.price;
};

const Ticket = i => {
  return (
    <div className="ticket">
      <div className="column">
        <span className="t-logo" />
        <button className="buy-button">
          Купить
          <br /> за {i.i.price}₽
        </button>
      </div>
      <div className="column">
        <div>
          <p>{i.i.departure_time}</p>
          <div className="column">
            <p>{stops[i.i.stops]}</p>
            <img alt="arrow" src={arrow} />
          </div>
          <p>{i.i.arrival_time}</p>
        </div>
        <div>
          <div className="column">
            <p>
              {i.i.origin}, {i.i.origin_name}
            </p>
            <p>{i.i.departure_date}</p>
          </div>
          <div className="column">
            <p>
              {" "}
              {i.i.destination_name}, {i.i.destination}
            </p>
            <p>{i.i.arrival_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tikets = f => {
  const a = ticketsData.tickets.filter(function(b) {
    return b.stops === f;
    
  }
  );console.log(f);
  const c = a.sort(SortByNumber).map(function(props) {
    return <Ticket i={props} />;
  });
  return <div className="tickets">{c}</div>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: 3 };
  }
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
            <Checkbox onChange="" name="Все" />
            {checkboxes}
          </div>
          <Tikets f={this.state.filter} />
        </div>
      </div>
    );
  }
}

export default App;
