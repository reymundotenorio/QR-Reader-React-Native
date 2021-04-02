import * as React from 'react';
import ReadQRScreenInfo from '../components/ReadQRScreenInfo';

export default function ReadQRScreen({ navigation }) {
  return <ReadQRScreenInfo navigate={navigation.navigate} />;
}
