import React from 'react';
import PropTypes from 'prop-types';

import Event from 'src/redux/containers/Events/Event';
import iconArrowLeft from 'src/assets/images/icons/icons8-undefined-50-9.png';
import iconArrowRight from 'src/assets/images/icons/icons8-undefined-50-7.png';
import SearchForm from './SearchForm';
import Contact from './Contact';
import './home.scss';
import 'src/components/Events/events.scss';


// == Composant
class Home extends React.Component {
  state = {
    left: 0,
  }

  componentDidMount() {
    const { showNextEvents } = this.props;
    showNextEvents();
  }

  toLeft = () => {
    //const numberOfElement = this.props.data.length;
    const newLeft = this.state.left + 250;
    this.setState({
      left: newLeft,
    });
  };

  toRight = () => {
    const newLeft = this.state.left - 250;
    this.setState({
      left: newLeft,
    });
  };


  render() {
    const { data } = this.props;
    const { left } = this.state;

    return (
      <>
        <header>
          <canvas className="header_background" />
          <div className="header-content">
            <p className="header-content-text">
              Accroche à définir qui sera trop mega cool (ou pas)
            </p>
            <SearchForm />
          </div>
        </header>

        <main>
          <h2 className="events-title">
            Prochains événements
          </h2>

          <div className="events-view-card">
            <div className="events-container" style={{ left: `${left}px` }}>
              {data.map((event) => <Event key={event.id} {...event} />)}
            </div>
          </div>

          <div className="arrow">
            <button type="button" className="arrow-left" onClick={this.toLeft}>
              <img src={iconArrowLeft} alt="prev" className="icon" />
            </button>
            <button type="button" className="arrow-right" onClick={this.toRight}>
              <img src={iconArrowRight} alt="next" className="icon" />
            </button>
          </div>


          <Contact />
        </main>
      </>
    );
  }
}

Home.propTypes = {
  showNextEvents: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

// == Export
export default Home;
