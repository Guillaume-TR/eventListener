import { connect } from 'react-redux';

import NextEvents from 'src/components/Home/NextEvents';

import {
  nextEvents,
} from 'src/redux/actions/event';
import {
  changeLeftForSlider,
} from 'src/redux/actions';
import {
  slider,
} from 'src/redux/selectors';


const mapStateToProps = (state) => ({
  data: state.home.data,
  slide: state.home.slide,
  slider,
});

const mapDispatchToProps = (dispatch) => ({
  showNextEvents: () => dispatch(nextEvents()),
  changeLeftForSlider: (value) => dispatch(changeLeftForSlider(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextEvents);
