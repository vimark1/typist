import React, { Component } from 'react';
import sampleSize from 'lodash.samplesize';

import Text from '../Text';
import WordsPerMinute from '../WordsPerMinute';
import TypingLocation from '../TypingLocation';

import words from '../data/words';

export default class App extends Component {
  state = {
    size: 5,
    stats: {
      keys: [],
      success: [],
      fails: [],
    },
    text: '',
    index: 0,
    letters: [],
    typed: '',
    start: new Date(),
    wpm: [],
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
    const charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
    const char = String.fromCharCode(charCode);
    this.register(char);
  }

  keyDownHandler = e => {
    const charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
    
    if(charCode === 8) {
      this.backspace();
    }
    
    if(charCode === 27) {
      this.completed();
    }
  }

  generateText = () => {
    const { size } = this.state;

    const meaningfulWords = words.filter(word => word.length >= 3);
    const newText = sampleSize(meaningfulWords, size).join(' ');
    const newLetters = newText
      .split('')
      .map(letter => ({
        letter : letter,
        done : false
      }));

    this.setState({
      text: newText,
      letters: newLetters,
    });
  }

  backspace = () => {
    const { index } = this.index;
    if(index === 0) return;
    this.setState({
      index: index - 1,
    });
  };
  
  completed = function() {
    this.generateText();
    this.setState({
      index: 0,
      typed: '',
      start: new Date(),
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
      ts: +new Date(),
    };

    const { stats, text, index, letters, typed } = this.state;

    const charAtIndex = text.substr(index, 1);
    const stateUpdate = {
      stats: {
        ...stats,
        keys: stats.keys.concat(stat),
      },
    }

    if (char !== charAtIndex) {
      stateUpdate.stats = {
        ...stats,
        ...stateUpdate.stats,
        fails: stats.fails.concat(stat),
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
        success: stats.success.concat(stat),
      };

      let isCompleted = false

      if (index === text.length - 1) {
        const { start, wpm } = this.state;
        const calc = this.calcTime(start, new Date());
        
        stateUpdate.wpm = wpm.concat(calc);
        isCompleted = true;
      }

      this.setState(stateUpdate, () => (isCompleted && this.completed()));
    }
  }

  render() {
    const { letters, index, wpm } = this.state;
    return (
      <div className="App">
        <h2>v0.0.1</h2>
        <Text letters={letters} index={index} />
        <WordsPerMinute wordsPerMinute={wpm} />
        <TypingLocation location={index} />
      </div>
    );
  }
}
