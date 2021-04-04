import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';

import { MonoText } from '../StyledText';

// eslint-disable-next-line no-undef
it(`renders correctly`, () => {
  // eslint-disable-next-line react/jsx-filename-extension
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
