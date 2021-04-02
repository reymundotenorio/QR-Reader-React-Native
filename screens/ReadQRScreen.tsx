import * as React from 'react';
import ReadQRScreenInfo from '../components/ReadQRScreenInfo';

import { NavigationProps } from '../types';

export default function ReadQRScreen({ navigation }: NavigationProps) {
  return <ReadQRScreenInfo navigation={navigation} />;
}
