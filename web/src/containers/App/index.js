import { connect } from 'react-redux';

import App from 'src/components/App';

import {
  closeNavMenu,
} from 'src/redux/actions';
import {
  checkConnect,
} from 'src/redux/actions/user';

const mapStateToProps = (state) => ({
  isConnected: state.app.isConnected,
});

const mapDispatchToProps = (dispatch) => ({
  checkConnect: () => dispatch(checkConnect()),
  closeNavMenu: () => dispatch(closeNavMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
