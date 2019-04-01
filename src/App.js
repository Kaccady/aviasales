import React, { Component } from "react";
import CheckBox from "./checkbox.jsx";
import Tickets from "./tickets.jsx";

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
    let a = this.state.filter;
    if (this.state.filter[e.target.id] === -1) {
      a.splice(e.target.id, 1, Number(e.target.id));
    } else {
      a.splice(e.target.id, 1, -1);
    }
    this.setState({
      filter: a,
      isCheckedAll: !(this.state.filter.indexOf(-1) !== -1)
    });
  };

  CheckAll = () => {
    if (!this.state.isCheckedAll) {
      this.setState({ filter: [0, 1, 2, 3], isCheckedAll: true });
    } else {
      this.setState({ filter: [-1, -1, -1, -1], isCheckedAll: false });
    }
  };
  CheckOne = e => {
    let arr = [-1, -1, -1, -1];
    arr.splice(e.target.id, 1, Number(e.target.id));
    this.setState({ filter: arr, isCheckedAll: false });
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
            <p className="numberOfTransfers">ВАЛЮТА</p>
            <div className="buttons">
              <button
                className={
                  (this.state.value === "₽" ? "active" : "") +
                  " currency-button rub-button"
                }
                onClick={this.Currency}
              >
                RUB
              </button>
              <button
                className={
                  (this.state.value === "$" ? "active" : "") +
                  " currency-button usd-button"
                }
                onClick={this.Currency}
              >
                USD
              </button>
              <button
                className={
                  (this.state.value === "€" ? "active" : "") +
                  " currency-button eur-button"
                }
                onClick={this.Currency}
              >
                EUR
              </button>
            </div>
            <p className="numberOfTransfers">КОЛИЧЕСТВО ПЕРЕСАДОК</p>
            <CheckBox
              props={this.CheckAll}
              checked={this.state.isCheckedAll}
              id={666}
              text="Все"
            />
            <CheckBox
              props={this.Check}
              checked={this.state.filter[0] !== -1}
              id={0}
              text="Без пересадок"
              func={this.CheckOne}
            />
            <CheckBox
              props={this.Check}
              checked={this.state.filter[1] !== -1}
              id={1}
              text="1 пересадка"
              func={this.CheckOne}
            />
            <CheckBox
              props={this.Check}
              checked={this.state.filter[2] !== -1}
              id={2}
              text="2 пересадки"
              func={this.CheckOne}
            />
            <CheckBox
              props={this.Check}
              checked={this.state.filter[3] !== -1}
              id={3}
              text="3 пересадки"
              func={this.CheckOne}
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
