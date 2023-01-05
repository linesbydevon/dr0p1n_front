import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";

export default function Homepage() {
  const [spots, setSpots] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  let {
    baseURL,
    mapboxAccessToken,
    clickedCoordinates,
    setClickedCoordinates,
  } = useContext(AuthContext);
  let navigate = useNavigate();
  const getSpots = async () => {
    let response = await axios.get(`${baseURL}/api/spots`);
    let data = await response.data;
    setSpots(data);
  };

  const handleCardClick = (e) => {
    let spotId = e.target.id;
    navigate(`/spots/${spotId}`);
  };

  useEffect(() => {
    getSpots();
  }, []);
  const handleMapClick = (e) => {
    setClickedCoordinates({
      lat: e.lngLat.lat.toFixed(7),
      lng: e.lngLat.lng.toFixed(7),
    });
  };

  return (
    <div className="container">
      <section className="mapContainer">
        <Map
          mapboxAccessToken={mapboxAccessToken}
          onClick={handleMapClick}
          style={{
            width: "100%",
            height: "400px",
          }}
          initialViewState={{
            longitude: -77.434769,
            latitude: 37.54129,
            zoom: 9,
            minZoom: 9,
          }}
          mapStyle="mapbox://styles/devonrjones/clbzflrob001b15pec1hx6wj4"
        >
          {spots.length
            ? spots.map((spot) => (
                <Marker
                  key={spot.id}
                  latitude={spot.lat}
                  longitude={spot.lng}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(spot);
                  }}
                />
              ))
            : false}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={popupInfo.lng}
              latitude={popupInfo.lat}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                <Link className="inlineLink" to={`/spots/${popupInfo.id}`}>{popupInfo.name}</Link>
              </div>
            </Popup>
          )}
        </Map>

        <div className="addSpotSection">
          <h2>Add a new spot</h2>
          <p>Click the map to update coordinates</p>
          <div className="coordinateFlex">
            <p>
              <strong>LNG:</strong>
              <br />
              {clickedCoordinates ? clickedCoordinates.lng : "click map"}
            </p>
            <p>
              <strong>LAT:</strong>
              <br />
              {clickedCoordinates ? clickedCoordinates.lat : "click map"}
            </p>
          </div>
          <div className="btnSection">
            <Link to="/addSpot">Add spot here</Link>
          </div>
        </div>
      </section>
      <section className="spotPreviews">
       
        <div className="spotCardMapping">
          {spots.length ? (
            spots.map((spot) => (
              <div
                onClick={handleCardClick}
                className="spotCard"
                key={spot.id}
                id={spot.id}
                style={{ backgroundImage: `url(${spot.image})` }}
              >
                <div className="spotInfo">
                  <h4>{spot.name}</h4>
                  {spot.dropins.length ? (
                    spot.dropins.length === 1 ? (
                      <p className="dropins">
                        {spot.dropins.length} active DR0P1N
                      </p>
                    ) : (
                      <p className="dropins">
                        {spot.dropins.length} active DR0P1NS
                      </p>
                    )
                  ) : (
                    false
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>no spots</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
