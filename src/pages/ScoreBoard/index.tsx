import firebase from 'firebase/app';
import React from 'react';
import ReactGA from 'react-ga';

import { User } from 'firebase';

interface UserScore {
  user: User;
  score: number;
}

interface ScoreBoardState {
  top10: UserScore[];
}

class ScoreBoard extends React.Component<{}, ScoreBoardState> {
  constructor(props) {
    super(props);
    this.state = {
      top10: [
        // {user: (user object), score: "12"}
      ],
    };
  }

  componentDidMount() {
    ReactGA.pageview('/scoreboard');
    const topScorersRef = firebase.database().ref('top-scorers');
    topScorersRef.on('value', snapshot => {
      this.setState({
        top10: snapshot.val(),
      });
    });
  }

  render() {
    const tableData = this.state.top10.map((row, idx) => {
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

export default ScoreBoard;
