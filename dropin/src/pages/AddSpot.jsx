import {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import Map, {Marker, Popup} from "react-map-gl";
import axios from 'axios';

export default function AddSpot(){
  const {clickedCoordinates, setClickedCoordinates, mapboxAccessToken, baseURL} = useContext(AuthContext)

  const handleMapClick = e=>{
    console.log(e.lngLat.lat);
    setClickedCoordinates({lat: e.lngLat.lat.toFixed(7), lng: e.lngLat.lng.toFixed(7)})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();

    let data = {
      "image": e.target.image.files[0],
      "name": e.target.name.value,
      "lng": e.target.lng.value,
      "lat": e.target.lat.value,
      "address": e.target.address.value,
      "sactioned": (e.target.sanctioned.value==='true'),
      "security": (e.target.security.value==='true')
  }
    let formField = new FormData();
    formField.append("image", e.target.image.files[0])
    formField.append("name", e.target.name.value)
    formField.append("lng", e.target.lng.value)
    formField.append("lat", e.target.lat.value)
    formField.append("address", e.target.address.value)
    formField.append("sactioned", e.target.sanctioned.value)
    formField.append("security", e.target.security.value)
  console.log(formField)
  // let response = await axios.post(`${baseURL}/api/spots/`, data)
  
  // console.log(response)
  await axios({
    method: 'post',
    url: `${baseURL}/api/spots/`,
    data: formField
  }).then((response)=>{
    console.log(response)
  })
  }
  return(
    <div className="container">
      <h2>Add a spot</h2>
      <section className="mapContainer">
         <Map onClick={handleMapClick} mapboxAccessToken={mapboxAccessToken}
         style={{
           width: "100%",
           height: "400px",
         }}
         initialViewState={{
           longitude: clickedCoordinates ? clickedCoordinates.lng : -77.434769,
           latitude: clickedCoordinates ? clickedCoordinates.lat : 37.541290,
           zoom: 17
         }}
         center= {clickedCoordinates ? [clickedCoordinates.lng, clickedCoordinates.lat] : [-77.434769, 37.541290]}
         mapStyle="mapbox://styles/devonrjones/clbzflrob001b15pec1hx6wj4"
         >
          {
            clickedCoordinates &&
            <Marker latitude={clickedCoordinates.lat} longitude={clickedCoordinates.lng} />
          }
         
         </Map>
         </section>
      <form onSubmit={handleSubmit}>
        <label>Spot name:</label>
        <input name="name" type="text"></input>
        <label>Spot image:</label>
        <input name="image" type="file"></input>
        <label>Street Address (if applicable)</label>
        <input name="address" type="text"></input>
        <label>Longitude</label>
        <input name="lng" type="text" value={clickedCoordinates ? clickedCoordinates.lng : "click map"}></input>
        <label>Latitude</label>
        <input name="lat" type="text" value={clickedCoordinates ? clickedCoordinates.lat : "click map"}></input>
        <label>Is this a city sanctioned skatepark?</label>
        <input name="sanctioned" type="radio" value="true"></input>
        <label htmlFor='santioned_true'>Yes</label>
        <input name="sanctioned" type="radio" value="false"></input>
        <label htmlFor='santioned_false'>No</label>
        <label>Do skaters have to worry about security?</label>
        <input name="security" type="radio" value="true"></input>
        <label htmlFor='security_true'>Yes</label>
        <input name="security" type="radio" value="false"></input>
        <label htmlFor='security_false'>No</label>

        <button>Create spot</button>
        
      </form>
    </div>
  )
}