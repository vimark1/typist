import React from 'react';
import Text from '../';
import renderer from 'react-test-renderer';

describe('Text', () => {
  it('renders correctly', () => {
    const letters = [
      {
        done: true,
        letter: "h"
      },
      {
        done: false,
        letter: "i"
      }
    ];
    const index = 0;
    const component = renderer.create(
      <Text {...{ letters, index }} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
