import firebase from 'firebase/app';
import sampleSize from 'lodash.samplesize';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import words from '../../data/words';
import Text from './components/Text';

import { User } from 'firebase';

import './style.css';

interface TypingTestProps {
  user: User;
  preferencesLoading: boolean;
  preferences: {
    totalWords: number;
  };
}

interface TypingTestState {
  size?: number;
  text?: string;
  typed?: string;
  start?: Date;
  wpm?: any[];
  stats: {
    keys: any[];
    success: any[];
    fails: any[];
  };
  index: number;
  letters: any[];
  wordList?: any[];
  score?: number;
  error?: string;
  sessionsCompleted?: number;
}

class TypingTest extends Component<TypingTestProps, TypingTestState> {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      index: 0,
      letters: [],
      score: 0,
      sessionsCompleted: 0,
      size: 5,
      start: new Date(),
      stats: {
        fails: [],
        keys: [],
        success: [],
      },
      text: '',
      typed: '',
      wordList: [],
      wpm: [],
    };
  }

  componentDidMount() {
    ReactGA.pageview('/');
    document.addEventListener('keypress', this.keyPressHandler);
    document.addEventListener('keydown', this.keyDownHandler);
    if (!this.props.preferencesLoading) {
      this.completed();
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user && user.uid) {
      this.setSessionsCompleted(user);
    }
    if (!this.props.preferencesLoading && prevProps.preferencesLoading) {
      this.completed();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyPressHandler);
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  keyPressHandler = e => {
    const charCode = typeof e.which === 'number' ? e.which : e.keyCode;
    const char = String.fromCharCode(charCode);
    this.register(char);
  };

  keyDownHandler = e => {
    const charCode = typeof e.which === 'number' ? e.which : e.keyCode;

    if (charCode === 8) {
      this.backspace();
    }

    if (charCode === 27) {
      this.completed();
    }
  };

  generateText(wordList) {
    const text = wordList.join(' ');
    const letters = text.split('').map(letter => ({ letter, done: false }));

    this.setState({
      text,
      letters,
      wordList,
    });
  }

  backspace() {
    const { index, letters } = this.state;
    if (index === 0) {
      return;
    }

    const newIdx = index - 1;
    letters[newIdx].done = false;

    this.setState({
      index: newIdx,
      letters,
    });
  }

  completed() {
    const { totalWords } = this.props.preferences;
    const wordList = sampleSize(words, totalWords);
    this.generateText(wordList);
    this.setState({
      index: 0,
      typed: '',
      start: new Date(),
    });
  }

  calcTime(start, end, totalWords) {
    const startSec = start.getTime() / 1000;
    const endSec = end.getTime() / 1000;
    const seconds = Math.round(endSec - startSec);

    return Math.round((60 * totalWords) / seconds);
  }

  register(char) {
    let isCompleted = false;
    const stat = { key: char, ts: new Date().getTime() };
    const { stats, text, index, letters, typed } = this.state;

    const charAtIndex = text.substr(index, 1);
    const state: TypingTestState = {
      letters: [...letters],
      index,
      stats: {
        ...stats,
        keys: stats.keys.concat(stat),
      },
    };

    if (char !== charAtIndex) {
      state.stats.fails = state.stats.fails.concat(stat);
    } else {
      letters[index].done = true;

      state.index += 1;
      state.typed = `${typed}${char}`;
      state.stats.success = state.stats.success.concat(stat);

      if (index === text.length - 1) {
        const { start, wpm } = this.state;
        const { totalWords } = this.props.preferences;
        const calc = this.calcTime(start, new Date(), totalWords);
        state.wpm = wpm.concat(calc);
        const score = Math.round(state.wpm.reduce((a, b) => a + b) / state.wpm.length);
        state.score = score;
        isCompleted = true;
      }

      if (isCompleted) {
        this.saveScore();
      }
    }
    this.setState(state, () => isCompleted && this.completed());
  }

  updateScoreboard(user, score) {
    const limit = 10;
    const topScorersRef = firebase.database().ref('top-scorers');
    topScorersRef.once('value', snapshot => {
      let topScores = snapshot.val() || [];
      topScores.push({
        score,
        user: { displayName: user.displayName, uid: user.uid },
      });
      topScores.sort((a, b) => {
        if (a.score === b.score) {
          return 0;
        }
        return a.score > b.score ? -1 : 1;
      });
      topScores = topScores.slice(0, limit);
      topScorersRef.set(topScores);
    });
  }

  setSessionsCompleted(user) {
    const sessionsCompletedRef = firebase
      .database()
      .ref('user-score')
      .child(user.uid);

    const sessionCount = this.state.sessionsCompleted;

    sessionsCompletedRef.on('value', snapshot => {
      const data = snapshot.val();
      const dates = Object.keys(data);
      const sessionsCompleted = dates.reduce(
        (totalSessions, date) => totalSessions + Object.keys(data[date]).length,
        0
      );
      if (sessionCount !== sessionsCompleted) {
        this.setState({ sessionsCompleted });
      }
    });
  }

  async saveScore() {
    try {
      const { user } = this.props;
      if (!(user && user.uid)) {
        return;
      }
      this.setState({ error: '' });

      const { score } = this.state;

      // a string in the format 2018-10-26
      const sessionId = new Date().toISOString().slice(0, 10);

      // store record in Firebase
      await firebase
        .database()
        .ref('user-score')
        .child(user.uid)
        .child(sessionId)
        .push({
          score,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
        });

      this.updateScoreboard(user, score);
    } catch (err) {
      this.setState({
        error: 'Something went wrong while saving score, please contact support!',
      });
    }
  }

  render() {
    const { letters, index, score, error, sessionsCompleted } = this.state;
    const { user } = this.props;
    const loggedIn = user && user.uid;

    return (
      <div className="App">
        <Text letters={letters} index={index} />

        <p>Last score: {score}</p>
        <p>Sessions completed: {sessionsCompleted}</p>

        {!loggedIn && <div className="error center">Please log in to save your score!</div>}
        {error && <div className="error center">{error}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  preferences: state.userPreferences.preferences,
  preferencesLoading: state.userPreferences.loading,
});

export const Unwrapped = TypingTest;

export default connect(
  mapStateToProps,
  null
)(TypingTest);
