import React from 'react';
import WordsPerMinute from '../';
import renderer from 'react-test-renderer';

describe('WordsPerMinute', () => {
  it('renders correctly', () => {
    const wpm = [10, 20];
    const component = renderer.create(
      <WordsPerMinute wordsPerMinute={wpm} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
