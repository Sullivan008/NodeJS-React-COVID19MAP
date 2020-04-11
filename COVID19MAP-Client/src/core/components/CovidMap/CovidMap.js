/* global google */
import React, { Fragment, useRef, useState, useEffect, useCallback } from "react";

import { withGoogleMap, GoogleMap, withScriptjs, Circle } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

import './CovidMap.css';

const placeCircleMarkerLabelIsVisible = covidMapZoomLevel => covidMapZoomLevel > 5;

const placeIsVisible = (covidMapBounds, {latitude, longitude}) => 
    covidMapBounds.contains(new google.maps.LatLng(latitude, longitude));

const CovidMap = ({zoom, center, places, onZoomChanged}) => {
    const covidMapRef = useRef(null);
    const [visiblePlaceIds, setVisiblePlaceIds] = useState({});
    const [covidMapMarkerLabelAnchor] = useState(new google.maps.Point(0,0));
    
    useEffect(() => {
        const interval = setInterval(() => {
            if(!covidMapRef.current) {
                return;
            }

            const currentCovidMapBounds = covidMapRef.current.getBounds();
            const currentCovidMapZoomLevel = covidMapRef.current.getZoom();

            const visiblePlaceIds = {};

            for(const {id, latitude, longitude} of places) {
                visiblePlaceIds[id] = placeCircleMarkerLabelIsVisible(currentCovidMapZoomLevel) && placeIsVisible(currentCovidMapBounds, {latitude, longitude})
            }

            setVisiblePlaceIds(visiblePlaceIds);
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, [places]);

    const handleCovidMapZoomChanged = useCallback(() => {
        if(!onZoomChanged){
            return;
        }

        onZoomChanged(covidMapRef.current.getZoom());
    }, [onZoomChanged]);
    
    const covidMapPlaces = places.map(({id, markerPosition, markerLabelContent, circle}) => { 
        return (
            <Fragment key = {id}>
                {visiblePlaceIds[id] ? 
                    <MarkerWithLabel position = { markerPosition }
                                     labelAnchor = { covidMapMarkerLabelAnchor }
                                     labelClass = "Circle-Label">
                        { markerLabelContent }
                    </MarkerWithLabel> : ""
                }

                { 
                    circle && <Circle defaultCenter = { markerPosition }
                                      radius = { circle.radius }
                                      options = { circle.options }/> 
                }
            </Fragment>
        )});

    return(
        <GoogleMap onZoomChanged = { handleCovidMapZoomChanged }
                   ref = { covidMapRef }
                   zoom = { zoom }
                   center = { center }>
            { covidMapPlaces }
        </GoogleMap>
    );
};

export default withScriptjs(withGoogleMap(CovidMap));