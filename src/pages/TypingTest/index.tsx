import sampleSize from 'lodash.samplesize';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import words from '../../data/words';
import Text from './components/Text';
import { translate, Trans } from 'react-i18next';

import { User } from 'firebase';

import * as actionTypes from '../../actions/actionTypes';

import './style.css';

interface TypingTestProps {
  t: (key: string) => string;
  user: User;
  updateScoreboard: (user: User, score: number) => any;
  saveScore: (userId: string, score: number) => any;
  preferences: {
    totalWords: number;
  };
  preferencesLoading: boolean;
  fetchSessionsCompleted: (userId: string) => any;
  sessionsCompleted: number;
  sessionsCompletedLoading: boolean;
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
}

class TypingTest extends Component<TypingTestProps, TypingTestState> {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      index: 0,
      letters: [],
      score: 0,
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

  async componentDidMount() {
    ReactGA.pageview('/');
    document.addEventListener('keypress', this.keyPressHandler);
    document.addEventListener('keydown', this.keyDownHandler);
    if (!this.props.preferencesLoading) {
      this.completed();
    }
    const { user } = this.props;
    if (user && user.uid) {
      await this.props.fetchSessionsCompleted(user.uid);
    }
  }

  componentDidUpdate(prevProps) {
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

  async saveScore() {
    const { user } = this.props;
    if (!(user && user.uid)) {
      return;
    }
    this.setState({ error: '' });
    const { score } = this.state;

    try {
      await this.props.saveScore(user.uid, score);
      await this.props.updateScoreboard(user, score);
      await this.props.fetchSessionsCompleted(user.uid);
    } catch (err) {
      this.setState({
        error: 'Something went wrong while saving score, please contact support!',
      });
    }
  }

  render() {
    const { letters, index, score, error } = this.state;
    const { t, user, sessionsCompleted } = this.props;
    const loggedIn = user && user.uid;

    return (
      <div className="App">
        <Text letters={letters} index={index} />

        <p>
          {t('LastScore')}: {score}
        </p>
        <p>
          {t('SessionsCompleted')}: {sessionsCompleted}
        </p>

        {!loggedIn && <div className="error center">Please log in to save your score!</div>}
        {error && <div className="error center">{error}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  preferences: state.userPreferences.preferences,
  preferencesLoading: state.userPreferences.loading,
  sessionsCompleted: state.sessionsCompleted.sessionsCompleted,
  sessionsCompletedLoading: state.sessionsCompleted.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchSessionsCompleted: (userId: string) =>
    dispatch({ type: actionTypes.SESSIONS_COMPLETED_FETCH_REQUEST, payload: { userId } }),
  saveScore: (userId: string, score: number) =>
    dispatch({ type: actionTypes.SCORE_SAVE_REQUEST, payload: { userId, score } }),
  updateScoreboard: (user: User, score: number) =>
    dispatch({ type: actionTypes.SCOREBOARD_UPDATE_REQUEST, payload: { user, score } }),
});

export const Unwrapped = TypingTest;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('translations')(TypingTest));
