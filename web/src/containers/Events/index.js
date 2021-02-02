import { connect } from 'react-redux';

import Events from 'src/components/Events';

import {
  allEvents,
} from 'src/redux/actions/temp';

const mapStateToProps = (state) => ({
  data: state.form.data,
  value: state.form.value,
  undefinedData: state.form.caseNoData,
});

const mapDispatchToProps = (dispatch) => ({
  showEvents: () => dispatch(allEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
