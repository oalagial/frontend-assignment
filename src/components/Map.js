import React, { useContext, useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import { VesselContext } from "../context/vessel-context";
import { apiKeys } from "../config";
import styled from "styled-components";

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKeys.googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {

  return (
    <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>

    </GoogleMap>
  );
});

const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

const Map = () => {
  return (
    <MapContainer>
      <MyMapComponent zoom={5} center={{ lat: 35.49, lng: 24.07 }} />
    </MapContainer>
  );
};

export default Map;
