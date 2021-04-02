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
