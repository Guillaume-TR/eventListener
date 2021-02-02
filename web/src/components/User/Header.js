import React from 'react';
import PropTypes from 'prop-types';

import './user.scss';
import avatarImg from 'src/assets/images/avatar_eventListener.png';

const Header = ({ pseudo, urlAvatar }) => (
  <header className="header">
    <div className="header-pseudo">
      Hello {pseudo}!
    </div>
    <img className="header-avatar" src={urlAvatar ? urlAvatar : avatarImg} alt="avatar" />
  </header>
);

Header.propTypes = {
  pseudo: PropTypes.string.isRequired,
  urlAvatar: PropTypes.string,
};

Header.defaultProps = {
  urlAvatar: avatarImg,
};

export default Header;
