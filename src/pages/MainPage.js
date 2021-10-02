import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetch_from_stations_action } from ".././store/actions/actions";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import ".././App.css";

function MainPage() {
  const [from, setFrom] = useState("");
  const [fromStation, setFromStation] = useState(null);
  const { fromStops } = useSelector((state) => state.search);
  const searchDispatch = useDispatch();
  let history = useHistory();
  let favoriteStops = JSON.parse(localStorage.getItem("favorites"));

  useEffect(() => {
    searchDispatch(fetch_from_stations_action(from));
  }, [from, searchDispatch]);

  let availableVehicle = [
    ...new Set(JSON.parse(localStorage.getItem("available"))),
  ];

  function navigateToDetail(param) {
    localStorage.setItem("curStop", param.station);
    localStorage.setItem("curStopName", param.name);

    history.push(`/station/${param.station}`);
  }
  function navigateFromFavs(name, ID) {
    setFromStation(name);
    localStorage.setItem("curStop", ID);
    localStorage.setItem("curStopName", name);
    history.push(`/station/${ID}`);
  }

  return (
    <div className="main-container">
      <h1>Where do you want to go?</h1>
      <div>
        Available transports:{" "}
        <span style={{ fontWeight: "bold" }}>{availableVehicle}</span>
        <Autocomplete
          value={fromStation}
          onChange={(event, newValue) => {
            setFromStation(newValue);
            navigateToDetail(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setFrom(newInputValue);
          }}
          options={fromStops}
          getOptionLabel={option => (option.name)}
          style={{ width: 420 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search through stops"
            />
          )}
        />
      </div>
      <div className="fav-stops-container">
        <div className="fav-stops-header">Favorite Stops</div>

        {favoriteStops &&
          favoriteStops.map((stop, index) => (
            <div
              key={index}
              className="fav-stops"
              onClick={(e) =>
                navigateFromFavs(stop.stationName, stop.stationID)
              }
            >
              {stop.stationName}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MainPage;
