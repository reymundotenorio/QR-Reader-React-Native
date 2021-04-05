import { MaterialCommunityIcons } from '@expo/vector-icons';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  ReadQR: undefined;
  ListQR: undefined;
};

export type ReadQRParamList = {
  ReadQRScreen: undefined;
};

export type ListQRParamList = {
  ListQRScreen: undefined;
};

export type HandleBarCodeScanned = {
  type: string;
  data: string;
};

interface Navigation {
  // eslint-disable-next-line @typescript-eslint/ban-types
  navigate: Function;
}

export type NavigationProps = {
  navigation: Navigation;
};

export interface QRCodeAction {
  type: string;
  decodedInfo: string;
  decodedDatetime: string;
}

export type QRDataType = {
  decodedInfo: string;
  decodedDatetime: string;
};

export interface QRState {
  QRData: Array<QRDataType>;
}

export interface QRType {
  dataType: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

export type ColorScheme = {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  tabBackgroundColor: string;
  tabActiveColor: string;
  tabInactive: string;
  inputBackground: string;
  inputPlaceholderColor: string;
  inputText: string;
  itemTouchableBackground: string;
  itemTypeColor: string;
  itemDataColor: string;
};
