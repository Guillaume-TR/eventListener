import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import className from 'classnames';

import './events.scss';
import Form from 'src/containers/Events/Form';
import Event from 'src/containers/Events/Event';
import EventsMap from 'src/containers/Events/Map';


const override = css`
  display: block;
  margin: 20rem auto;
  border-color: #6942e4;
`;


class Events extends React.Component {
  state = {
    sticky: false,
    loading: true,
  }

  componentDidMount() {
    // props
    const {
      value,
      showEvents,
      data,
    } = this.props;
    if (value.trim().length === 0) {
      // fetch all events when no search by filter
      showEvents();
    }
    // pour fixer les filtres au scroll
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', () => this.checkScroll());
    }

    if (data.length === 0) {
      this.setState({
        loading: false,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScroll);
  }

  checkScroll = () => {
    const { sticky } = this.state;

    if (window.pageYOffset > 350 && !sticky) {
      this.setState({
        sticky: true,
      });
    }
    else if (window.pageYOffset < 350 && sticky) {
      this.setState({
        sticky: false,
      });
    }
  }

  render() {
    const {
      data,
      undefinedData,
    } = this.props;
    const {
      loading,
      sticky,
    } = this.state;
    return (
      <section className="events">

        <h2 className="events-title">
          Tous les événements
        </h2>

        <div className="events-view-list">
          <Route exact path="/tous-les-evenements">
            <div className="events-left">
              { data.map((event) => <Event key={event.id} {...event} jsxFor="list" />)}
              { data.length === 0 && <p>{undefinedData}</p>}
            </div>
            { data.length === 0 && (
              <div className="sweet-loading">
                <ClipLoader
                  css={override}
                  sizeUnit="px"
                  size={150}
                  color="#123abc"
                  loading={loading}
                />
              </div>
            )}
            <div id="fake-div" className={className('fake-div', { 'fake-div--block': sticky })} />
            <div className={className('events-right', { 'events-right--sticky': sticky })}>
              <Form />
              { data.length > 0 && <EventsMap />}
            </div>
          </Route>
        </div>
      </section>
    );
  }
}


Events.propTypes = {
  data: PropTypes.array,
  value: PropTypes.string,
  showEvents: PropTypes.func.isRequired,
  undefinedData: PropTypes.string,
};
Events.defaultProps = {
  value: '',
  data: undefined,
  undefinedData: '',
};

export default Events;
