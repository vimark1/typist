import React from 'react';
import renderer from 'react-test-renderer';
import Text from '..';

describe('Text', () => {
  it('renders correctly', () => {
    const letters = [
      {
        done: true,
        letter: 'h',
      },
      {
        done: false,
        letter: 'i',
      },
    ];
    const index = 0;
    const component = renderer.create(
      <Text {...{ letters, index }} />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
