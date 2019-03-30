import React, { Component } from "react";
import arrow from "./arrow.svg";
import ticketsData from "./tickets.json";

const stops = ["", "1 ПЕРЕСАДКА", "2 ПЕРЕСАДКИ", "3 ПЕРЕСАДКИ"];

const SortByNumber = (a, b) => a.price - b.price;

const Ticket = props => (
  <div className="ticket">
    <div className="ticket-side">
      <span className="t-logo" />
      <button className="button-buy">
        Купить
        <br /> за {Math.round(props.i.price * props.y.currency)}
        {props.y.value}
      </button>
    </div>
    <div className="ticket-main">
      <div className='ticket-up'>
        <p className='time'>{props.i.departure_time}</p>
        <div className="column">
          <p className='transfer'>{stops[props.i.stops]}</p>
          <img alt="arrow" src={arrow} />
        </div>
        <p className='time'>{props.i.arrival_time}</p>
      </div>
      <div className='ticket-down'>
        <div className="column">
          <p className='city'>
            {props.i.origin}, {props.i.origin_name}
          </p>
          <p className='date'>{props.i.departure_date}</p>
        </div>
        <div className="column">
          <p className='city'>
            {props.i.destination_name}, {props.i.destination}
          </p>
          <p className='date'>{props.i.arrival_date}</p>
        </div>
      </div>
    </div>
  </div>
);

const Tikets = props => {
  const filterByStops = ticketsData.tickets.filter(function(ticket) {
    return props.filter.indexOf(ticket.stops) !== -1;
  });

  const filterByPrice = filterByStops.sort(SortByNumber).map(function(y) {
    return <Ticket y={props} i={y} />;
  });
  return <div className="tickets">{filterByPrice}</div>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [0, 1, 2, -1],
      isCheckedAll: false,
      currency: 1,
      value: "₽"
    };
  }

  Check = e => {
    if (e.target.checked) {
      const a = this.state.filter;
      a.splice(e.target.id, 1, Number(e.target.id));
      this.setState({ filter: a });
    } else {
      const a = this.state.filter;
      a.splice(e.target.id, 1, -1);
      this.setState({ filter: a });
    }
    if (this.state.filter.indexOf(-1) === -1) {
      this.setState({ isCheckedAll: true });
    } else {
      this.setState({ isCheckedAll: false });
    }
  };

  CheckAll = e => {
    if (e.target.checked) {
      this.setState({ filter: [0, 1, 2, 3], isCheckedAll: true });
    } else {
      this.setState({ filter: [-1, -1, -1, -1], isCheckedAll: false });
    }
  };

  Currency = e => {
    // eslint-disable-next-line
    switch (e.target.innerText) {
      case "RUB":
        this.setState({ currency: 1, value: "₽" });
        break;
      case "USD":
        this.setState({ currency: 0.015, value: "$" });
        break;
      case "EUR":
        this.setState({ currency: 0.014, value: "€" });
    }
  };

  render() {
    return (
      <div className="App">
        <span className="logo" />
        <div className="content">
          <div className="filters">
            <p>ВАЛЮТА</p>
            <div className="buttons">
              <button onClick={this.Currency}>RUB</button>
              <button onClick={this.Currency}>USD</button>
              <button onClick={this.Currency}>EUR</button>
            </div>
            <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
            <div>
              <input
                checked={this.state.isCheckedAll}
                id="all"
                type="checkbox"
                onChange={this.CheckAll}
              />
              Все
            </div>
            <div>
              <input
                id="0"
                checked={this.state.filter[0] !== -1}
                defaultChecked="true"
                type="checkbox"
                onChange={this.Check}
              />
              Без пересадок
            </div>
            <div>
              <input
                id="1"
                checked={this.state.filter[1] !== -1}
                defaultChecked="true"
                type="checkbox"
                onChange={this.Check}
              />
              1 пересадка
            </div>
            <div>
              <input
                id="2"
                checked={this.state.filter[2] !== -1}
                defaultChecked="true"
                type="checkbox"
                onChange={this.Check}
              />
              2 пересадки
            </div>
            <div>
              <input
                id="3"
                checked={this.state.filter[3] !== -1}
                type="checkbox"
                onChange={this.Check}
              />
              3 пересадки
            </div>
          </div>
          <Tikets
            value={this.state.value}
            currency={this.state.currency}
            filter={this.state.filter}
          />
        </div>
      </div>
    );
  }
}

export default App;
