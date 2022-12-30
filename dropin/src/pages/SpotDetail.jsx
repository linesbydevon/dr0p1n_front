import {useContext, useState, useEffect} from 'react'
import Map, {Marker, Popup} from "react-map-gl";
import {useParams} from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function SpotDetail(){
  let {baseURL, mapboxAccessToken} = useContext(AuthContext)
  const spotId = useParams();
  console.log(spotId)
  const [spot, setSpot] = useState(false);

  const getSpot = async ()=>{
    let response = await axios.get(`${baseURL}/api/spots/${spotId.id}`)
    let data = await response.data;
    setSpot(data);
    console.log(data)
  }

  
  useEffect(()=>{
    getSpot();
  },[])

  return(
    <div className="container">
      
       

        

       
         
         {spot ? 
         
          <>
          <section className="mapContainer">
         <Map mapboxAccessToken={mapboxAccessToken}
         style={{
           width: "100%",
           height: "400px",
         }}
         initialViewState={{
           longitude: spot.lng,
           latitude: spot.lat,
           zoom: 17
         }}
         center= {[spot.lng, spot.lat]}
         mapStyle="mapbox://styles/devonrjones/clbzflrob001b15pec1hx6wj4"
         >
         <Marker latitude={spot.lat} longitude={spot.lng} />
         </Map>
         </section>
         <section>
          <div>
         
         <img className="spotImage" src={spot.image ? spot.image : "https://abilityrehabilitation.com/wp-content/uploads/2018/10/fpo.png"} alt={spot.name}/>
          <h2>{spot.name}</h2>
          <h3>Location</h3>
          {spot.address && <p>{spot.address}</p>}
          <div className="coordinateFlex">
          <p><strong>LNG:</strong><br/>{spot.lng}</p>
            <p><strong>LAT:</strong><br/>{spot.lat}</p>
          </div>
          <h3>City sanctioned</h3>
          <p>{spot.sanctioned ? "Yes" : "No"}</p>
          <h3>Security</h3>
          <p>{spot.security ? "Yes" : "No"}</p>
          
         </div>
         <div>

         </div>
         </section>
         </>
         :false
       }    
     
    </div>
  )
}