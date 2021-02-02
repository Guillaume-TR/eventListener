import { connect } from 'react-redux';

import Now from 'src/components/Home/Now';

import {
  getEventInProgress,
} from 'src/redux/actions/event';

const mapStateToProps = (state) => ({
  event: state.home.eventInProgress,
});

const mapDispatchToProps = (dispatch) => ({
  getEventInProgress: () => dispatch(getEventInProgress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Now);
