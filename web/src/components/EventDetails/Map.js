import React from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';

class EventDetailsMap extends React.Component {
  render() {
    const accessToken = 'pk.eyJ1Ijoic2tyYWwiLCJhIjoiY2tnaHFocHE5MGc3djJxbGlybWFvd3pmbSJ9.Ob5k8xUBEZAQs8bwutBnGw';
    const url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
    const { latitude, longitude } = this.props;

    return (
      <>
        <LeafletMap
          center={[latitude, longitude]}
          zoom={13}
          maxZoom={18}
          attributionControl
          zoomControl
          doubleClickZoom
          scrollWheelZoom
          dragging
          animate
          easeLinearity={0.35}
          id="map"
        >
          <TileLayer
            url={url}
            tileSize={512}
            zoomOffset={-1}
            id="mapbox/streets-v11"
            accessToken={accessToken}
          />
          <Marker position={[latitude, longitude]} />
        </LeafletMap>
      </>
    );
  }
}

EventDetailsMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default EventDetailsMap;
