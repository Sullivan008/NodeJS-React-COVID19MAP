
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

    const canShowCovidMapCircleLabel = covidMapZoomLevel => covidMapZoomLevel > 5;

    const handleZoomChanged = useCallback(() => {
        setZoomLevel(covidMapRef.current.getZoom());
    }, [covidMapRef]);

    const places = props.places.map(place => { 
        return (
            <Fragment key = {place.id}>
                {canShowCovidMapCircleLabel(covidMapZoomLevel) ? 
                    <MarkerWithLabel position = {{ 
                                                    lat: parseFloat(place.latitude),
                                                    lng: parseFloat(place.longitude)
                                                }}
                                     labelStyle = {labelStyle}
                    >
                        <div dangerouslySetInnerHTML = {{__html: place.text}}/>
                    </MarkerWithLabel> : ""
                };

                { 
                    place.circle && 
                    <Circle defaultCenter = {{
                                                lat: parseFloat(place.latitude),
                                                lng: parseFloat(place.longitude) 
                                            }}
                            radius = {place.circle.radius * covidMapZoomLevel * 1128.497220}
                            options = {place.circle.options}/> 
                };
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