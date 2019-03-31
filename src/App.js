import React, { Component } from "react";
import arrow from "./arrow.svg";
import ticketsData from "./tickets.json";

const stops = ["⠀", "1 ПЕРЕСАДКА", "2 ПЕРЕСАДКИ", "3 ПЕРЕСАДКИ"];

const SortByNumber = (a, b) => a.price - b.price;

const Ticket = props => (
  <div className="ticket">
    <div className="ticket-side">
      <span className="t-logo" />
      <button className="button-buy">
        Купить
        <br /> за{" "}
        {Math.round(props.i.price * props.y.currency)
          .toString()
          .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")}
        {props.y.value}
      </button>
    </div>
    <div className="wrapper">
      <div className="ticket-main">
        <div className="ticket-up">
          <p className="time">{props.i.departure_time}</p>
          <div className="plane-div">
            <p className="transfer">{stops[props.i.stops]}</p>
            <img alt="arrow" src={arrow} />
          </div>
          <p className="time">{props.i.arrival_time}</p>
        </div>
        <div className="ticket-down">
          <div className="column">
            <p className="city">
              {props.i.origin}, {props.i.origin_name}
            </p>
            <p className="date">{props.i.departure_date}</p>
          </div>
          <div className="city-div-right">
            <p className="city">
              {props.i.destination_name}, {props.i.destination}
            </p>
            <p className="date">{props.i.arrival_date}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Tickets = props => {
  const filterByStops = ticketsData.tickets.filter(function(ticket) {
    return props.filter.indexOf(ticket.stops) !== -1;
  });

  const filterByPrice = filterByStops.sort(SortByNumber).map(function(y) {
    return <Ticket y={props} i={y} />;
  });
  return filterByPrice[0] ? (
    <div className="tickets">{filterByPrice}</div>
  ) : (
    <div className="not-found">
      <p className="">Ни одного билета не найдено :(</p>
    </div>
  );
};

const CheckBox = a => (
  <div id={a.c} className="checkbox-div">
    <div onClick={a.a} checked={a.b} id={a.c} className="checkbox-in-div">
      <span
        id={a.c}
        className={a.b ? "checkbox" : "checkbox checked"}
        type="checkbox"
      />
      <p id={a.c} className="transfer-filter">
        {a.d}
      </p>
    </div>
    <p onClick={a.e} id={a.c} className="transfer-filter-hidden">
      {a.c !== 666 ? "ТОЛЬКО" : ""}
    </p>
  </div>
);
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
    if (this.state.filter[e.target.id] === -1) {
      const a = this.state.filter;
      a.splice(e.target.id, 1, Number(e.target.id));
      this.setState({ filter: a });
    } else {
      const a = this.state.filter;
      this.state.filter.splice(e.target.id, 1, -1);
      this.setState({ filter: a });
    }
    if (this.state.filter.indexOf(-1) === -1) {
      this.setState({ isCheckedAll: true });
    } else {
      this.setState({ isCheckedAll: false });
    }
  };

  CheckAll = () => {
    if (!this.state.isCheckedAll) {
      this.setState({ filter: [0, 1, 2, 3], isCheckedAll: true });
    } else {
      this.setState({ filter: [-1, -1, -1, -1], isCheckedAll: false });
    }
  };
  CheckOne = e => {
  const arr =[-1, -1, -1, -1];
  arr.splice(e.target.id, 1, Number(e.target.id));
  this.setState({ filter: arr, isCheckedAll: false });
  }

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
            <p className="numberOfTransfers">ВАЛЮТА</p>
            <div className="buttons">
              <button className={((this.state.value==='₽')?'active':'')+" currency-button rub-button"} onClick={this.Currency}>
                RUB
              </button>
              <button className={((this.state.value==='$')?'active':'')+" currency-button usd-button"} onClick={this.Currency}>
                USD
              </button>
              <button className={((this.state.value==='€')?'active':'')+" currency-button eur-button"} onClick={this.Currency}>
                EUR
              </button>
            </div>
            <p className="numberOfTransfers">КОЛИЧЕСТВО ПЕРЕСАДОК</p>
            <CheckBox
              a={this.CheckAll}
              b={!this.state.isCheckedAll}
              c={666}
              d="Все"
              e={this.CheckOne}
            />
            <CheckBox
              a={this.Check}
              b={this.state.filter[0] === -1}
              c={0}
              d="Без пересадок"
              e={this.CheckOne}
            />
            <CheckBox
              a={this.Check}
              b={this.state.filter[1] === -1}
              c={1}
              d="1 пересадка"
              e={this.CheckOne}
            />
            <CheckBox
              a={this.Check}
              b={this.state.filter[2] === -1}
              c={2}
              d="2 пересадки"
              e={this.CheckOne}
            />
            <CheckBox
              a={this.Check}
              b={this.state.filter[3] === -1}
              c={3}
              d="3 пересадки"
              e={this.CheckOne}
            />
          </div>
          <Tickets
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
