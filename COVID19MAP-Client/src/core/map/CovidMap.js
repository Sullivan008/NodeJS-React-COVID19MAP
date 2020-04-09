
/* global google */
import React, { Fragment, useCallback, useRef, useState } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Circle } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

const labelStyle = {
    background: "black",
    color: "white",
    textAlign: "center",
    fontSize: "11px",
    padding: "2px",
    opacity: "0.5",
    transform: 'translateX(-50%) translateY(16px)'
};

const CovidMap = props => {
    const covidMapRef = useRef(null);
    const [covidMapZoomLevel, setZoomLevel] = useState(props.zoom);
    const [covidMapBounds, setBounds] = useState(null);

    const canShowCovidMapCircleLabel = covidMapZoomLevel => covidMapZoomLevel > 4;

    const handleZoomChanged = useCallback(() => {
        setZoomLevel(covidMapRef.current.getZoom());
        setBounds(covidMapRef.current.getBounds());
    }, [covidMapRef]);

    const handleOnDragEnd = useCallback(() => {
        setBounds(covidMapRef.current.getBounds());
    }, [covidMapRef]);

    const covidMapPlaces = props.places.map(place => { 
        return (
            <Fragment key = {place.id}>
                {canShowCovidMapCircleLabel(covidMapZoomLevel) && 
                 covidMapBounds && covidMapBounds.contains(new google.maps.LatLng(place.latitude, place.longitude)) ? 
                    <MarkerWithLabel position = {{ 
                                                    lat: place.latitude,
                                                    lng: place.longitude
                                                }}
                                     labelAnchor = { new google.maps.Point(0,0) }
                                     labelStyle = {labelStyle}
                    >
                        <div dangerouslySetInnerHTML = {{__html: place.text}}/>
                    </MarkerWithLabel> : ""
                }

                { 
                    place.circle && 
                    <Circle defaultCenter = {{
                                                lat: place.latitude,
                                                lng: place.longitude
                                            }}
                            radius = {place.circle.radius * covidMapZoomLevel * 1128.497220}
                            options = {place.circle.options}/> 
                }
            </Fragment>
        )});

    return(
        <GoogleMap defaultZoom = {props.zoom}
                   defaultCenter = {props.center}
                   onZoomChanged = {handleZoomChanged}
                   onDragEnd = {handleOnDragEnd}
                   ref = {covidMapRef}>
            {covidMapPlaces}
        </GoogleMap>
    );
};

export default withScriptjs(withGoogleMap(CovidMap));