/* eslint-disable import/prefer-default-export */
import { ADD_QR_DATA } from './qrCodeTypes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const addQRData = (decodedInfo: string, decodedDatetime: string) => ({
  type: ADD_QR_DATA,
  decodedInfo,
  decodedDatetime,
});
