/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';

import '../Modal/modal.scss';
import menuBurgerOpenIcon from 'src/assets/images/icons/icons8-xbox-menu-50.png';
import menuBurgerCloseIcon from 'src/assets/images/icons/icons8-cancel-50.png';
import profileIcon from 'src/assets/images/icons/icons8-settings-50.png';
import logoutIcon from 'src/assets/images/icons/icons8-exit-50.png';

import QuickSearchBar from 'src/containers/Home/QuickSearchBar';
import RegisterForm from 'src/containers/Modal/RegisterForm';
import LoginForm from 'src/containers/Modal/LoginForm';

class Nav extends React.Component {
  state = {}

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > 50) {
        document.querySelector('nav').classList.add('minimalize');
      } else {
        document.querySelector('nav').classList.remove('minimalize');
      }
    });
  }

  /* Changes the pathname so that the rendering changes */
  handleClick = () => {
    window.location.pathname = 'tous-les-evenements';
  }

  handleClickLogo = () => {
    window.location.pathname = '';
  }

  render() {
    const {
      menuBurger,
      openNavModal,
      activeNavMenu,
      showLogin,
      showRegister,
      isConnected,
      pseudo,
      deconnect,
      closeNavMenu,
    } = this.props;

    /* Function who manage the opening of the two modals "login" and "register" */
    const handleNavModals = (event) => {
      openNavModal(event.target.name);
    };

    const handleDisconnect = () => {
      closeNavMenu();
      deconnect();
    };

    const menuburgerIcon = !menuBurger ? menuBurgerOpenIcon : menuBurgerCloseIcon;

    /* Constante who manage the display of the burger menu */
    const menuBurgerClass = menuBurger ? 'menu-visible' : 'menu';

    return (
      <nav className="navigation-item">
        <div className="navigation-item--left">
          <NavLink
            to="/"
            exact
            onClick={this.handleClickLogo}
            className="logo-text"
          >
            eventListener
          </NavLink>
          <Route path="/(evenements|profil|mentions-legales|politique-de-confidentialite)">
            <QuickSearchBar />
          </Route>
        </div>

        {/* By clicking on the menu burger icon, the props 'menuBurger" change to "true" and the property CSS and the icon change */}
        <img
          src={menuburgerIcon}
          alt="Menu"
          className="menu-burger"
          onClick={activeNavMenu}
        />

        <div className={menuBurgerClass}>
          <div className="menu-main">
            <NavLink
              onClick={this.handleClick}
              to="/tous-les-evenements"
              exact
              activeClassName="navigation-item--active"
              className="navigation-item--right"
            >
              Tous les événements
            </NavLink>

            {/* The navbar display change if the user is connected or not  */}
            { isConnected && (
              <>
                <div className="navigation-item--right">
                  <NavLink
                    to="/profil"
                    exact
                    activeClassName="navigation-item--active"
                    className="navigation-item--right online"
                  >
                    <span className="pseudo">{pseudo}</span>
                    <span>
                      <img src={profileIcon} alt="modifier profil" className="icon" />
                    </span>
                  </NavLink>
                </div>

                <div className="navigation-item--right">
                  <NavLink
                    to="/"
                    exact
                    className="navigation-item--right online"
                    onClick={handleDisconnect}
                  >
                    <span>Déconnexion</span>
                    <span>
                      <img src={logoutIcon} alt="deconnexion" className="icon" />
                    </span>
                  </NavLink>
                </div>
              </>
            )}

            { !isConnected && (
              <>
                <div className="navigation-item--active">
                  { showRegister && (
                    <RegisterForm handleclose={handleNavModals} />
                  )}
                  <button
                    type="button"
                    className="navigation-item--right button"
                    name="register"
                    onClick={handleNavModals}
                  >
                    Inscription
                  </button>
                </div>

                <div className="navigation-item--active">
                  { showLogin && (
                    <LoginForm handleclose={handleNavModals} />
                  )}
                  <button
                    type="button"
                    className="navigation-item--right button"
                    name="login"
                    onClick={handleNavModals}
                  >
                    Connexion
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  menuBurger: PropTypes.bool.isRequired,
  showLogin: PropTypes.bool.isRequired,
  showRegister: PropTypes.bool.isRequired,
  openNavModal: PropTypes.func.isRequired,
  activeNavMenu: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  pseudo: PropTypes.string.isRequired,
  deconnect: PropTypes.func.isRequired,
  closeNavMenu: PropTypes.func.isRequired,
};

export default Nav;
