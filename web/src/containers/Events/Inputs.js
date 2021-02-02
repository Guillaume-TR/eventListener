import { connect } from 'react-redux';

import Inputs from 'src/components/Events/Inputs';

import {
  addFilters,
  fillFilterList,
} from 'src/redux/actions/temp';

const mapStateToProps = (state) => ({
  stateTest: state.form.dataFilter,
});

const mapDispatchToProps = (dispatch) => ({
  addFilters: (filters) => dispatch(addFilters(filters)),
  fillFilterList: (filterList) => dispatch(fillFilterList(filterList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);
