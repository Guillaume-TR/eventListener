import React from 'react';
import PropTypes from 'prop-types';

const QuickSearchBar = ({
  value,
  handleSearchChange,
}) => {
  // redirect the user to /evenements/whateverhetypes when submitting the form
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.pathname = `/evenements/${value}`;
  };
  // allows to change the input value
  const handleChange = (event) => {
    handleSearchChange(event.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="searchbar-visible">
        <input
          type="search"
          className="searchbar-input"
          placeholder="Recherche..."
          value={value}
          /* Get the enter value in the input */
          onChange={handleChange}
        />
      </form>
    </>
  );
};

QuickSearchBar.propTypes = {
  value: PropTypes.string,
  handleSearchChange: PropTypes.func.isRequired,
};
QuickSearchBar.defaultProps = {
  value: '',
};

export default QuickSearchBar;
