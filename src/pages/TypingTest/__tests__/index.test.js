import React from 'react';
import ReactDOM from 'react-dom';
import App from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App user={{}} preferences={{ totalWords: 5 }}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
