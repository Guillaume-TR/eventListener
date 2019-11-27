import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// == Composant
const Footer = ({ fetchEvents }) => {
  // Fetch the events based on the location when clicking on the footer links
  const handleClick = (event) => {
    fetchEvents(event.target.dataset.city);
  };
  const cities = [
    'Paris',
    'Lyon',
    'Nantes',
    'Strasbourg',
    'Bordeaux',
    'Marseille',
  ];
  return (
    <section className="footer">
      <h1 className="footer-title">titre masqué</h1>
      <div>
        <div className="footer-events">
          <h2 className="footer-subtitle">Tous les événements</h2>
          {cities.map((city) => (<Link onClick={handleClick} key={city} to={`/evenements/france/ville/${city}`} data-city={city}> - {city}<br /> </Link>))}
        </div>

        <div className="footer-social">
          <img alt="facebook" src="https://img.icons8.com/nolan/64/000000/facebook-circled.png" />
          <img alt="twitter" src="https://img.icons8.com/nolan/64/000000/twitter.png" />
          <img alt="share" src="https://img.icons8.com/nolan/64/000000/share.png" />
        </div>

        <div className="footer-links">
          <h2 className="footer-subtitle">Liens utiles</h2>
          <ul>
            <li>
              <Link to="/tous-les-evenements">
                Rechercher un événement
              </Link>
            </li>
            <li>
              <Link to="/politique-de-confidentialite">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link to="/mentions-legales">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};


// == PropTypes
Footer.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
};


// == Export
export default Footer;
