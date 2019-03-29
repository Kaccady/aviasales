import React, { Component } from "react";
import arrow from "./arrow.svg";
import ticketsData from "./tickets.json";

/*const Checkbox = props => {
  return (
    <div className="checkbox">
      <input type="checkbox"/>
      {props.name}
    </div>
  );
};


const checkboxes = stops.map(function(props) {
  return <Checkbox name={props} />;
});*/
const stops = ["", "1 Пересадка", "2 Пересадки", "3 Пересадки"];

const SortByNumber = (a, b) => a.price - b.price;

const Ticket = props => (
  <div className="ticket">
    <div className="column">
      <span className="t-logo" />
      <button className="buy-button">
        Купить
        <br /> за {props.i.price}₽
      </button>
    </div>
    <div className="column">
      <div>
        <p>{props.i.departure_time}</p>
        <div className="column">
          <p>{stops[props.i.stops]}</p>
          <img alt="arrow" src={arrow} />
        </div>
        <p>{props.i.arrival_time}</p>
      </div>
      <div>
        <div className="column">
          <p>
            {props.i.origin}, {props.i.origin_name}
          </p>
          <p>{props.i.departure_date}</p>
        </div>
        <div className="column">
          <p>
            {" "}
            {props.i.destination_name}, {props.i.destination}
          </p>
          <p>{props.i.arrival_date}</p>
        </div>
      </div>
    </div>
  </div>
);
const Tikets = props => {
  const a = ticketsData.tickets.filter(function(b) {
    return b.stops === props.f;
  });

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
  Check = (e) => {
    this.setState({filter: Number(e.target.id)})
  };
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
            <div><input type="checkbox" onChange={this.Check} />Все</div>
            <div><input id='0' type="checkbox" onChange={this.Check} />Без пересадок</div>
            <div><input id='1' type="checkbox" onChange={this.Check} />1 пересадка</div>
            <div><input id='2' type="checkbox" onChange={this.Check} />2 пересадки</div>
            <div><input id='3' type="checkbox" onChange={this.Check} />3 пересадки</div>
         
          </div>
          <Tikets f={this.state.filter} />
        </div>
      </div>
    );
  }
}

export default App;
