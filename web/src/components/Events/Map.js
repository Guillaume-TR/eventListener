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
    const url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
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
              id="mapbox.streets"
              accessToken={accessToken}
            />
            <Marker position={[46.603354, 1.8883335]}>
              <Popup>
                Google France
                8 rue de Londres
                75009 Paris
              </Popup>
            </Marker>
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
              id="mapbox.streets"
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
