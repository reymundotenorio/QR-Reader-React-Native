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

export type handleBarCodeScannedProps = {
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

export type decodeInfoListReducerProps = {
  type: string;
  payload: string;
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

export interface qrType {
  dataType: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}
