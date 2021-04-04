import * as React from 'react';

import { Text, TextProps } from './Themed';

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/explicit-module-boundary-types
export function MonoText(props: TextProps) {
  return (
    // eslint-disable-next-line react/destructuring-assignment, react/jsx-props-no-spreading
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}
