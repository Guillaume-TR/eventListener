import { connect } from 'react-redux';

import Header from 'src/components/EventDetails/Header';

import {
  changeShareLinksModal,
} from 'src/redux/actions/event';
import {
  changeLikeToTheEvent,
} from 'src/redux/actions/user';

import {
  getEventStatus,
} from 'src/redux/selectors';

const mapStateToProps = (state) => ({
  showModal: state.eventDetails.showModal,
  price: state.eventDetails.data.price,
  banner: state.eventDetails.data.url_image,
  title: state.eventDetails.data.title,
  dateStart: state.eventDetails.data.date_start,
  dateEnd: state.eventDetails.data.date_end,
  isOnline: state.eventDetails.data.is_online,
  urlLive: state.eventDetails.data.url_live,
  isConnected: state.app.isConnected,
  liked: state.eventDetails.liked,
  getEventStatus,
});

const mapDispatchToProps = (dispatch) => ({
  changeShareLinksModal: () => dispatch(changeShareLinksModal()),
  changeLikeToTheEvent: (liked) => dispatch(changeLikeToTheEvent(liked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
