import React, { Component, useEffect } from 'react';
import {useSelector} from "react-redux"
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const SimpleMap = () => {
  let latitude 
  let longitude
  let searchCoords = useSelector(state => state.searchLocation)
  if (!searchCoords){
    latitude = 42
    longitude = -116
  } else {
    latitude = searchCoords[0]
    longitude = searchCoords[1]
  }
  
  
  let defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 10
  };

  
    return (
      <div className="map-page">
        
        <div className="white-space"></div>
        <div style={{ height: "600px", width: "600px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCZbGlAdCHt_MtMKoGtGXvkSZWuNUBQSNo",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={-116.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  
}

export default SimpleMap;
