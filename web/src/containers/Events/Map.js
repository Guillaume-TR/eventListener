import { connect } from 'react-redux';

import EventsMap from 'src/components/Events/Map';

const mapStateToProps = (state) => ({
  data: state.form.data,
  quickSearchData: state.home.quickSearchData,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EventsMap);
