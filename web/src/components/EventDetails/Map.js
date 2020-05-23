import React from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';

class EventDetailsMap extends React.Component {
  render() {
    const accessToken = 'pk.eyJ1IjoiZGFlbmVyeXM5NSIsImEiOiJjazJmYjNlN2QwZ3luM2xwYnlqZnE5Z3JmIn0.0eaxPyVL6cJ0QxnXXP_fHg';
    const url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
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
            id="mapbox.streets"
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
