import React, { Component } from 'react';
import ReactGA from 'react-ga';
import sampleSize from 'lodash.samplesize';
import firebase from 'firebase/app';

import Text from '../Text';
import TotalWords from '../TotalWords';

import words from '../data/words';

import './style.css';

export default class Main extends Component {

  meaningfulWords = words.filter(word => word.length >= 3);

  state = {
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
    authError: false,
    error: ''
  };

  constructor(props) {
    super(props);
    const { pref } = props;
    this.state = {
      ...this.state,
      size: pref.words
    };
  }

  componentDidMount() {
    ReactGA.pageview('/');
    document.addEventListener('keypress', this.keyPressHandler);
    document.addEventListener('keydown', this.keyDownHandler);
    this.completed();
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
    const charCode = (typeof e.which === 'number') ? e.which : e.keyCode;

    if (charCode === 8) {
      this.backspace();
    }

    if (charCode === 27) {
      this.completed();
    }
  };

  generateText = (wordList) => {
    const newText = wordList.join(' ');
    const newLetters = newText
      .split('')
      .map(letter => ({
        letter: letter,
        done: false
      }));

    this.setState({
      text: newText,
      letters: newLetters,
      wordList
    });
  };

  backspace = () => {
    const { index } = this.state;
    if (index === 0) return;
    this.setState({
      index: index - 1
    });
  };

  completed = function () {
    const { size } = this.state;
    const wordList = sampleSize(this.meaningfulWords, size);
    this.generateText(wordList);
    this.setState({
      index: 0,
      typed: '',
      start: new Date()
    });
  };

  calcTime = (start, end) => {
    const { size } = this.state;
    const startSec = start.getTime() / 1000;
    const endSec = end.getTime() / 1000;
    const seconds = Math.round(endSec - startSec);

    return Math.round((60 * size) / seconds);
  };

  register = char => {
    const stat = {
      key: char,
      ts: +new Date()
    };

    const { stats, text, index, letters, typed } = this.state;

    const charAtIndex = text.substr(index, 1);
    const stateUpdate = {
      stats: {
        ...stats,
        keys: stats.keys.concat(stat)
      }
    };

    if (char !== charAtIndex) {
      stateUpdate.stats = {
        ...stats,
        ...stateUpdate.stats,
        fails: stats.fails.concat(stat)
      };
    } else {
      const updatedLetters = letters.map((letter, idx) => (
        idx === index ?
          {
            ...letter,
            done: true,
          } :
          letter
      ));

      stateUpdate.letters = updatedLetters;
      stateUpdate.index = index + 1;
      stateUpdate.typed = `${typed}${char}`;
      stateUpdate.stats = {
        ...stats,
        ...stateUpdate.stats,
        success: stats.success.concat(stat)
      };

      let isCompleted = false;

      if (index === text.length - 1) {
        const { start, wpm } = this.state;
        const calc = this.calcTime(start, new Date());
        stateUpdate.wpm = wpm.concat(calc);
        const score = Math.round(
          stateUpdate.wpm.reduce((a, b) => a + b) / stateUpdate.wpm.length
        );
        stateUpdate.score = score;
        isCompleted = true;
      }

      this.setState(stateUpdate, () => isCompleted && this.completed());
      if (isCompleted) this.saveScore();
    }
  };

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

  async saveScore() {
    try {
      const { user } = this.props;
      if (!user.uid) return this.setState({ authError: true });
      this.setState({ authError: false, error: '' });

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

  increment = () => {
    const { size, wordList } = this.state;
    const newWord = sampleSize(this.meaningfulWords, 1);
    this.setState({
      size: size + 1,
      wordList: [...wordList, ...newWord]
    }, () => {
      this.generateText(this.state.wordList);
    });
  }

  decrement = () => {
    const { size, wordList } = this.state;

    if (size > 1) {
      this.setState({
        size: size - 1,
        wordList: [...wordList.slice(0, wordList.length - 1)]
      }, () => {
        this.generateText(this.state.wordList);
      });
    }
  }

  render() {
    const { letters, index, size, score, error, authError } = this.state;

    return (
      <div className="App">
        <Text letters={letters} index={index} />

        <p>Last score: {score}</p>

        <TotalWords
          size={size}
          increment={this.increment}
          decrement={this.decrement}
        />

        {authError && (
          <div className="error center">
          Please sign in to save your score!
          </div>
        )}
        {error && <div className="error center">{error}</div>}
      </div>
    );
  }
}
