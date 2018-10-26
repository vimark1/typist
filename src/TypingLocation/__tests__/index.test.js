import React from 'react';
import renderer from 'react-test-renderer';
import TypingLocation from '..';

describe('TypingLocation', () => {
  it('renders correctly', () => {
    const location = 10;
    const component = renderer.create(
      <TypingLocation {...{ location }} />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
