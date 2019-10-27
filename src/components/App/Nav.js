/* eslint-disable max-len */
// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';


// == Import : local
import '../Modal/modal.scss';
import QuickSearchBar from 'src/redux/containers/Home/QuickSearchBar';
import RegisterForm from 'src/redux/containers/Modal/RegisterForm';
import LoginForm from '../Modal/LoginForm';


// == Composant Nav
const Nav = ({
  menuBurger,
  openNavModal,
  menuIcon,
  activeNavMenu,
  showLogin,
  showRegister,
  switchModals,
}) => {
  /* Fonction qui gère l'ouverture des deux modals Connexion et Inscription */
  const handleNavModals = (event) => {
    openNavModal(event.target.name);
  };

  /* Constante qui gère l'apparition du menu burger */
  const menuBurgerClass = menuBurger ? 'menu-visible' : 'menu';

  return (
    <nav className="navigation-item">
      <div className="navigation-item--left">
        <NavLink
          to="/"
          exact
        >
        eventListener
        </NavLink>
        <Route path="/(evenements|profil)">
          <QuickSearchBar />
        </Route>
      </div>

      {/* Au click sur l'icon du menu burger, la props "menuBurger" passe à "true" et
          donc la propriété CSS change ET l'icone change également */}
      <img
        src={menuIcon}
        alt="Menu"
        className="menu-burger"
        onClick={activeNavMenu}
      />

      <div className={menuBurgerClass}>
        <div className="menu-main">
          <NavLink
            to="/evenements"
            exact
            activeClassName="navigation-item--active"
            className="navigation-item--right"
          >
            Tous les événements
          </NavLink>

          <div
            className="navigation-item--active"
          >
            <RegisterForm
              show={showRegister}
              handleclose={handleNavModals}
              switchModals={switchModals}
            />
            <button
              type="button"
              className="navigation-item--right button"
              name="register"
              onClick={handleNavModals}
            >
              Inscription
            </button>
          </div>

          <div
            className="navigation-item--active"
          >
            <LoginForm
              show={showLogin}
              handleclose={handleNavModals}
              switchModals={switchModals}
            />
            <button
              type="button"
              className="navigation-item--right button"
              name="login"
              onClick={handleNavModals}
            >
              Connexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};


// == PropTypes
Nav.propTypes = {
  menuBurger: PropTypes.bool.isRequired,
  menuIcon: PropTypes.string.isRequired,
  showLogin: PropTypes.bool.isRequired,
  showRegister: PropTypes.bool.isRequired,
  openNavModal: PropTypes.func.isRequired,
  activeNavMenu: PropTypes.func.isRequired,
  switchModals: PropTypes.bool.isRequired,
};


// == Export
export default Nav;
