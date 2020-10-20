import React from 'react';
import PropTypes from 'prop-types';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

class EventsMap extends React.Component {

  render() {
    const accessToken = 'pk.eyJ1IjoiZGFlbmVyeXM5NSIsImEiOiJjazJmYjNlN2QwZ3luM2xwYnlqZnE5Z3JmIn0.0eaxPyVL6cJ0QxnXXP_fHg';
    const url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
    const { data } = this.props;
    return (
      <>
        { data.length === 0 && (
          <LeafletMap
            center={[46.603354, 1.8883335]}
            zoom={13}
            maxZoom={18}
            attributionControl
            zoomControl
            doubleClickZoom
            scrollWheelZoom
            dragging
            animate
            easeLinearity={0.35}
          >
            <TileLayer
              url={url}
              tileSize={512}
              zoomOffset={-1}
              id="mapbox/streets-v11"
              accessToken={accessToken}
            />
          </LeafletMap>
        )}

        { data.length > 0 && (
          <LeafletMap
            center={[48.8566969, 2.3514616]}
            zoom={11}
            maxZoom={18}
            attributionControl
            zoomControl
            doubleClickZoom
            scrollWheelZoom
            dragging
            animate
            easeLinearity={0.35}
          >
            <TileLayer
              url={url}
              tileSize={512}
              zoomOffset={-1}
              id="mapbox/streets-v11"
              accessToken={accessToken}
            />
            { data.map((event) => (
              <Marker key={event.id} position={[event.latitude, event.longitude]}>
                <Popup>
                  {event.title}
                </Popup>
              </Marker>
            ))}
          </LeafletMap>
        )}
      </>
    );
  }
}

EventsMap.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EventsMap;
