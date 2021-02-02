import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';

const LoginForm = ({
  email,
  password,
  stayLoggedIn,
  handleclose,
  changeValue,
  changeCheckInputValue,
  submitLogin,
  message,
}) => {
  const handleChangeValue = (event) => {
    const { name, value } = event.target;

    changeValue(name, value);
  };

  const handleCheckInputValue = (event) => {
    const { name } = event.target;

    changeCheckInputValue(name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitLogin();
  };
  return (
    <div className="modal display-block">
      <section className="modal-main">
        <h2 className="modal-title">Connexion</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-element">
            <input
              id="email"
              className={classNames('modal-form-element-field', { 'modal-form-element-field--filled': email.length > 0 })}
              required
              name="email"
              value={email}
              onChange={handleChangeValue}
              type="email"
            />
            <label
              className="modal-form-element-label"
              htmlFor="email"
            >
              Adresse email
            </label>
          </div>
          <div className="modal-form-element">
            <input
              id="password"
              className={classNames('modal-form-element-field', { 'modal-form-element-field--filled': password.length > 0 })}
              required
              name="password"
              value={password}
              onChange={handleChangeValue}
              type="password"
            />
            <label
              className="modal-form-element-label"
              htmlFor="password"
            >
              Mot de passe
            </label>
          </div>
          { message.error && (
            <div className="modal-form-message modal-form-message--error">
              {message.content}
            </div>
          ) }
          <button
            className="modal-form--submit"
            type="submit"
          >
          Se connecter
          </button>
        </form>
        <label className="modal--checkbox-label">
          <input
            type="checkbox"
            className="modal-checkbox"
            name="stayLoggedIn"
            checked={stayLoggedIn}
            onChange={handleCheckInputValue}
          />
          Rester connecté
        </label>
        <a
          className="modal--back"
          name="login"
          href="#"
          onClick={handleclose}
        >
          Retour
        </a>
      </section>
    </div>
  );
};

LoginForm.propTypes = {
  email: Proptypes.string.isRequired,
  password: Proptypes.string.isRequired,
  stayLoggedIn: Proptypes.bool.isRequired,
  handleclose: Proptypes.func.isRequired,
  changeValue: Proptypes.func.isRequired,
  changeCheckInputValue: Proptypes.func.isRequired,
  submitLogin: Proptypes.func.isRequired,
  message: Proptypes.shape({
    error: Proptypes.bool,
    content: Proptypes.string,
  }),
};

LoginForm.defaultProps = {
  message: {
    error: false,
    content: null,
  },
};

export default LoginForm;
