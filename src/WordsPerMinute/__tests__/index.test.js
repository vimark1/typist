import React from 'react';
import renderer from 'react-test-renderer';
import WordsPerMinute from '..';

describe('WordsPerMinute', () => {
  it('renders correctly', () => {
    const wpm = [10, 20];
    const component = renderer.create(
      <WordsPerMinute wordsPerMinute={wpm} />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
