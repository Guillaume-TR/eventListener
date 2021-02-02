import { connect } from 'react-redux';

import Advanced from 'src/components/Events/Advanced';

import {
  addFilters,
  addAddressValue,
  fillFilterList,
} from 'src/redux/actions/temp';

const mapStateToProps = (state) => ({
  stateTest: state.form.dataFilter,
  addressValue: state.form.addressValue,
});

const mapDispatchToProps = (dispatch) => ({
  addFilters: (filters) => dispatch(addFilters(filters)),
  addAddressValue: (value) => dispatch(addAddressValue(value)),
  fillFilterList: (filterList) => dispatch(fillFilterList(filterList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Advanced);
