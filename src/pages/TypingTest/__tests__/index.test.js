import React from 'react';
import ReactDOM from 'react-dom';
import {Unwrapped as TypingTest} from '..';

it('renders when not logged in', function() {
  const div = document.createElement('div');
  ReactDOM.render(<TypingTest user={null} preferences={{ totalWords: 5 }}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders when logged in', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TypingTest user={{}} preferences={{ totalWords: 5 }}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
