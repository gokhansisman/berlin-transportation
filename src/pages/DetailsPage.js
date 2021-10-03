import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetch_departures } from ".././store/actions/actions";

import Departures from "../components/Departures";
import LoaderGif from "../loading.svg";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ToggleFavoriButton from "../components/ToggleFavoriButton";
import TimerIcon from "@mui/icons-material/Timer";

function DetailsPage() {
  const { departures, isLoading } = useSelector((state) => state.detail);
  const detailsDispatch = useDispatch();

  let stationID = localStorage.getItem("curStop");
  let stationName = localStorage.getItem("curStopName");
  const [duration, setDuration] = React.useState(10);

  useEffect(() => {
    detailsDispatch(fetch_departures(stationID, duration));
  }, [stationID, duration, detailsDispatch]);

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  if (departures != null) {
    let offlineData = JSON.parse(localStorage.getItem("offline"));
    if (offlineData == null) {
      offlineData = [];
      offlineData = [
        ...offlineData,
        { stationName: stationName, stationID: stationID, stops: departures },
      ];
    } else {
      if (
        !JSON.parse(localStorage.getItem("offline")).some(
          (stop) => stop.stationName === stationName
        )
      ) {
        offlineData = [
          ...offlineData,
          { stationName: stationName, stationID: stationID, stops: departures },
        ];
      }
    }

    localStorage.setItem("offline", JSON.stringify(offlineData));
  }

  return (
    <div className="main-container">
      <div className="main-header">
        <div className="back-button">
          <a href="/">
            <IconButton aria-label="back">
              <ArrowBackIcon />
            </IconButton>
          </a>
          <div className="duration">
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-label">
                Duration <TimerIcon />
              </InputLabel>
              <Select
                value={duration}
                label="Duration(m)"
                onChange={handleChange}
              >
                <MenuItem value={10}>10min</MenuItem>
                <MenuItem value={60}>60min</MenuItem>
                <MenuItem value={120}>120min</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <h3>
            {stationName}{" "}
            <ToggleFavoriButton
              stationName={stationName}
              stationID={stationID}
            />
          </h3>
        </div>
        <div className="departures-text">Departures</div>
      </div>
      <div className="info-board-titles">
        <div>Line</div>
        <div>Time</div>
        <div>Transport</div>
      </div>
      {isLoading ? (
        <div>
          <img src={LoaderGif} className="spinner" alt="loading" />
        </div>
      ) : (
        <div className="info-board-body-container">
          <Departures information={departures} />
        </div>
      )}
    </div>
  );
}
export default DetailsPage;
