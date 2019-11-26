// == Import : npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

// == Import : local
import './app.scss';
import Home from 'src/redux/containers/Home';
import Events from 'src/redux/containers/Events';
import EventDetails from 'src/redux/containers/EventDetails';
import Nav from 'src/redux/containers/App/Nav';
import Footer from 'src/redux/containers/App/Footer';
import SearchedEvents from 'src/redux/containers/Events/SearchedEvents';
import User from 'src/redux/containers/User';
import LegalMentions from 'src/components/LegalMentions';
import PrivatePolicy from 'src/components/PrivatePolicy';
import Errors from 'src/components/Errors';

// == Composant
class App extends React.Component {
  state = { }

  componentDidMount() {
    const { checkConnect } = this.props;

    checkConnect();
  }

  render() {
    const { isConnected } = this.props;

    return (
      <div id="wrapper">

        <canvas className="header_background" />

        <Nav />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/(tous-les-evenements|tous-les-evenements/:slug)" component={Events} />
          <Route path="/evenement/:eventId" component={EventDetails} />

          { isConnected && <Route path="/profil" component={User} /> }

          <Route path="/evenements/:search" component={SearchedEvents} />
          <Route exact path="/mentions-legales" component={LegalMentions} />
          <Route exact path="/politique-de-confidentialite" component={PrivatePolicy} />
          <Route path="*" component={Errors} />
        </Switch>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  checkConnect: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

// == Export
export default App;
