import { connect } from 'react-redux';

import SearchedEvents from 'src/components/Events/SearchedEvents';

import {
  fetchEventsByLocation,
  handleQuickSearch,
  handleSubmit,
  addFilters,
} from 'src/redux/actions/temp';

const mapStateToProps = (state) => ({
  locationSearchData: state.app.data,
  undefinedData: state.form.caseNoData,
  quickSearchData: state.home.quickSearchData,
  homeFormData: state.form.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (location) => dispatch(fetchEventsByLocation(location)),
  handleQuickSearch: (value) => dispatch(handleQuickSearch(value)),
  handleSubmit: () => dispatch(handleSubmit()),
  addFilters: (filters) => dispatch(addFilters(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchedEvents);
