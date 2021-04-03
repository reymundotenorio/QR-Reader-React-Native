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
  decoded_info: string;
  decoded_type: string;
}
