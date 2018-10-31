import React, { Component } from 'react';
import ReactGA from 'react-ga';
import sampleSize from 'lodash.samplesize';
import firebase from 'firebase/app';
import Text from './components/Text';
import words from '../../data/words';

import './style.css';

export default class TypingTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 5,
      stats: {
        keys: [],
        success: [],
        fails: []
      },
      text: '',
      index: 0,
      letters: [],
      typed: '',
      start: new Date(),
      wpm: [],
      wordList: [],
      score: 0,
      error: '',
      sessionsCompleted: 0,
    };
  }

  componentDidMount() {
    ReactGA.pageview('/');
    document.addEventListener('keypress', this.keyPressHandler);
    document.addEventListener('keydown', this.keyDownHandler);
    if (!this.props.preferencesLoading) this.completed();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user && prevProps.user !== user) {
      user && this.setSessionsCompleted(user);
    }
    if (!this.props.preferencesLoading && prevProps.preferencesLoading) {
      this.completed();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyPressHandler);
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  keyPressHandler = (e) => {
    const charCode = typeof e.which === 'number' ? e.which : e.keyCode;
    const char = String.fromCharCode(charCode);
    this.register(char);
  };

  keyDownHandler = (e) => {
    const charCode = (typeof e.which === 'number') ? e.which : e.keyCode;

    if (charCode === 8) {
      this.backspace();
    }

    if (charCode === 27) {
      this.completed();
    }
  };

  generateText(wordList) {
    const text = wordList.join(' ');
    const letters = text.split('')
      .map(letter => ({ letter, done: false }));

    this.setState({
      text,
      letters,
      wordList
    });
  }

  backspace() {
    let { index,letters } = this.state;
    if (index === 0) return;

    let newIdx = index - 1;
    letters[newIdx].done = false;

    this.setState({
      index: newIdx,
      letters
    });
  }

  completed() {
    const { totalWords } = this.props.preferences;
    const wordList = sampleSize(words, totalWords);
    this.generateText(wordList);
    this.setState({
      index: 0,
      typed: '',
      start: new Date()
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
    const state = {
      letters: [...letters],
      index,
      stats: {
        ...stats,
        keys: stats.keys.concat(stat)
      }
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
        const score = Math.round(
          state.wpm.reduce((a, b) => a + b) / state.wpm.length
        );
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
        topScores.push({user: {
          uid: user.uid,
          displayName: user.displayName,
        }, score: score})
        topScores.sort((a, b) => {
          if(a.score === b.score) { return 0; }
          return a.score > b.score ? -1 : 1;
        });
        topScores = topScores.slice(0, limit);
        topScorersRef.set(topScores);
      })
  }

  setSessionsCompleted(user) {
    const sessionsCompletedRef = firebase.database()
      .ref('user-score')
      .child(user.uid);

    sessionsCompletedRef.on('value', snapshot => {
      const data = snapshot.val();
      const dates = Object.keys(data);
      const sessionsCompleted = dates
        .reduce((totalSessions, date) =>  totalSessions + Object.keys(data[date]).length, 0)
      this.setState({
        sessionsCompleted,
      });
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
      const sessionId = (new Date()).toISOString().slice(0,10);

      // store record in Firebase
      await firebase
        .database()
        .ref('user-score')
        .child(user.uid)
        .child(sessionId)
        .push({
          score,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });

      this.updateScoreboard(user, score)

    } catch (err) {
      console.error(err);
      this.setState({
        error:
          'Something went wrong while saving score, please contact support!'
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

        {!loggedIn && (
          <div className="error center">Please log in to save your score!</div>
        )}
        {error && <div className="error center">{error}</div>}
      </div>
    );
  }
}
