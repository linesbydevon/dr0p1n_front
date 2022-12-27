import {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Map, {Marker, Popup} from "react-map-gl";

export default function Homepage(){
  const [spots, setSpots] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  let {baseURL, mapboxAccessToken} = useContext(AuthContext)
  let navigate = useNavigate()
  const getSpots = async ()=>{
    let response = await axios.get(`${baseURL}/api/spots`)
    let data = await response.data;
    setSpots(data);
  }

  const handleCardClick=(e)=>{
    let spotId = e.target.id;
    console.log(spotId);
    navigate(`/spots/${spotId}`)
  }
  
  useEffect(()=>{
    getSpots();
  },[])
  const handleMapClick = e=>{
    console.log(e.lngLat.lat);
    setClickedCoordinates({lat: e.lngLat.lat, lng: e.lngLat.lng})
  }
  return(
    <div className="container">
      <div className="pageHeader">
        <h2>Spots near Richmond, VA</h2>
      </div>
      <section className="mapContainer">
        {clickedCoordinates && (
          <div>
            <p>LNG:<br/>{clickedCoordinates.lng.toFixed(7)}</p>
            <p>LAT:<br/>{clickedCoordinates.lat.toFixed(7)}</p>
          </div>
        )}
        <Map mapboxAccessToken={mapboxAccessToken}
        onClick = {handleMapClick}
        style={{
          width: "100%",
          height: "400px",
        }}
        initialViewState={{
          longitude: -77.434769,
          latitude: 37.541290,
          zoom: 9
        }}
        mapStyle="mapbox://styles/devonrjones/clbzflrob001b15pec1hx6wj4"
        >
          
          {spots.length ? 
          spots.map(
            spot => <Marker latitude={spot.lat} longitude={spot.lng} onClick={e=>{
              e.originalEvent.stopPropagation();
              setPopupInfo(spot)
              console.log(spot)
            }}/>
          )
          : false
        }
          {popupInfo && (
          <Popup
          anchor="top"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.name}
            
              
            </div>
            
          </Popup>
        )}
        </Map>
      </section>
      <section className="spotPreviews">
        <h3>Spot details</h3>
        <div className="spotCardMapping">
          {
            spots.length ? spots.map(
              spot => (
            <div onClick={handleCardClick} className="spotCard" key={spot.id} id={spot.id} style={{backgroundImage: `url(${spot.image})`}}>
              <div className="spotInfo">
                <h4>{spot.name}</h4>
                {spot.dropins.length ? 
                spot.dropins.length ===1 ?
              <p className="dropins">{spot.dropins.length} active DR0P1N</p> :
              <p className="dropins">{spot.dropins.length} active DR0P1NS</p> : false

            }
              </div>
            </div> 
              )
            )
            : 
            <div>
              <p>no spots</p>
            </div>
          }
        </div>
      </section>
    </div>
  )
}