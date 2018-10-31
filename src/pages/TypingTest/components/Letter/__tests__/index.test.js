import React from 'react';
import renderer from 'react-test-renderer';
import Letter from '..';

describe('Letter', () => {
  it('renders correctly', () => {
    const letter = 'h';
    const done = false;
    const isCurrent = false;
    const component = renderer.create(
      <Letter {...{ done, letter, isCurrent }} />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
