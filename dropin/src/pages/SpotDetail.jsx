import { useContext, useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import CommentSection from "../components/CommentSection";
import Obstacles from "../components/Obstacles";
import SVGEdit from "../assets/SVGEdit";
import LogoSVG from "../assets/LogoSVG";

export default function SpotDetail() {
  let { baseURL, mapboxAccessToken, user, setUser } = useContext(AuthContext);
  const spotId = useParams();
  const [spot, setSpot] = useState(false);
  const [commentPosted, setCommentPosted] = useState(true);
  const [changeToggle, setChangeToggle] = useState(true);
  let navigate = useNavigate();
  const getSpot = async () => {
    let response = await axios.get(`${baseURL}/api/spots/${spotId.id}`);
    let data = await response.data;
    setSpot(data);
  };

  const handleDropIn = async () => {
    if (user.dropin === spot.id) {
      let data = {
        dropin: null,
      };
      let response = await axios.put(
        `${baseURL}/api/skaters/${user.id}/`,
        data
      );
      if (response.status === 200) {
        setUser(response.data);
        setChangeToggle(!changeToggle);
      }
    } else {
      let data = {
        dropin: spot.id,
      };
      let response = await axios.put(
        `${baseURL}/api/skaters/${user.id}/`,
        data
      );
      if (response.status === 200) {
        setUser(response.data);
        setChangeToggle(!changeToggle);
      }
    }
  };

  useEffect(() => {
    getSpot();
  }, [changeToggle]);

  return (
    <div className="container">
      {spot ? (
        <>
          <section className="mapContainer">
            <Map
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
              <Marker latitude={spot.lat} longitude={spot.lng} />
            </Map>
          </section>
          <section>
            <div className="padded">
              <div className="bordered">
                <h2>{spot.name}</h2>
                <div className="flex">
                  <div className="left">
                    <div
                      className="spotCard"
                      style={{
                        backgroundImage: `url(${
                          spot.image
                            ? spot.image
                            : "https://abilityrehabilitation.com/wp-content/uploads/2018/10/fpo.png"
                        })`,
                      }}
                    ></div>
                    <div className="basicInfo">
                      <SVGEdit
                        onClick={() => navigate(`/updateSpot/${spot.id}`)}
                      />
                      <h3>Location</h3>
                      {spot.address ? (
                        <p>
                          <a
                            className="inlineLink"
                            href={`http://maps.google.com/maps?q=${spot.address
                              .split(" ")
                              .join("+")}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {spot.address.split(",")[0]}
                          </a>
                        </p>
                      ) : (
                        <p>Street address unknown</p>
                      )}
                      <div className="coordinateFlex">
                        <p>
                          <strong>LNG:</strong>
                          <br />
                          {spot.lng}
                        </p>
                        <p>
                          <strong>LAT:</strong>
                          <br />
                          {spot.lat}
                        </p>
                      </div>
                      <h3>City sanctioned</h3>
                      <p>{spot.sactioned ? "Yes" : "No"}</p>
                      <h3>Security</h3>
                      <p>{spot.security ? "Yes" : "No"}</p>
                      <Obstacles
                        spot={spot}
                        changeToggle={changeToggle}
                        setChangeToggle={setChangeToggle}
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="dropinSection">
                      <h3>Active DR0P1Ns</h3>
                      {spot.dropins.length ? (
                        spot.dropins.map((dropin) => (
                          <div className="dropin">
                            <img src={dropin.image} alt="" />
                            <p>{dropin.user.username}</p>
                          </div>
                        ))
                      ) : (
                        <p>No active DR0P1Ns</p>
                      )}
                      <div onClick={handleDropIn} className="dropinButton">
                        <LogoSVG />
                      </div>
                    </div>
                    <CommentSection
                      spot={spot}
                      setCommentPosted={setCommentPosted}
                      commentPosted={commentPosted}
                      changeToggle={changeToggle}
                      setChangeToggle={setChangeToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        false
      )}
    </div>
  );
}
