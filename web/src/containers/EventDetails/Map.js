import { connect } from 'react-redux';

import EventDetailsMap from 'src/components/EventDetails/Map';

const mapStateToProps = (state) => ({
  data: state.form.data,
  latitude: state.eventDetails.data.latitude,
  longitude: state.eventDetails.data.longitude,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsMap);
