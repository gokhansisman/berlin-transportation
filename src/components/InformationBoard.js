import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetch_departures } from ".././store/actions/actions";

import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import TrainIcon from "@mui/icons-material/Train";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Moment from "react-moment";

function Logo(props) {
  const mode = props.mode;
  if (mode === "bus") {
    return <DirectionsBusFilledIcon color="primary" />;
  }
  if (mode === "train") {
    return <TrainIcon />;
  }
}

function InformationBoard({ information }) {
  const detailsDispatch = useDispatch();
  useEffect(() => {
    detailsDispatch(fetch_departures(localStorage.curStop));
  }, [detailsDispatch]);

  return (
    information &&
    information.map((data, index) => (
      <div className="info-board-container" key={index}>
        <div className="line">{data.direction}</div>
        <div className="info-time">
          <AccessTimeIcon fontSize="16" />
          
          <div
            title={data.plannedWhen
              .replace("T", " ")
              .substring(0, data.plannedWhen.length - 6)}
          >
            <Moment date={data.plannedWhen} fromNow />
          </div>
        </div>
        <div
          className="info-mode"
          style={{
            backgroundColor: (data.line.color && data.line.color.bg) || "#fff",
            color: (data.line.color && data.line.color.fg) || "black",
          }}
        >
          <div className="info-mode-first">{data.line.name}</div>
          <Logo mode={data.line.mode} />
        </div>
      </div>
    ))
  );
}

export default InformationBoard;
