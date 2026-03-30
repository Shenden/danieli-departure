import { useEffect, useState } from "react";
import Train from "../assets/Logo";

export const TimeTable = ({ title }) => {
  const [timeTable, setTimeTable] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    /*    Note - API key grants 25 thousand requests per 30 days */
    async function FetchDeparture() {
      try {
        const response = await fetch(
          "https://api.resrobot.se/v2.1/departureBoard?id=740021668&format=json&accessId=01c3b8ea-9c3b-486e-98d8-c3291bd89e27",
        );
        const departures = await response.json();

        if (!response.ok) {
          throw new Error("failed to fetch departures...");
        }
        setTimeTable(departures.Departure);
      } catch (error) {
        setError({ message: error.message } || "something went wrong...");
      }
    }

    //call it
    FetchDeparture();
  }, []);

  if (error) {
    return <h1>{error.message}</h1>;
  }
  //get my departures
  const currentCityDeparture = timeTable.find((item) =>
    item.direction.includes("Kungsträdgården"),
  );

  const currentHomeDeparture = timeTable.find((item) =>
    item.direction.includes("Akalla"),
  );

  //const trainLine = currentCityDeparture?.ProductAtStop.line;

  console.log(timeTable);
  console.log(currentCityDeparture?.direction);

  return (
    <div>
      <header>
        <div className="train-sign">
          <h1>T</h1>
        </div>
        <div className="top-wrapper">
          <h1> {title} </h1>
          <small> {currentCityDeparture?.date} </small>
        </div>
      </header>

      <ul>
        <li>
          <div className="direction">
            <div className="line">
              <Train className="logo" />
            </div>
            <h3>Mot: {currentCityDeparture?.direction}</h3>
          </div>
          <h1>{currentCityDeparture?.time}</h1>
        </li>
        <li>
          <div className="direction">
            <div className="line">
              <Train />
            </div>
            <h3>Mot: {currentHomeDeparture?.direction}</h3>
          </div>
          <h1>{currentHomeDeparture?.time}</h1>
        </li>
      </ul>
    </div>
  );
};

/*  {timeTable.map((departure) => (
          <li key={departure.stopExtId}>
            {departure.direction} - Departure at: {departure.time}
          </li>
        ))} */
