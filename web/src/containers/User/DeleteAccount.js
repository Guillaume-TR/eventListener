import { connect } from 'react-redux';

import DeleteAccount from 'src/components/User/DeleteAccount';

import {
  deleteUser,
} from 'src/redux/actions/user';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  deleteUser: () => dispatch(deleteUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
