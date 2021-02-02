import { connect } from 'react-redux';

import CheckButtons from 'src/components/EventDetails/CheckButtons';

import {
  changeInterestToTheEvent,
  changeParticipationToTheEvent,
} from 'src/redux/actions/user';

const mapStateToProps = (state) => ({
  interested: state.eventDetails.interested,
  participation: state.eventDetails.participation,
});
const mapDispatchToProps = (dispatch) => ({
  changeInterestToTheEvent: (isInterest) => dispatch(changeInterestToTheEvent(isInterest)),
  changeParticipationToTheEvent: (participate) => dispatch(changeParticipationToTheEvent(participate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckButtons);
