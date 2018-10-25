import React, { Component } from 'react';
import sampleSize from 'lodash.samplesize';
import cx from 'classnames';
import firebase from 'firebase';
import 'firebase/auth';

import Text from '../Text';
import WordsPerMinute from '../WordsPerMinute';
import TypingLocation from '../TypingLocation';
import TotalWords from '../TotalWords';
import Signup from '../Signup';
import Signin from '../Signin';

import words from '../data/words';

import './style.css';

export default class App extends Component {

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
    wordList: []
    activePage: 'app'
  };

  componentDidMount() {
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
        isCompleted = true;
      }

      this.setState(stateUpdate, () => isCompleted && this.completed());
    }
  };

  changeActivePage(page) {
    this.setState({ activePage: page });
  }

  signupSuccess() {
    this.changeActivePage('app');
  }

  signinSuccess() {
    this.changeActivePage('app');
  }

  signout() {
    firebase.auth().signOut();
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
    const { user } = this.props;
    const { letters, index, wpm, size } = this.state;
    const MenuItem = ({ title, keyword, active, left, onPress }) => (
      <li
        className={cx('menu-item', { active: active === keyword, left: left })}
        onClick={() => this.changeActivePage(keyword)}
      >
        {title}
      </li>
    );
    return (
      <div>
        <div className={cx('navbar')}>
          <ul className={cx('menu')}>
            <MenuItem
              title="Typist"
              keyword="app"
              left
              active={this.state.activePage}
            />
            {!user.uid && (
              <MenuItem
                title="Signup"
                keyword="signup"
                active={this.state.activePage}
              />
            )}
            {!user.uid && (
              <MenuItem
                title="Signin"
                keyword="signin"
                active={this.state.activePage}
              />
            )}
            {user.uid && (
              <li className={cx('menu-item')} onClick={() => this.signout()}>
                Logout
              </li>
            )}
            {user.uid && (
              <li className={cx('menu-item')} onClick={() => {}}>
                {user.displayName || user.email}
              </li>
            )}
          </ul>
        </div>
        {this.state.activePage === 'signup' && (
          <Signup signupSuccess={() => this.signupSuccess()} />
        )}
        {this.state.activePage === 'signin' && (
          <Signin signinSuccess={() => this.signinSuccess()} />
        )}
        {this.state.activePage === 'app' && (
          <div className="App">
            <Text letters={letters} index={index} />
            <WordsPerMinute wordsPerMinute={wpm} />
            <TypingLocation location={index} />
            <TotalWords
              size={size}
              increment={this.increment}
              decrement={this.decrement}
            />
          </div>
        )}
      </div>
    );
  }
}
