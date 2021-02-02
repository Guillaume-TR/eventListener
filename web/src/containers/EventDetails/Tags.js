import { connect } from 'react-redux';

import Tags from 'src/components/EventDetails/Tags';

const mapStateToProps = (state) => ({
  tags: state.eventDetails.data.tags,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
