import { connect } from 'react-redux';

import Event from 'src/components/Events/Event';

import {
  getEventDetails,
} from 'src/redux/actions/event';
import {
  getCity,
} from 'src/redux/selectors';

const mapStateToProps = () => ({
  getCity,
});

const mapDispatchToProps = (dispatch) => ({
  getEventDetails: (id) => dispatch(getEventDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
