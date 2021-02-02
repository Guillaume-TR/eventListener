import React from 'react';
import PropTypes from 'prop-types';

import Inputs from 'src/containers/Events/Inputs';

const advancedForm = {
  priceValues: [
    { title: 'Gratuit', status: false },
    { title: 'Payant', status: true }
  ],
  liveValues: [
    { title: 'Oui', status: false },
    { title: 'Non', status: true }
  ],
  timeValues: [
    { title: 'Date de début', status: 'date_start' },
    { title: 'Date de fin', status: 'date_end' }
  ],
}


const Advanced = ({
  addressValue,
  addAddressValue,
  fillFilterList,
}) => {
  const handleChange = (event) => {
    const { value, name } = event.target;
    const filter = {
      [name]: `'${value}'`,
    };

    fillFilterList(filter);
  };
  const _onChange = (event) => {
    const { value } = event.target;
    addAddressValue(value);
  };


  return (
    <>
      <div className="advanced-filter">
        <div className="advanced-filter-group price">
          <h4 className="advanced-filter-name">
            Prix
          </h4>

          {advancedForm.priceValues.map((priceValue) => (
            <Inputs
              name="price"
              status={priceValue.status}
              key={priceValue.title}
            >
              {priceValue.title}
            </Inputs>
          ))}
        </div>

        <div className="advanced-filter-group online">
          <h4 className="advanced-filter-name">
            Diffusion en ligne
          </h4>

          {advancedForm.liveValues.map((liveValue) => (
            <Inputs
              name="is_online"
              status={liveValue.status}
              key={liveValue.title}
            >
              {liveValue.title}
            </Inputs>
          ))}
        </div>


        {advancedForm.timeValues.map((timeValue) => (
          <React.Fragment key={timeValue.title}>
            <div className="advanced-filter-group date">
              <h4 className="advanced-filter-name">
                {timeValue.title}
              </h4>

              <input
                onChange={handleChange}
                type="date"
                name={timeValue.status}
                min="2019-10-01"
                max="2030-02-28"
              />
            </div>
          </React.Fragment>
        ))}

        <div className="advanced-filter-group location">
          <h4 className="advanced-filter-name">
            Localisation
          </h4>

          <input
            onChange={_onChange}
            list="villes"
            id="advanced-filter-input"
            name="address"
            value={addressValue}
          />
        </div>
      </div>
      <input
        type="submit"
        className="form-submit"
        value="Rechercher"
      />
    </>
  );
};


// == PropTypes
Advanced.propTypes = {
  fillFilterList: PropTypes.func.isRequired,
  addAddressValue: PropTypes.func.isRequired,
  addressValue: PropTypes.string,
};
Advanced.defaultProps = {
  addressValue: '',
};


// == Export
export default Advanced;
