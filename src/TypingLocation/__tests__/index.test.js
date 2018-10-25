import React from 'react';
import TypingLocation from '../';
import renderer from 'react-test-renderer';

describe('TypingLocation', () => {
  it('renders correctly', () => {
    const location = 10;
    const component = renderer.create(
      <TypingLocation {...{ location }} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
