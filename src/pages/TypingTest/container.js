import { connect } from 'react-redux';

import Main from './index';

const mapStateToProps = (state) => ({
  preferences: state.userPreferences.preferences,
  preferencesLoading: state.userPreferences.loading,
});

export default connect(mapStateToProps, null)(Main);
