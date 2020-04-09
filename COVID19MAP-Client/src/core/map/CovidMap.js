
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

const pointIsVisible = (covidMapBounds, {latitude, longitude}) => 
    covidMapBounds.contains(new google.maps.LatLng(latitude, longitude));

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

    const covidMapPlaces = props.places.map(({id, latitude, longitude, text, circle}) => { 
        return (
            <Fragment key = {id}>
                {canShowCovidMapCircleLabel(covidMapZoomLevel) && 
                  pointIsVisible(covidMapBounds, {latitude, longitude}) ? 
                    <MarkerWithLabel position = {{ 
                                                    lat: latitude,
                                                    lng: longitude
                                                }}
                                     labelAnchor = { new google.maps.Point(0,0) }
                                     labelStyle = {labelStyle}
                    >
                        <div dangerouslySetInnerHTML = {{__html: text}}/>
                    </MarkerWithLabel> : ""
                }

                { 
                    circle && 
                    <Circle defaultCenter = {{
                                                lat: latitude,
                                                lng: longitude
                                            }}
                            radius = {circle.radius * covidMapZoomLevel * 1128.497220}
                            options = {circle.options}/> 
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