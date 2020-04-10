
/* global google */
import React, { Fragment, useCallback, useRef, useState, useEffect } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Circle } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import './CovidMap.css';

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

const CovidMap = ({zoom, center, onMapRef, places, onCenterChanged}) => {
    const covidMapRef = useRef(null);
    const [covidMapZoomLevel, setZoomLevel] = useState(zoom);
    const [covidMapBounds, setBounds] = useState(null);

    const canShowCovidMapCircleLabel = covidMapZoomLevel => covidMapZoomLevel > 4;

    const handleZoomChanged = useCallback(() => {
        setZoomLevel(covidMapRef.current.getZoom());
        setBounds(covidMapRef.current.getBounds());
    }, [covidMapRef]);

    const handleOnDragEnd = useCallback(() => {
        setBounds(covidMapRef.current.getBounds());
    }, [covidMapRef]);

    if(covidMapRef.current && covidMapBounds === null) {
        setBounds(covidMapRef.current.getBounds());
    }

    useEffect(() => {
        setZoomLevel(covidMapRef.current.getZoom());
        setBounds(covidMapRef.current.getBounds());
    }, [zoom, center])

    useEffect(() => {
        onMapRef(covidMapRef.current);
    }, [onMapRef, covidMapRef])

    const covidMapPlaces = places.map(({id, latitude, longitude, text, circle}) => { 
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
        <GoogleMap onZoomChanged = {handleZoomChanged}
                   onDragEnd = {handleOnDragEnd}
                   ref = {covidMapRef}
                   onCenterChanged = {onCenterChanged}
                   zoom = {zoom}
                   center = {center}>
            {covidMapPlaces}
        </GoogleMap>
    );
};

export default withScriptjs(withGoogleMap(CovidMap));