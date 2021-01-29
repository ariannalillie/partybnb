import React, { Component, useEffect, useState } from 'react';
import {useSelector} from "react-redux"
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ lat, lng, text }) => <div>{
<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" alt="marker" width="50px" />
}</div>;



const SimpleMap = () => {
  const locationMarks = useSelector(state => state.locations.locationlist)
 
  let latitude = useSelector(state => state.locations.searchLocation[0])
  let longitude = useSelector(state => state.locations.searchLocation[1])
 
  let defaultProps = {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 13
  };


    return (
      <div className="map-page">

        <div className="white-space"></div>
        <div style={{ height: "100vh", width: "100%"}}>
          <GoogleMapReact

            bootstrapURLKeys={{
              key: "AIzaSyCZbGlAdCHt_MtMKoGtGXvkSZWuNUBQSNo",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {/* <AnyReactComponent
              lat={36.1699}
              lng={-115.1398}
              text="My Marker"

              /> */}
              <div>
              {locationMarks.map(location => (
                <AnyReactComponent
                  key={location.id} 
                  lat={location.latitude}
                  lng={location.longitude}
                  text={location.title}
                  
                />
              ))}
              </div>
              
          </GoogleMapReact>
        </div>
      </div>
    );

}

export default SimpleMap;
