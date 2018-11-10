import React from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';

import { User } from 'firebase';

import * as actionTypes from '../../actions/actionTypes';

interface UserScore {
  user: User;
  score: number;
}

interface ScoreBoardProps {
  scoreboard: UserScore[];
  loading: boolean;
  error: any;
  fetchScoreboard: () => any;
}

class ScoreBoard extends React.Component<ScoreBoardProps> {

  componentDidMount() {
    ReactGA.pageview('/scoreboard');
    this.props.fetchScoreboard();
  }

  render() {
    const { scoreboard, loading, error } = this.props;
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (!scoreboard) {
      return;
    }

    const tableData = scoreboard.map((row, idx) => {
      return { rank: idx + 1, name: row.user.displayName, score: row.score };
    });

    const rows = tableData.map((row, idx) => {
      return (
        <tr key={idx}>
          <td>{row.rank}</td>
          <td>{row.name}</td>
          <td>{row.score}</td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  ...state.scoreboard
});

const mapDispatchToProps = dispatch => ({
  fetchScoreboard: () =>
    dispatch({ type: actionTypes.SCOREBOARD_FETCH_REQUEST }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard);
