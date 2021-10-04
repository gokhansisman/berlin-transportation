import * as React from "react";
import { useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
export default function ToggleFavoriButton({ stationName, stationID }) {
  const [selected, setSelected] = React.useState(false);

  useEffect(() => {
    let favoriteStops = JSON.parse(localStorage.getItem("favorites"));
    if (favoriteStops &&
      favoriteStops.some((stop) => stop.stationName === stationName)) {
      setSelected(true);
    }
  }, [stationName]);
  
  function manageFavs(localSelected) {
    let stops = localStorage.getItem("favorites");
    if ((stops === "null" || stops == null) && localSelected === true) {
      let favs = [];
      favs.push({ stationName, stationID });
      localStorage.setItem("favorites", JSON.stringify(favs));
    }
    if (stops !== "null" && stops != null && localSelected === true) {
      let favStops = JSON.parse(localStorage.getItem("favorites"));
      favStops = [
        ...favStops,
        { stationName: stationName, stationID: stationID },
      ];
      localStorage.setItem("favorites", JSON.stringify(favStops));
    }
    if (localSelected === false) {
      let favStops = JSON.parse(localStorage.getItem("favorites"));
      favStops = favStops.filter(function (stop) {
        return stop.stationName !== stationName;
      });

      if (favStops.length === 0) {
        localStorage.setItem("favorites", null);
      } else {
        localStorage.setItem("favorites", JSON.stringify(favStops));
      }
    }
  }
  return (
    <Tooltip title={selected ? "Remove from favorites" : "Add to Favorites"}>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
          manageFavs(!selected);
        }}
        style={{ width: 20, height: 20, border: 0, background: "none",marginTop:"-4px" }}
      >
        { selected ? <StarIcon sx={{color:"#ffd700"}} /> : <StarBorderIcon /> }
      </ToggleButton>
    </Tooltip>
  );
}
