const API_URL = 'https://v5.vbb.transport.rest'
export const fetch_from_stations_action = (search) => {
  return (dispatch) => {
    return fetch(`${API_URL}/stations?query=${search}`)
      .then((res) => res.json())
      .then((json) => {
        if (Object.keys(json).length === 0) {
          localStorage.setItem("available", null);
        }

        let data = Object.values(json).map((data) => ({
          stops: data.stops,
          locations: data.location,
        }));
        let result = data.reduce((acc, curr) => {
          let stop = curr.stops[0];

          let stopData = { name: stop.name, station: stop.station };

          fetch(`${API_URL}/${stop.station}`)
            .then((res) => res.json())
            .then((json) => {
              localStorage.setItem(
                "available",
                JSON.stringify(json.lines.map((line) => line.mode + " "))
              );
            })
            .catch((error) => {
              dispatch({
                type: "FETCH_SUCCESS_FROM",
                payload: {
                  fromStops: JSON.parse(localStorage.getItem("offline")),
                  onlineStatus: false,
                },
              });
            });

          return acc.concat(stopData);
        }, []);

        dispatch({
          type: "FETCH_SUCCESS_FROM",
          payload: {
            fromStops: result,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "FETCH_SUCCESS_FROM",
          payload: {
            fromStops: JSON.parse(localStorage.getItem("offline")),
            onlineStatus: false,
          },
        });
      });
  };
};
export const fetch_to_stations_action = (search) => {
  return (dispatch) => {
    return fetch(`${API_URL}/stations?query=${search}`)
      .then((res) => res.json())
      .then((json) => {
        let data = Object.values(json).map((data) => ({
          stops: data.stops,
          locations: data.location,
        }));
        let result = data.reduce((acc, curr) => {
          let stop = curr.stops[0];
          let stopData = { name: stop.name, station: stop.station };

          return acc.concat(stopData);
        }, []);
        dispatch({
          type: "FETCH_SUCCESS_TO",
          payload: {
            toStops: result,
          },
        });
      });
  };
};

export const fetch_departures = (stationID, duration) => {
  if (duration === undefined || duration === "") {
    duration = 10;
  }
  return (dispatch) => {
    return fetch(
        `${API_URL}/stops/${stationID}/departures?duration=${duration}`
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: "FETCH_SUCCESS_DEPARTURES",
          payload: {
            departures: json,
            isLoading: false,
          },
        });
      })
      .catch((error) => {
        const data = JSON.parse(localStorage.getItem("offline"));
        const offlineData = data.find((stop) => stop.stationID == stationID).stops
        
        dispatch({
          type: "FETCH_SUCCESS_DEPARTURES",
          payload: {
            departures: offlineData.filter((trip) => Date.parse(trip.plannedWhen) > Date.now()),
          },
        });
      });
  };
};
