import React from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

class HomeMap extends React.Component {
  render() {
    const accessToken = 'pk.eyJ1IjoiZGFlbmVyeXM5NSIsImEiOiJjazJmYjNlN2QwZ3luM2xwYnlqZnE5Z3JmIn0.0eaxPyVL6cJ0QxnXXP_fHg';
    const url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
    const creators = [
      {
        id: 1,
        name: 'Inès',
        link: 'https://www.linkedin.com/in/ines-mouandjo-lobe/',
        latitude: 48.8566969,
        longitude: 2.3514616,
        mobilite: 'Paris',
      },
      {
        id: 2,
        name: 'Guillaume T',
        link: 'https://www.linkedin.com/in/guillaume-terrien/',
        latitude: 47.2186371,
        longitude: -1.5541362,
        mobilite: 'Nantes',
      },
      {
        id: 3,
        name: 'Claudine',
        link: '',
        latitude: 48.584614,
        longitude: 7.7507127,
        mobilite: 'Strasbourg',
      },
      {
        id: 4,
        name: 'Guillaume E',
        link: 'https://www.linkedin.com/in/guillaume-ersent-15419a17b/',
        latitude: 50.6305089,
        longitude: 3.0706414,
        mobilite: 'Lille',
      },
    ];
    return (
      <section className="homemap">
        <h2 className="homemap-title">
          Où nous trouver
        </h2>

        <div className="homemap-content">
          <LeafletMap
            center={[46.603354, 1.8883335]}
            zoom={6}
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
            { creators.map((creator) => (
              <Marker key={creator.id} position={[creator.latitude, creator.longitude]}>
                <Popup>
                  {creator.name } <br />
                  <a href={creator.link}>Linkedin</a> <br />
                  ({creator.mobilite})
                </Popup>
              </Marker>
            ))}
          </LeafletMap>
        </div>
      </section>
    );
  }
}

export default HomeMap;
