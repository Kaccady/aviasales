import React from "react";
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
        {Math.round(props.currentTicket.price * props.filters.currency)
          .toString()
          .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")}
        {props.filters.value}
      </button>
    </div>
    <div className="wrapper">
      <div className="ticket-main">
        <div className="ticket-up">
          <p className="time">{props.currentTicket.departure_time}</p>
          <div className="plane-div">
            <p className="transfer">{stops[props.currentTicket.stops]}</p>
            <img alt="arrow" src={arrow} />
          </div>
          <p className="time">{props.currentTicket.arrival_time}</p>
        </div>
        <div className="ticket-down">
          <div className="column">
            <p className="city">
              {props.currentTicket.origin}, {props.currentTicket.origin_name}
            </p>
            <p className="date">{props.currentTicket.departure_date}</p>
          </div>
          <div className="city-div-right">
            <p className="city">
              {props.currentTicket.destination_name},{" "}
              {props.currentTicket.destination}
            </p>
            <p className="date">{props.currentTicket.arrival_date}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Tickets = props => {
  let filterByStops = ticketsData.tickets.filter(function(ticket) {
    return props.filter.indexOf(ticket.stops) !== -1;
  });

  let filterByPrice = filterByStops
    .sort(SortByNumber)
    .map(function(currentTicket, index) {
      return (
        <Ticket key={index} filters={props} currentTicket={currentTicket} />
      );
    });
  return filterByPrice[0] ? (
    <div className="tickets">{filterByPrice}</div>
  ) : (
    <div className="not-found">
      <p className="">Ни одного билета не найдено :(</p>
    </div>
  );
};
export default Tickets;
