// import npm
import React from 'react';

// import sous-composants
import Header from './Header';
import Datetime from './Datetime';
import Address from './Address';
import Description from './Description';
import Tags from './Tags';
import CheckButtons from './CheckButtons';

// import local
import './eventdetails.scss';

// Composant EventDetails
const EventDetails = () => (
  <>
    <div className="blurred-banner"></div>
    <div className="event">

      <section className="event-flyer">
        <Header />

        <article className="event-flyer-description">
          <aside className="event-flyer-infos">
            <Datetime />
            <Address />
            <CheckButtons />
          </aside>
          <div className="event-flyer-description description">
            <Description />
            <Tags />
          </div>
        </article>

      </section>

    </div>
  </>
);

export default EventDetails;
