import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Map, { Marker } from "react-map-gl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateSpot() {
  const { mapboxAccessToken, baseURL } = useContext(AuthContext);
  const spotId = useParams();
  const [spot, setSpot] = useState(false);
  const [formState, setFormState] = useState({
    id: null,
    image: null,
    name: null,
    lng: null,
    lat: null,
    address: null,
    sactioned: null,
    security: null,
  });
  const [clickedCoordinates, setClickedCoordinates] = useState(false);

  const navigate = useNavigate();
  const handleMapClick = (e) => {
    setClickedCoordinates({
      lat: e.lngLat.lat.toFixed(7),
      lng: e.lngLat.lng.toFixed(7),
    });
  };

  const getSpot = async () => {
    let response = await axios.get(`${baseURL}/api/spots/${spotId.id}`);
    let data = await response.data;
    setSpot(data);
  };

  useEffect(() => {
    getSpot();
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSecurityChange = (e) => {
    setFormState({ ...formState, security: e.target.value });
  };

  const handleSanctionedChange = (e) => {
    setFormState({ ...formState, sanctioned: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formField = new FormData();
    formField.append("id", spot.id);
    !(formState.image === null) &&
      formField.append("image", e.target.image.files[0]);
    !(formState.name === null)
      ? formField.append("name", e.target.name.value)
      : formField.append("name", spot.name);
    !(formState.lng === null) && formField.append("lng", e.target.lng.value);
    !(formState.lat === null) && formField.append("lat", e.target.lat.value);
    !(formState.address === null) &&
      formField.append("address", e.target.address.value);
    !(formState.name === null) &&
      formField.append("sactioned", e.target.sanctioned.value);
    !(formState.name === null) &&
      formField.append("security", e.target.security.value);



    let response = await axios({
      method: "put",
      url: `${baseURL}/api/spots/${spot.id}/`,
      data: formField,
    });
    if (response.status === 200) {
      navigate(`/spots/${spot.id}`);
    }
  };

  return (
    <div className="container">
      <h2>Add a spot</h2>
      {spot ? (
        <>
          <section className="mapContainer">
            <Map
              onClick={handleMapClick}
              mapboxAccessToken={mapboxAccessToken}
              style={{
                width: "100%",
                height: "400px",
              }}
              initialViewState={{
                longitude: spot.lng,
                latitude: spot.lat,
                zoom: 17,
              }}
              center={[spot.lng, spot.lat]}
              mapStyle="mapbox://styles/devonrjones/clbzflrob001b15pec1hx6wj4"
            >
              {spot && (
                <Marker
                  latitude={
                    clickedCoordinates ? clickedCoordinates.lat : spot.lat
                  }
                  longitude={
                    clickedCoordinates ? clickedCoordinates.lng : spot.lng
                  }
                />
              )}
            </Map>
          </section>
          <form className="addSpotForm" onSubmit={handleSubmit}>
            <label>Spot name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={spot.name}
              onChange={handleChange}
              value={
                formState.name || formState.name === ""
                  ? formState.name
                  : spot.name
              }
            ></input>
            <label>Spot image:</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={() => setFormState({ ...formState, image: true })}
            ></input>
            <label>Street Address (if applicable)</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder={spot.address}
              onChange={handleChange}
              value={
                formState.address || formState.address === ""
                  ? formState.address
                  : spot.address
              }
            ></input>
            <label>Longitude</label>
            <input
              id="lng"
              name="lng"
              type="text"
              onChange={handleChange}
              value={clickedCoordinates ? clickedCoordinates.lng : spot.lng}
            ></input>
            <label>Latitude</label>
            <input
              id="lat"
              name="lat"
              type="text"
              onChange={handleChange}
              value={clickedCoordinates ? clickedCoordinates.lat : spot.lat}
            ></input>
            <label>Is this a city sanctioned skatepark?</label>
            <div className="radioGroup">
              <span>
                <input
                  id="sanctioned_true"
                  name="sanctioned"
                  type="radio"
                  value="true"
                  onChange={handleSanctionedChange}
                ></input>
                <label htmlFor="sanctioned_true">Yes</label>
              </span>
              <span>
                <input
                  id="sanctioned_false"
                  name="sanctioned"
                  type="radio"
                  value="false"
                  onChange={handleSanctionedChange}
                ></input>
                <label htmlFor="sanctioned_false">No</label>
              </span>
            </div>
            <label>Do skaters have to worry about security?</label>
            <div className="radioGroup">
              <span>
                <input
                  id="security_true"
                  name="security"
                  type="radio"
                  value="true"
                  onChange={handleSecurityChange}
                ></input>
                <label htmlFor="security_true">Yes</label>
              </span>
              <span>
                <input
                  id="security_false"
                  name="security"
                  type="radio"
                  value="false"
                  onChange={handleSecurityChange}
                ></input>
                <label htmlFor="security_false">No</label>
              </span>
            </div>

            <button>Create spot</button>
          </form>
        </>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}
