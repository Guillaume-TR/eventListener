import { connect } from 'react-redux';

import User from 'src/components/User';

import {
  fetchNewUserInfos,
} from 'src/redux/actions/user';
import {
  closeNavMenu,
} from 'src/redux/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchNewUserInfos: () => dispatch(fetchNewUserInfos()),
  closeNavMenu: () => dispatch(closeNavMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
