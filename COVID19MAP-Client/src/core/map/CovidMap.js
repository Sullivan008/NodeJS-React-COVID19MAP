/* global google */
import React, { Fragment, useCallback, useRef, useState } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Circle } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

const CovidMap = props => {
    const covidMapRef = useRef(null);
    const [covidMapZoomLevel, setZoomLevel] = useState(props.zoom);

    const handleZoomChanged = useCallback(() => {
        setZoomLevel(covidMapRef.current.getZoom());
    });

    return(
        <GoogleMap defaultZoom = {props.zoom}
                   defaultCenter = {props.center}
                   onZoomChanged = {handleZoomChanged}
                   ref = {covidMapRef}>
                { props.places.map(place => { return (
                    <Fragment key = {place.id}>
                        <MarkerWithLabel position = {{ lat: parseFloat(place.latitude),
                                                       lng: parseFloat(place.longitude)} }
                                         labelAnchor = { new google.maps.Point(0,0) }
                                         labelStyle = { {background: "yellow", fontSize: "16px", padding: "8px"} }>
                            <span>{place.text}</span>
                        </MarkerWithLabel>
                            { place.circle && 
                              <Circle defaultCenter = {{ lat: parseFloat(place.latitude),
                                                         lng: parseFloat(place.longitude) }}
                                      radius = {place.circle.radius}
                                      options = {place.circle.options}/> }
                    </Fragment>)})};
        </GoogleMap>
    );
};

export default withScriptjs(withGoogleMap(CovidMap));