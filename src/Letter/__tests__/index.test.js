import React from 'react';
import Letter from '../';
import renderer from 'react-test-renderer';

describe('Letter', () => {
  it('renders correctly', () => {
    const letter = 'h';
    const done = false;
    const isCurrent = false;
    const component = renderer.create(
      <Letter {...{ done, letter, isCurrent }} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
