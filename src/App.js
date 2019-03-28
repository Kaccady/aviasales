import React, { Component } from "react";

const Checkbox = props => {
  return (
    <div className="checkbox">
      <input type="checkbox" />
      {props.name}
    </div>
  );
};

const elems = [
  "Без пересадок",
  "1 Пересадка",
  "2 Пересадки",
  "3 Пересадки"
].map(function(props) {
  return <Checkbox name={props} />;
});

class Ticket extends Component {
  render() {
    return <div className='ticket'> <div className='column'><a href='/'className='t-logo'/>
    <button className='buy-button'>купить за 21 032 р</button></div>
    </div>
    ;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="/" className="logo" />
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
            {elems}
          </div>
          <div className="tickets"><Ticket/></div>
        </div>
      </div>
    );
  }
}

export default App;
