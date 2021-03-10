/*
*
*
**** Author : Ankit Rana ****
*
*
*/

import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";

import { showDataOnMap } from "./util";


function Map({countries,casesType, center, zoom }) {
    return (       
        <div className="map">
        <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          /* Standard Way To Use Map from OpenStreetMap Nothing Fancy */
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution = '&copy; <a href ="https://www.linkedin.com/in/ankit-rana-51488581/">Ankit Rana</a>'
          /* Displays The Creator Of This Map */
          
        />
        {/* Loop Through the countries and draw circles on the screen based on it's intensity */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
        </div>
       
    )
}

export default Map
