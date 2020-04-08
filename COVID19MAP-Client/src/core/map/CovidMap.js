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

    const places = props.places.map(place => { 
        return (
            <Fragment key = {place.id}>
                <MarkerWithLabel position = {{ 
                                                lat: parseFloat(place.latitude),
                                                lng: parseFloat(place.longitude)
                                            }}
                                 labelAnchor = { new google.maps.Point(0,0) }
                                 labelStyle = { {background: "black", color: "white", fontSize: "11px", padding: "2px", opacity: "0.5"} }>
                    <span>{place.text}</span>
                </MarkerWithLabel>
                    { 
                        place.circle && 
                        <Circle defaultCenter = {{
                                                    lat: parseFloat(place.latitude),
                                                    lng: parseFloat(place.longitude) 
                                                }}
                                radius = {place.circle.radius}
                                options = {place.circle.options}/> 
                    }
            </Fragment>
        )});

    return(
        <GoogleMap defaultZoom = {props.zoom}
                   defaultCenter = {props.center}
                   onZoomChanged = {handleZoomChanged}
                   ref = {covidMapRef}>
            {places};
        </GoogleMap>
    );
};

export default withScriptjs(withGoogleMap(CovidMap));