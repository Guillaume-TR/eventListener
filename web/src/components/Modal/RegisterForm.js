import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';

const RegisterForm = ({
  handleclose,
  pseudo,
  email,
  password,
  confirmPassword,
  notifNewEvent,
  notifNewUpdate,
  changeValue,
  changeCheckInputValue,
  submitRegister,
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
    submitRegister();
  };

  return (
    <div className="modal display-block">
      <section className="modal-main">
        { !message.success && (
          <div>
            <h2 className="modal-title">Inscription</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-form-element">
                <input
                  id="pseudo"
                  className={classNames('modal-form-element-field', { 'modal-form-element-field--filled': pseudo.length > 0 })}
                  required
                  name="pseudo"
                  value={pseudo}
                  onChange={handleChangeValue}
                  type="text"
                />
                <label
                  className="modal-form-element-label"
                  htmlFor="pseudo"
                >
                  Pseudo
                </label>

                <span className="modal-form-element-help">Le pseudo doit contenir au moins 3 caractères</span>
              </div>
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
              <div className="modal-form-element">
                <input
                  id="confirmPassword"
                  className={classNames('modal-form-element-field', { 'modal-form-element-field--filled': confirmPassword.length > 0 })}
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChangeValue}
                  type="password"
                />
                <label
                  className="modal-form-element-label"
                  htmlFor="confirmPassword"
                >
                  Confirmer mot de passe
                </label>

                <span className="modal-form-element-help">Le mot de passe doit contenir au moins 6 caractères</span>
              </div>
              <label className="modal-form-label">
                <input
                  type="checkbox"
                  name="notifNewEvent"
                  checked={notifNewEvent}
                  onChange={handleCheckInputValue}
                  className="modal-checkbox"
                />
                Recevoir un email pour chaque nouveau événement
              </label>

              <label className="modal-form-label">
                <input
                  type="checkbox"
                  name="notifNewUpdate"
                  checked={notifNewUpdate}
                  onChange={handleCheckInputValue}
                  className="modal-checkbox"
                />
                Recevoir un email à la modification d'un événement
              </label>
              { message.error && (
                <div className="modal-form-message modal-form-message--error">
                  { message.content.map((currentMessage) => (
                    <p key={currentMessage}>{currentMessage}</p>
                  )) }
                </div>
              ) }
              <button
                className="modal-form--submit"
                type="submit"
                onSubmit={handleSubmit}
              >
                Créer le compte
              </button>
            </form>
          </div>
        ) }
        { message.success && (
          <div className="modal-form-message modal-form-message--success">
            {message.content}
          </div>
        ) }
        <a
          className="modal--back"
          name="register"
          href="#"
          onClick={handleclose}
        >
          Retour
        </a>
      </section>
    </div>
  );
};

RegisterForm.propTypes = {
  handleclose: Proptypes.func.isRequired,
  pseudo: Proptypes.string.isRequired,
  email: Proptypes.string.isRequired,
  password: Proptypes.string.isRequired,
  confirmPassword: Proptypes.string.isRequired,
  notifNewEvent: Proptypes.bool.isRequired,
  notifNewUpdate: Proptypes.bool.isRequired,
  changeValue: Proptypes.func.isRequired,
  changeCheckInputValue: Proptypes.func.isRequired,
  submitRegister: Proptypes.func.isRequired,
  message: Proptypes.object,
};

RegisterForm.defaultProps = {
  message: {
    error: false,
    success: false,
    content: null,
  },
};

export default RegisterForm;
